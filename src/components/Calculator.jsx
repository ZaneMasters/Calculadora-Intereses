import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Percent, DollarSign, CalendarDays, Info, ShieldAlert, CheckCircle2, ChevronRight, Calculator as CalcIcon, RefreshCw, TrendingUp } from 'lucide-react';
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
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white/90 backdrop-blur-md shadow-[0_20px_50px_rgb(0,0,0,0.05)] rounded-3xl w-full max-w-4xl mx-auto border border-white/50 overflow-hidden transition-all duration-300"
    >
      <div className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-600 p-8 sm:p-10 relative overflow-hidden">
        {/* Decorative subtle pattern */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
        <div className="relative z-10 flex flex-col items-center">
          <div className="bg-white/20 p-3 rounded-2xl mb-4 backdrop-blur-sm border border-white/20">
            <CalcIcon className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white text-center mb-2 tracking-tight">Potencia tu Ahorro</h2>
          <p className="text-indigo-100 text-center text-sm sm:text-base max-w-lg">Ingresa tus datos y descubre la opción que hará crecer tu dinero más rápido.</p>
        </div>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
                {inputs.usarTasaPersonalizada ? <Percent className="w-4 h-4 text-indigo-500" /> : <Building2 className="w-4 h-4 text-indigo-500" />}
                {inputs.usarTasaPersonalizada ? 'Tasa E.A. Anual (%)' : 'Selecciona tu Banco'}
              </label>
              
              {inputs.usarTasaPersonalizada ? (
                 <div className="relative">
                   <input
                      type="number"
                      step="0.01"
                      className="w-full bg-slate-50 border-2 border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 text-slate-800 py-3.5 px-4 rounded-xl font-medium placeholder-slate-400 outline-none transition-all"
                      value={inputs.tasaPersonalizada}
                      onChange={(e) => handleInputChange('tasaPersonalizada', e.target.value)}
                      placeholder="Ej: 12.5"
                      required
                   />
                   <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-400 font-bold">%</div>
                 </div>
              ) : (
                  <div className="relative group">
                    <select
                      className="w-full appearance-none bg-slate-50 border-2 border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 text-slate-800 py-3.5 px-4 pr-10 rounded-xl font-medium outline-none transition-all cursor-pointer shadow-sm hover:border-slate-300"
                      value={inputs.banco}
                      onChange={(e) => handleInputChange('banco', e.target.value)}
                    >
                      {Object.entries(bankOptions).map(([key, val]) => (
                        <option key={key} value={key}>{val.nombre}</option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-400 group-hover:text-indigo-500 transition-colors">
                      <ChevronRight className="w-4 h-4 rotate-90" />
                    </div>
                    {bankOptions[inputs.banco]?.nota && (
                      <div className="absolute -top-8 right-0 group cursor-help flex items-center">
                         <Info className="w-4 h-4 text-indigo-400 hover:text-indigo-600 transition-colors" />
                         <div className="absolute right-0 bottom-full mb-1 w-56 p-2.5 bg-slate-800/95 backdrop-blur-sm text-white text-xs rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 text-center font-medium">
                           {bankOptions[inputs.banco].nota}
                           <div className="absolute top-full right-2 border-4 border-transparent border-t-slate-800/95"></div>
                         </div>
                      </div>
                    )}
                  </div>
              )}
            </div>

            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
                <DollarSign className="w-4 h-4 text-indigo-500" />
                Monto a Invertir ($)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 font-semibold">$</div>
                <input
                  type="text"
                  className={`w-full bg-slate-50 border-2 ${errorMonto ? 'border-red-400 focus:ring-red-500/20' : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/10'} text-slate-800 py-3.5 pl-8 pr-4 rounded-xl font-medium outline-none transition-all shadow-sm hover:border-slate-300 focus:ring-4`}
                  value={inputs.monto}
                  onChange={(e) => handleInputChange('monto', e.target.value)}
                  placeholder="Ej: 1,000,000"
                />
              </div>
              <AnimatePresence>
                {errorMonto && (
                  <motion.p 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-red-500 text-xs font-medium flex items-center gap-1 mt-1.5"
                  >
                    <ShieldAlert className="w-3.5 h-3.5" />
                    {errorMonto}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
                <CalendarDays className="w-4 h-4 text-indigo-500" />
                Plazo de la inversión
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  className="w-16 bg-indigo-50 border border-indigo-200 text-indigo-900 py-1.5 px-2 rounded-lg text-center font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  min={1}
                  max={60}
                  value={inputs.meses}
                  onChange={(e) => handleInputChange('meses', e.target.value)}
                />
                <span className="text-sm font-medium text-slate-500">meses</span>
              </div>
            </div>
            
            <div className="relative pt-2 pb-4">
               <input
                type="range"
                min="1"
                max="60"
                value={inputs.meses}
                onChange={(e) => handleInputChange('meses', e.target.value)}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all hover:bg-slate-300"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-2 font-medium px-1">
                <span>1 mes</span>
                <span>1 año</span>
                <span>2 años</span>
                <span>3 años</span>
                <span>5 años</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-6 mt-6 border-t border-slate-100">
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg hover:shadow-indigo-500/40 transition-all active:scale-[0.98] group"
            >
              <CalcIcon className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              <span>Calcular Rendimiento</span>
            </button>
            <button
              type="button"
              className="px-6 py-3.5 flex items-center justify-center gap-2 border-2 border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all focus:ring-4 focus:ring-slate-100 active:bg-slate-100"
              onClick={handleLimpiar}
            >
              <RefreshCw className="w-4 h-4" />
              Limpiar
            </button>
          </div>
        </form>

        <AnimatePresence>
        {resultados && showResults && (
          <motion.div
            initial={{ opacity: 0, height: 0, scale: 0.95 }}
            animate={{ opacity: 1, height: 'auto', scale: 1 }}
            exit={{ opacity: 0, height: 0, scale: 0.95 }}
            transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
            className="mt-10 pt-8"
          >
            <div className="relative mb-8">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t-2 border-dashed border-slate-200"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 bg-white text-sm font-bold text-indigo-600 uppercase tracking-widest border-2 border-slate-100 rounded-full py-1 shadow-sm">Tus Resultados</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                 {/* Card Tasa */}
                 <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-5 rounded-2xl border border-indigo-100 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl -mr-10 -mt-10"></div>
                    <div className="flex items-center gap-2 mb-2">
                      <Percent className="w-4 h-4 text-indigo-500" />
                      <p className="text-sm text-indigo-700 font-semibold">{inputs.usarTasaPersonalizada ? 'Tasa Personalizada (E.A.)' : 'Tasa Efectiva Anual'}</p>
                    </div>
                    <p className="text-3xl font-extrabold text-indigo-900 drop-shadow-sm">{resultados.tasaEA ? `${(resultados.tasaEA * 100).toFixed(2)}%` : '---'}</p>
                 </div>
                 {/* Card Ganancia Total */}
                 <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-5 rounded-2xl border border-emerald-100 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-emerald-600" />
                      <p className="text-sm text-emerald-700 font-semibold">Ganancia Total (Intereses)</p>
                    </div>
                    <p className="text-3xl font-extrabold text-emerald-900 drop-shadow-sm">
                      <span className="text-emerald-600 mr-1">+</span>
                      ${Number(resultados.interesesTotales.toFixed(0)).toLocaleString()}
                    </p>
                 </div>
            </div>

            <div className="bg-slate-50 p-6 sm:p-7 rounded-2xl border-2 border-slate-100 shadow-inner space-y-4">
               <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <span className="text-slate-600 font-medium">Total Final (Capital + Interés):</span>
                  <span className="font-extrabold text-slate-900 text-xl md:text-2xl">${Number(resultados.totalFinal.toFixed(0)).toLocaleString()}</span>
               </div>
               
               <div className="grid sm:grid-cols-2 gap-4 pt-2">
                 <div className="flex justify-between items-center text-sm p-3 bg-white rounded-lg border border-slate-100">
                    <span className="text-slate-500">Rendimiento Mensual Est.:</span>
                    <span className="font-bold text-slate-700">${Number(resultados.interesesMensuales.toFixed(0)).toLocaleString()}</span>
                 </div>
                 {resultados.interesesDiarios && (
                    <div className="flex justify-between items-center text-sm p-3 bg-white rounded-lg border border-slate-100">
                       <span className="text-slate-500">Rendimiento Diario Est.:</span>
                       <span className="font-bold text-slate-700">${Number(resultados.interesPrimerDia.toFixed(0)).toLocaleString()}</span>
                    </div>
                 )}
               </div>

               <div className={`mt-4 p-4 rounded-xl border flex flex-col gap-2 text-sm font-medium transition-colors ${resultados.aplicaRete ? 'bg-rose-50 border-rose-100 text-rose-700' : 'bg-emerald-50 border-emerald-100 text-emerald-700'}`}>
                  <div className="flex items-center gap-2.5">
                    {resultados.aplicaRete ? <ShieldAlert className="w-5 h-5 text-rose-500" /> : <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                    <span>{resultados.aplicaRete ? 'Aplica retención en la fuente (7%) por superar el UVT diario' : 'Tus rendimientos están libres de retención en la fuente'}</span>
                  </div>
                  {resultados.aplicaRete && (
                    <div className="pl-7 text-rose-600/80 text-xs sm:text-sm">
                      Valor retenido aproximadamente: <span className="font-bold text-rose-700">-${Number(resultados.valorRete.toFixed(0)).toLocaleString()}</span>
                    </div>
                  )}
               </div>
            </div>
          </motion.div>
        )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
