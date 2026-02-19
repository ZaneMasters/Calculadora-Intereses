import { useEffect, useState } from 'react';
import bankOptions from '../utils/bankOptions.json';
import { useCalculatorLogic } from '../hooks/useCalculatorLogic';

export default function Calculator({ onResult }) {
  const {
    inputs,
    handleInputChange,
    calcularResultados,
    limpiar,
    resultados
  } = useCalculatorLogic();

  const [errorMonto, setErrorMonto] = useState('');
  const [showResults, setShowResults] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const monto = parseFloat(inputs.monto.replace(/,/g, ''));
    if (isNaN(monto) || monto <= 1000) {
      setErrorMonto('El monto debe ser mayor a $1,000');
      setShowResults(false);
      return;
    }

    setErrorMonto('');
    calcularResultados();
  };

  const handleLimpiar = () => {
    limpiar();
    setErrorMonto('');
    setShowResults(false);
    if (onResult) {
      onResult(null);
    }
  };

  useEffect(() => {
    if (resultados && onResult) {
      onResult(resultados);
      // Hacer visible el bloque de resultados con animación
      setShowResults(false);
      setTimeout(() => setShowResults(true), 50); // delay para activar transición
    }
  }, [resultados, onResult]);

  return (
    <div className="bg-white shadow-xl p-8 rounded-xl w-full max-w-2xl mx-auto border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-indigo-700 text-center">Calculadora de Rendimientos Financieros</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-1 font-semibold text-gray-700">🏦 Banco</label>
          <select
            className="w-full border p-2 rounded focus:ring-indigo-500 focus:border-indigo-500"
            value={inputs.banco}
            onChange={(e) => handleInputChange('banco', e.target.value)}
          >
            {Object.entries(bankOptions).map(([key, val]) => (
              <option key={key} value={key}>{val.nombre}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-semibold text-gray-700">💰 Monto Inicial ($)</label>
          <input
            type="text"
            className="w-full border p-2 rounded focus:ring-indigo-500 focus:border-indigo-500"
            value={inputs.monto}
            onChange={(e) => handleInputChange('monto', e.target.value)}
            placeholder="Ej: 1,000,000"
          />
          {errorMonto && <p className="text-red-600 text-sm mt-1">{errorMonto}</p>}
        </div>

        <div>
          <label className="block mb-1 font-semibold text-gray-700">📅 Plazo (meses)</label>
          <input
            type="number"
            className="w-full border p-2 rounded focus:ring-indigo-500 focus:border-indigo-500"
            min={1}
            max={60}
            value={inputs.meses}
            onChange={(e) => handleInputChange('meses', e.target.value)}
          />
        </div>

        <div className="flex gap-4 mt-6">
          <button
            type="submit"
            className="bg-indigo-700 text-white px-6 py-2 rounded hover:bg-indigo-800 transition"
          >
            Calcular
          </button>
          <button
            type="button"
            className="bg-gray-200 text-gray-800 px-6 py-2 rounded hover:bg-gray-300 transition"
            onClick={handleLimpiar}
          >
            Limpiar
          </button>
        </div>
      </form>

      {resultados && (
        <div
          className={`mt-8 bg-gray-50 border-t border-gray-200 pt-6 px-4 rounded-lg shadow-sm text-gray-700 text-sm space-y-3 transform transition-all duration-700 ease-out
            ${showResults ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
          `}
        >
          <p><strong>📈 Tasa efectiva anual:</strong> {resultados.tasaEA ? `${(resultados.tasaEA * 100).toFixed(2)}%` : 'No disponible'}</p>
          <p><strong>💵 Intereses totales:</strong> ${Number(resultados.interesesTotales.toFixed(2)).toLocaleString()}</p>
          <p><strong>💰 Total final:</strong> ${Number(resultados.totalFinal.toFixed(2)).toLocaleString()}</p>
          <p><strong>📆 Rendimiento mensual:</strong> ${Number(resultados.interesesMensuales.toFixed(2)).toLocaleString()}</p>
          {resultados.interesesDiarios && (
            <p><strong>📅 Rendimiento diario:</strong> ${Number(resultados.interesPrimerDia.toFixed(2)).toLocaleString()}</p>
          )}
          <p className={resultados.aplicaRete ? 'text-red-600 font-semibold' : 'text-green-600 font-semibold'}>
            {resultados.aplicaRete ? '⚠️ Aplica retención en la fuente' : '✅ No aplica retención en la fuente'}
          </p>
        </div>
      )}
    </div>
  );
}
