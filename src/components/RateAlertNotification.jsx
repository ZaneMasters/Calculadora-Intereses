import { useState } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import { Bell, ArrowUpRight, ArrowDownRight, X, Check, ShieldAlert } from 'lucide-react';
import { useRateChangeDetector } from '../hooks/useRateChangeDetector';

export default function RateAlertNotification() {
  const {
    changes,
    isAlertOpen,
    notificationPermission,
    dismissAlert,
    requestBrowserPermission
  } = useRateChangeDetector();

  const [notifRequested, setNotifRequested] = useState(false);

  const handleEnableNotifications = async () => {
    setNotifRequested(true);
    await requestBrowserPermission();
  };

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>
        {isAlertOpen && changes.length > 0 && (
          <motion.aside
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed bottom-3 left-3 right-3 sm:left-auto sm:right-6 sm:bottom-6 z-50 max-w-sm sm:max-w-md w-auto bg-white/95 backdrop-blur-xl border border-indigo-100 shadow-[0_20px_50px_rgba(79,70,229,0.15)] rounded-2xl p-4 sm:p-5 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="bg-indigo-600 text-white p-2 rounded-xl shadow-md shadow-indigo-600/20 shrink-0">
                  <Bell className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm sm:text-base leading-tight">
                    {changes.length === 1
                      ? 'Actualización de tasa detectada'
                      : `${changes.length} tasas de ahorro actualizadas`}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Cambios recientes en el mercado financiero
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={dismissAlert}
                aria-label="Cerrar aviso de actualización de tasas"
                className="text-slate-400 hover:text-slate-700 hover:bg-slate-100 p-1.5 rounded-lg transition-colors duration-150 motion-safe:enabled:active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* List of changed banks */}
            <div className="mt-3.5 space-y-2 max-h-48 overflow-y-auto overscroll-contain pr-1 custom-scrollbar">
              {changes.map((change) => {
                const isUp = change.direction === 'up';
                return (
                  <div
                    key={change.bankKey}
                    className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-slate-50 border border-slate-100"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className={`p-1 rounded-lg shrink-0 ${
                          isUp
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-rose-100 text-rose-700'
                        }`}
                        aria-hidden="true"
                      >
                        {isUp ? (
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        ) : (
                          <ArrowDownRight className="w-3.5 h-3.5" />
                        )}
                      </span>
                      <span className="font-bold text-slate-800 truncate">
                        {change.bankNombre}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0 pl-2">
                      <span className="text-slate-400 line-through tabular-nums">
                        {(change.oldRate * 100).toFixed(2)}%
                      </span>
                      <span
                        className={`font-black tabular-nums ${
                          isUp ? 'text-emerald-700' : 'text-rose-700'
                        }`}
                      >
                        {(change.newRate * 100).toFixed(2)}% E.A.
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Browser notification opt-in if supported and not yet granted */}
            {typeof window !== 'undefined' &&
              'Notification' in window &&
              notificationPermission === 'default' &&
              !notifRequested && (
                <div className="mt-3 p-2.5 rounded-xl bg-indigo-50/80 border border-indigo-100/80 flex items-center justify-between gap-2 text-xs">
                  <span className="text-indigo-900 font-medium leading-snug">
                    ¿Quieres recibir avisos en tu navegador?
                  </span>
                  <button
                    type="button"
                    onClick={handleEnableNotifications}
                    className="shrink-0 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-2.5 py-1 rounded-lg transition-colors duration-150 motion-safe:enabled:active:scale-[0.96]"
                  >
                    Activar
                  </button>
                </div>
              )}

            {/* Actions */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <a
                href="/#ranking-bancos"
                onClick={dismissAlert}
                className="text-xs font-bold text-indigo-700 hover:text-indigo-900 hover:underline transition-colors py-1"
              >
                Ver comparativa completa →
              </a>

              <button
                type="button"
                onClick={dismissAlert}
                className="text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg transition-colors duration-150 motion-safe:enabled:active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
              >
                Entendido
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}
