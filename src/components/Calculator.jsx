import { useEffect, useState } from 'react';
import bankOptions from '../utils/bankOptions.json';
import { useCalculatorLogic } from '../hooks/useCalculatorLogic';

export default function Calculator({ onResult }) {
  const {
    inputs,
    handleInputChange,
    toggleTasaPersonalizada,
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

    if (!inputs.usarTasaPersonalizada) {
      const bancoSeleccionado = bankOptions[inputs.banco];
      if (bancoSeleccionado?.isBajoMonto && monto > 11024727) {
        handleLimpiar(); // Limpia todo el formulario incluyendo los resultados
        setErrorMonto('El monto supera el tope de depósitos de bajo monto para 2026 ($11.024.727)'); // Volvemos a setear el error porque handleLimpiar lo borró
        return;
      }
    }

    if (inputs.usarTasaPersonalizada && (!inputs.tasaPersonalizada || inputs.tasaPersonalizada <= 0)) {
        // Validación básica para tasa personalizada
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
      setShowResults(false);
      setTimeout(() => setShowResults(true), 50);
    }
  }, [resultados, onResult]);

  return (
    <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl w-full max-w-4xl mx-auto border border-white/20 overflow-hidden transition-all duration-300 hover:shadow-2xl">
      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-white text-center">Simulador de Inversión</h2>
        <p className="text-indigo-100 text-center mt-2 text-sm sm:text-base">Calcula cuánto crecerá tu dinero con las mejores tasas del mercado.</p>
      </div>

      <div className="p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
            
          {/* Toggle Tasa Personalizada */}
          <div className="flex items-center justify-end mb-4">
            <label className="inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={inputs.usarTasaPersonalizada}
                onChange={toggleTasaPersonalizada}
              />
              <div className="relative w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              <span className="ms-3 text-sm font-medium text-slate-700">Usar tasa personalizada</span>
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">
                {inputs.usarTasaPersonalizada ? 'Tasa E.A. Anual (%)' : 'Banco / Entidad'}
              </label>
              
              {inputs.usarTasaPersonalizada ? (
                 <input
                    type="number"
                    step="0.01"
                    className="w-full bg-slate-50 border border-slate-300 focus:border-indigo-500 focus:ring-indigo-100 text-slate-700 py-3 px-4 rounded-lg leading-tight focus:outline-none focus:bg-white transition-all"
                    value={inputs.tasaPersonalizada}
                    onChange={(e) => handleInputChange('tasaPersonalizada', e.target.value)}
                    placeholder="Ej: 12.5"
                    required
                 />
              ) : (
                  <div className="relative">
                    <div className="flex items-center gap-2 mb-1">
                       <select
                        className="w-full appearance-none bg-slate-50 border border-slate-300 text-slate-700 py-3 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all cursor-pointer"
                        value={inputs.banco}
                        onChange={(e) => handleInputChange('banco', e.target.value)}
                      >
                        {Object.entries(bankOptions).map(([key, val]) => (
                          <option key={key} value={key}>{val.nombre}</option>
                        ))}
                      </select>
                      {bankOptions[inputs.banco]?.nota && (
                        <div className="group relative flex items-center">
                           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-indigo-500 cursor-help">
                             <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                           </svg>
                           <div className="absolute right-0 bottom-full mb-2 w-56 p-2 bg-slate-800 text-white text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 text-center">
                             {bankOptions[inputs.banco].nota}
                             <div className="absolute top-full right-2 border-4 border-transparent border-t-slate-800"></div>
                           </div>
                        </div>
                      )}
                    </div>

                    <div className="pointer-events-none absolute inset-y-0 right-0 top-0 flex items-center px-4 text-slate-500">
                         {/* SVG Adjusted to ignore the icon width, actually easier to put icon inside input if possible but select prevents it. 
                             Let's keep the select clean and put icon outside or overlay.
                             Wait, the structure above puts select and icon side-by-side? 
                             No, 'flex items-center gap-2' handles it.
                             But the 'absolute' arrow icon for select needs to be positioned relative to the select wrapper.
                          */}
                    </div>
                     {/* Re-doing structure for better positioning */}
                  </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">Monto a Invertir ($)</label>
              <input
                type="text"
                className={`w-full bg-slate-50 border ${errorMonto ? 'border-red-500 focus:ring-red-100' : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-100'} text-slate-700 py-3 px-4 rounded-lg leading-tight focus:outline-none focus:bg-white transition-all`}
                value={inputs.monto}
                onChange={(e) => handleInputChange('monto', e.target.value)}
                placeholder="Ej: 1,000,000"
              />
              {errorMonto && <p className="text-red-500 text-xs mt-1 animate-pulse">{errorMonto}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">Plazo de la inversión (Meses)</label>
            <div className="flex items-center gap-4">
               <input
                type="range"
                min="1"
                max="60"
                value={inputs.meses}
                onChange={(e) => handleInputChange('meses', e.target.value)}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <input
                type="number"
                className="w-20 bg-slate-50 border border-slate-300 text-slate-700 py-2 px-2 rounded-lg text-center focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                min={1}
                max={60}
                value={inputs.meses}
                onChange={(e) => handleInputChange('meses', e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-indigo-500/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Calcular Rendimiento
            </button>
            <button
              type="button"
              className="px-6 py-3 border border-slate-300 text-slate-600 font-semibold rounded-lg hover:bg-slate-50 transition-all"
              onClick={handleLimpiar}
            >
              Limpiar
            </button>
          </div>
        </form>

        {resultados && (
          <div
            className={`mt-10 transform transition-all duration-700 ease-out
              ${showResults ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
            `}
          >
            <div className="relative">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-3 bg-white text-lg font-medium text-slate-500">Resultados</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                 {/* Card Tasa */}
                 <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                    <p className="text-sm text-indigo-600 font-medium mb-1">{inputs.usarTasaPersonalizada ? 'Tasa Personalizada (E.A.)' : 'Tasa Efectiva Anual'}</p>
                    <p className="text-2xl font-bold text-indigo-900">{resultados.tasaEA ? `${(resultados.tasaEA * 100).toFixed(2)}%` : '---'}</p>
                 </div>
                 {/* Card Ganancia Total */}
                 <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                    <p className="text-sm text-emerald-600 font-medium mb-1">Ganancia Total (Intereses)</p>
                    <p className="text-2xl font-bold text-emerald-900">+${Number(resultados.interesesTotales.toFixed(0)).toLocaleString()}</p>
                 </div>
            </div>

            <div className="mt-4 bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-3">
               <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-600">Total Final (Capital + Interés):</span>
                  <span className="font-bold text-slate-900 text-lg">${Number(resultados.totalFinal.toFixed(0)).toLocaleString()}</span>
               </div>
               <div className="flex justify-between items-center text-sm border-t border-slate-200 pt-3">
                  <span className="text-slate-600">Rendimiento Mensual Est.:</span>
                  <span className="font-semibold text-slate-800">${Number(resultados.interesesMensuales.toFixed(0)).toLocaleString()}</span>
               </div>
               {resultados.interesesDiarios && (
                  <div className="flex justify-between items-center text-sm border-t border-slate-200 pt-3">
                     <span className="text-slate-600">Rendimiento Diario Est.:</span>
                     <span className="font-semibold text-slate-800">${Number(resultados.interesPrimerDia.toFixed(0)).toLocaleString()}</span>
                  </div>
               )}
               <div className={`mt-4 pt-3 flex flex-col gap-1 text-sm font-medium ${resultados.aplicaRete ? 'text-amber-600' : 'text-emerald-600'}`}>
                  <div className="flex items-center gap-2">
                    <span>{resultados.aplicaRete ? '⚠️' : '✅'}</span>
                    {resultados.aplicaRete ? 'Aplica retención en la fuente (7%)' : 'No aplica retención en la fuente'}
                  </div>
                  {resultados.aplicaRete && (
                    <div className="pl-6 text-slate-500 text-xs font-normal">
                      Valor retenido aprox: <span className="font-semibold text-rose-600">-${Number(resultados.valorRete.toFixed(0)).toLocaleString()}</span>
                    </div>
                  )}
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
