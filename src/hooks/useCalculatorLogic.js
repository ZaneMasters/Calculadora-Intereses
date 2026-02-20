import { useState } from 'react';
import { getBankSettings } from '../utils/bankConfig';
import { formatNumber, unformat } from '../utils/format';

//const RETE_FUENTE_LIMITE_2025 = 2739 * 30; // mensual
const RETE_FUENTE_LIMITE_2025 = 3038 * 30; // mensual

export function useCalculatorLogic() {
  const [inputs, setInputs] = useState({
    banco: 'Nu',
    monto: '',
    meses: 12,
    usarTasaPersonalizada: false,
    tasaPersonalizada: ''
  });

  const [resultados, setResultados] = useState(null);

  const handleInputChange = (field, value) => {
    setInputs((prev) => ({
      ...prev,
      [field]: field === 'monto' ? formatNumber(unformat(value)) : value
    }));
  };

  const toggleTasaPersonalizada = () => {
    setInputs((prev) => ({
      ...prev,
      usarTasaPersonalizada: !prev.usarTasaPersonalizada,
      tasaPersonalizada: ''
    }));
    setResultados(null);
  };

  const limpiar = () => {
    setInputs({
      banco: 'Nu',
      monto: '',
      meses: 12,
      usarTasaPersonalizada: false,
      tasaPersonalizada: ''
    });
    setResultados(null);
  };

  const calcularResultados = () => {
    const { banco, monto, meses, usarTasaPersonalizada, tasaPersonalizada } = inputs;
    let tasaEA, capitalizacion;

    if (usarTasaPersonalizada) {
      tasaEA = parseFloat(tasaPersonalizada) / 100;
      capitalizacion = 'mensual'; // Default para personalizada
    } else {
      const settings = getBankSettings(banco);
      tasaEA = settings.tasaEA;
      capitalizacion = settings.capitalizacion;
    }

    const montoInicial = unformat(monto);
    const periodos = capitalizacion === 'diaria' ? meses * 30 : meses;

    // Convertimos la Tasa Efectiva Anual a Tasa Nominal Diaria o Mensual
    const tasaPeriodo = capitalizacion === 'diaria'
      ? Math.pow(1 + tasaEA, 1 / 365) - 1
      : Math.pow(1 + tasaEA, 1 / 12) - 1;

    let crecimiento = [];
    let capital = montoInicial;

    for (let i = 1; i <= periodos; i++) {
      capital *= (1 + tasaPeriodo);
      crecimiento.push({
        mes: capitalizacion === 'diaria' ? `Día ${i}` : `Mes ${i}`,
        valor: capital
      });
    }

    const interesesTotales = capital - montoInicial;
    // Retención (7%) si el interés mensual supera el límite en UVT
    const interesesMensuales = interesesTotales / meses;
    const aplicaRete = interesesMensuales > RETE_FUENTE_LIMITE_2025;
    const valorRete = aplicaRete ? interesesTotales * 0.07 : 0;

    // Nuevo: interés del primer día real (no promedio)
    const interesPrimerDia = capitalizacion === 'diaria'
      ? montoInicial * tasaPeriodo
      : null;

    setResultados({
      crecimiento,
      interesesTotales,
      totalFinal: capital - valorRete,
      interesesMensuales,
      interesesDiarios: capitalizacion === 'diaria' ? interesesTotales / (meses * 30) : null,
      interesPrimerDia,
      aplicaRete,
      valorRete,
      tasaPeriodo,
      tasaEA
    });
  };

  return {
    inputs,
    handleInputChange,
    toggleTasaPersonalizada,
    calcularResultados,
    limpiar,
    resultados
  };
}
