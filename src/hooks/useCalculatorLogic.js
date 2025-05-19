import { useState } from 'react';
import { getBankSettings } from '../utils/bankConfig';
import { formatNumber, unformat } from '../utils/format';

const RETE_FUENTE_LIMITE_2025 = 2739 * 30; // mensual

export function useCalculatorLogic() {
  const [inputs, setInputs] = useState({
    banco: 'Nu',
    monto: '',
    meses: 12
  });

  const [resultados, setResultados] = useState(null);

  const handleInputChange = (field, value) => {
    setInputs((prev) => ({
      ...prev,
      [field]: field === 'monto' ? formatNumber(unformat(value)) : value
    }));
  };

  const limpiar = () => {
    setInputs({
      banco: 'Nu',
      monto: '',
      meses: 12
    });
    setResultados(null);
  };

  const calcularResultados = () => {
    const { banco, monto, meses } = inputs;
    const { tasaEA, capitalizacion } = getBankSettings(banco);
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
        mes: `${i}${capitalizacion === 'diaria' ? '° día' : 'er mes'}`,
        valor: capital
      });
    }

    const interesesTotales = capital - montoInicial;
    const aplicaRete = interesesTotales / meses > RETE_FUENTE_LIMITE_2025;

    // Nuevo: interés del primer día real (no promedio)
    const interesPrimerDia = capitalizacion === 'diaria'
      ? montoInicial * tasaPeriodo
      : null;

    setResultados({
      crecimiento,
      interesesTotales,
      totalFinal: capital,
      interesesMensuales: interesesTotales / meses,
      interesesDiarios: capitalizacion === 'diaria' ? interesesTotales / (meses * 30) : null,
      interesPrimerDia,
      aplicaRete,
      tasaPeriodo,
      tasaEA
    });
  };

  return {
    inputs,
    handleInputChange,
    calcularResultados,
    limpiar,
    resultados
  };
}
