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

  const handleSubmit = (e) => {
    e.preventDefault();
    calcularResultados();
  };

  return (
    <div className="bg-white shadow p-6 rounded-lg w-full max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4 text-indigo-600">Calculadora de Rendimientos</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">Banco</label>
          <select
            className="w-full border p-2 rounded"
            value={inputs.banco}
            onChange={(e) => handleInputChange('banco', e.target.value)}
          >
            {Object.entries(bankOptions).map(([key, val]) => (
              <option key={key} value={key}>{val.nombre}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-semibold">Monto Inicial ($)</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={inputs.monto}
            onChange={(e) => handleInputChange('monto', e.target.value)}
            placeholder="Ej: 1,000,000"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Plazo (meses)</label>
          <input
            type="number"
            className="w-full border p-2 rounded"
            min={1}
            max={60}
            value={inputs.meses}
            onChange={(e) => handleInputChange('meses', e.target.value)}
          />
        </div>

        <div className="flex gap-4 mt-4">
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Calcular
          </button>
          <button
            type="button"
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
            onClick={limpiar}
          >
            Limpiar
          </button>
        </div>
      </form>

      {resultados && (
        <div className="bg-indigo-50 rounded mt-6 text-sm text-gray-700 space-y-2">
          <p><strong>Intereses totales:</strong> ${Number(resultados.interesesTotales.toFixed(2)).toLocaleString()}</p>
          <p><strong>Total final:</strong> ${Number(resultados.totalFinal.toFixed(2)).toLocaleString()}</p>
          <p><strong>Rendimiento mensual:</strong> ${Number(resultados.interesesMensuales.toFixed(2)).toLocaleString()}</p>
          {resultados.interesesDiarios && (
            <p><strong>Rendimiento diario:</strong> ${Number(resultados.interesesDiarios.toFixed(2)).toLocaleString()}</p>
          )}
          <p className={resultados.aplicaRete ? 'text-red-600 font-semibold' : 'text-green-600 font-semibold'}>
            {resultados.aplicaRete ? 'Aplica retención en la fuente' : 'No aplica retención en la fuente'}
          </p>
        </div>
      )}
    </div>
  );
}
