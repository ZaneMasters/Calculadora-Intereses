import { useState, useEffect } from 'react';
import bankOptions from '../utils/bankOptions.json';

const STORAGE_KEY_RATES = 'mtrendimientos_rates_snapshot_v1';
const STORAGE_KEY_NOTIF = 'mtrendimientos_notif_pref_v1';

export function useRateChangeDetector() {
  const [changes, setChanges] = useState([]);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [notificationPermission, setNotificationPermission] = useState('default');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check Notification API support & current permission
    if ('Notification' in window) {
      setNotificationPermission(Notification.permission);
    }

    // Allow testing/preview via URL query parameter: ?testRateChange=true
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('testRateChange') === 'true') {
      simulateChangeForTesting();
      return;
    }

    // Build current snapshot map
    const currentRates = {};
    Object.entries(bankOptions).forEach(([key, val]) => {
      currentRates[key] = val.tasaEA;
    });

    const storedData = localStorage.getItem(STORAGE_KEY_RATES);

    if (!storedData) {
      // First visit: save baseline snapshot
      localStorage.setItem(
        STORAGE_KEY_RATES,
        JSON.stringify({ timestamp: Date.now(), rates: currentRates })
      );
      return;
    }

    try {
      const parsed = JSON.parse(storedData);
      const previousRates = parsed.rates || {};
      const detectedChanges = [];

      Object.entries(currentRates).forEach(([key, newRate]) => {
        const oldRate = previousRates[key];
        // Compare with small epsilon for floating precision
        if (oldRate !== undefined && Math.abs(newRate - oldRate) > 0.0001) {
          detectedChanges.push({
            bankKey: key,
            bankNombre: bankOptions[key]?.nombre || key,
            oldRate,
            newRate,
            diff: newRate - oldRate,
            direction: newRate > oldRate ? 'up' : 'down'
          });
        }
      });

      if (detectedChanges.length > 0) {
        setChanges(detectedChanges);
        setIsAlertOpen(true);

        // If user already granted browser notifications, trigger native notification
        if ('Notification' in window && Notification.permission === 'granted') {
          const firstBank = detectedChanges[0];
          const title = detectedChanges.length === 1 
            ? `🔔 Cambio de tasa en ${firstBank.bankNombre}`
            : `🔔 ${detectedChanges.length} bancos actualizaron sus tasas`;

          const body = detectedChanges.length === 1
            ? `${firstBank.bankNombre} cambió a ${(firstBank.newRate * 100).toFixed(2)}% E.A. (${firstBank.direction === 'up' ? '+' : ''}${(firstBank.diff * 100).toFixed(2)}%)`
            : `Revisa los nuevos rendimientos de ${detectedChanges.map(c => c.bankNombre.split(' ')[0]).join(', ')}.`;

          try {
            new Notification(title, {
              body,
              icon: '/logo.png',
              badge: '/logo.png',
              tag: 'rate-update'
            });
          } catch (err) {
            console.debug('Browser notification failed or blocked:', err);
          }
        }
      }
    } catch (e) {
      console.warn('Error reading stored rates snapshot:', e);
      localStorage.setItem(
        STORAGE_KEY_RATES,
        JSON.stringify({ timestamp: Date.now(), rates: currentRates })
      );
    }
  }, []);

  const dismissAlert = () => {
    // Update stored rates to current to dismiss
    const currentRates = {};
    Object.entries(bankOptions).forEach(([key, val]) => {
      currentRates[key] = val.tasaEA;
    });

    localStorage.setItem(
      STORAGE_KEY_RATES,
      JSON.stringify({ timestamp: Date.now(), rates: currentRates })
    );
    setIsAlertOpen(false);
  };

  const requestBrowserPermission = async () => {
    if (!('Notification' in window)) return 'unsupported';

    try {
      const permission = await Notification.requestPermission();
      setNotificationPermission(permission);
      localStorage.setItem(STORAGE_KEY_NOTIF, permission);

      if (permission === 'granted') {
        new Notification('🔔 Notificaciones de Tasas activadas', {
          body: 'Te avisaremos cuando las cuentas de ahorro en Colombia actualicen sus tasas de interés.',
          icon: '/logo.png'
        });
      }
      return permission;
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return 'denied';
    }
  };

  // Helper to simulate a rate change for testing/demo
  const simulateChangeForTesting = () => {
    const fakePrevious = {};
    Object.entries(bankOptions).forEach(([key, val]) => {
      fakePrevious[key] = val.tasaEA;
    });

    // Pretend PiBank was 10.5% (now 11%) and Nu was 9.5% (now 9.3%)
    fakePrevious.PiBank = 0.105;
    fakePrevious.Nu = 0.095;

    localStorage.setItem(
      STORAGE_KEY_RATES,
      JSON.stringify({ timestamp: Date.now() - 86400000, rates: fakePrevious })
    );

    // Re-trigger detection
    const detectedChanges = [
      {
        bankKey: 'PiBank',
        bankNombre: bankOptions.PiBank.nombre,
        oldRate: 0.105,
        newRate: bankOptions.PiBank.tasaEA,
        diff: bankOptions.PiBank.tasaEA - 0.105,
        direction: 'up'
      },
      {
        bankKey: 'Nu',
        bankNombre: bankOptions.Nu.nombre,
        oldRate: 0.095,
        newRate: bankOptions.Nu.tasaEA,
        diff: bankOptions.Nu.tasaEA - 0.095,
        direction: 'down'
      }
    ];

    setChanges(detectedChanges);
    setIsAlertOpen(true);
  };

  return {
    hasChanges: changes.length > 0,
    changes,
    isAlertOpen,
    notificationPermission,
    dismissAlert,
    requestBrowserPermission,
    simulateChangeForTesting
  };
}
