import { motion, MotionConfig } from 'framer-motion';
import { Shield, AlertTriangle, FileText, Wallet, CheckCircle2, TrendingUp, Calendar } from 'lucide-react';

export default function TopesInfo() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-12 md:py-16">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-5 sm:mb-16"
      >
        <div className="inline-flex items-center gap-2 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-800 text-[11px] sm:text-sm font-semibold mb-2 sm:mb-6">
          <span className="flex h-1.5 w-1.5 sm:h-2 sm:w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-emerald-600"></span>
          </span>
          Guía Financiera 2026
        </div>
        
        <h1 className="text-xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-2 sm:mb-6 leading-tight">
          Topes Cuentas de Bajo Monto y <span className="text-blue-800">Límites 2026</span>
        </h1>
        
        <p className="text-xs sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          <span className="sm:hidden font-medium">Límites oficiales de 4x1000, topes mensuales y renta en Colombia.</span>
          <span className="hidden sm:inline">Manténte informado sobre los límites legales para evitar el 4x1000, bloqueos en tus cuentas y saber cuándo debes declarar renta en Colombia.</span>
        </p>

        {/* UVT 2026 Badge */}
        <div className="inline-flex items-center gap-2 sm:gap-3 mt-3 sm:mt-6 px-3 sm:px-5 py-1.5 sm:py-3 rounded-xl sm:rounded-2xl bg-gradient-to-r from-blue-50 to-emerald-50 border border-blue-200 shadow-sm max-w-full text-left">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-blue-600">UVT 2026</span>
            <span className="text-blue-300 text-base sm:text-lg leading-none">|</span>
            <span className="text-lg sm:text-2xl font-extrabold text-blue-900 tracking-tight tabular-nums">$52.374</span>
          </div>
          <div className="h-6 sm:h-8 w-px bg-blue-200 hidden sm:block" />
          <span className="text-xs text-slate-500 hidden sm:inline leading-snug">
            Valor fijado por la <strong className="text-slate-600">DIAN</strong> para el año gravable 2026
          </span>
        </div>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-4 sm:space-y-12"
      >
        {/* Bajo Monto */}
        <motion.div variants={itemVariants} className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-3.5 sm:p-8 flex flex-col sm:flex-row gap-3 sm:gap-8 items-start">
            <div className="bg-blue-50 p-2.5 sm:p-4 rounded-xl sm:rounded-2xl text-blue-700 shrink-0 border border-blue-100 hidden sm:flex">
              <Wallet className="w-5 h-5 sm:w-8 sm:h-8" />
            </div>
            <div className="flex-1 w-full min-w-0">
              <h3 className="text-base sm:text-2xl font-bold text-slate-900 mb-0.5 sm:mb-2 flex items-center gap-2">
                <Wallet className="w-5 h-5 text-blue-700 sm:hidden shrink-0" />
                Cuentas de Bajo Monto
              </h3>
              <p className="hidden sm:block text-xs sm:text-sm text-slate-600 mb-4 sm:mb-6">Aplica para billeteras digitales como Nequi, DaviPlata, Ualá, RappiPay (Bolsillos), etc.</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
                <div className="bg-slate-50 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-2 text-blue-800 font-semibold mb-2 sm:mb-3 text-xs sm:text-sm">
                    <Shield className="w-4 h-4 shrink-0" /> Tope Movimientos (Mes)
                  </div>
                  <div className="text-xl sm:text-3xl font-extrabold text-slate-900 mb-1 tabular-nums break-words">$11.024.727</div>
                  <div className="text-xs text-slate-500 font-medium mb-2 sm:mb-0">210,5 UVT (2026)</div>
                  <p className="hidden sm:block text-sm text-slate-600 mt-4">Si superas este monto en depósitos o retiros, la cuenta se bloqueará o deberás pasarla a una cuenta de ahorros tradicional.</p>
                </div>

                <div className="bg-emerald-50 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-emerald-100">
                  <div className="flex items-center gap-2 text-emerald-700 font-semibold mb-2 sm:mb-3 text-xs sm:text-sm">
                    <CheckCircle2 className="w-4 h-4 shrink-0" /> Exento 4x1000 (Mes)
                  </div>
                  <div className="text-xl sm:text-3xl font-extrabold text-emerald-900 mb-1 tabular-nums break-words">$3.404.310</div>
                  <div className="text-xs text-emerald-600 font-medium mb-2 sm:mb-0">65 UVT (2026)</div>
                  <p className="hidden sm:block text-sm text-emerald-800 mt-4">Tus movimientos mensuales hasta este valor no pagan el 4x1000, <strong>sin necesidad de marcar la cuenta</strong>.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 4x1000 Cuentas de Ahorro */}
        <motion.div variants={itemVariants} className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-3.5 sm:p-8 flex flex-col sm:flex-row gap-3 sm:gap-8 items-start relative z-10">
            <div className="bg-blue-50 p-2.5 sm:p-4 rounded-xl sm:rounded-2xl text-blue-700 shrink-0 border border-blue-100 hidden sm:flex">
              <TrendingUp className="w-5 h-5 sm:w-8 sm:h-8" />
            </div>
            <div className="flex-1 w-full">
              <h3 className="text-base sm:text-2xl font-bold text-slate-900 mb-0.5 sm:mb-2 flex flex-wrap items-center gap-1.5 sm:gap-2">
                <TrendingUp className="w-5 h-5 text-blue-700 sm:hidden shrink-0" />
                <span>Exención 4x1000</span>
                <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] sm:text-xs font-bold uppercase tracking-wider">Ahorros</span>
              </h3>
              <p className="hidden sm:block text-xs sm:text-sm text-slate-600 mb-4 sm:mb-6">Aplica para tu cuenta de nómina o ahorros principal en cualquier banco (Bancolombia, Nu, Lulo, etc.).</p>
              
              <div className="bg-slate-50/70 rounded-xl sm:rounded-2xl border border-slate-100 p-3 sm:p-6">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 sm:gap-6">
                  <div className="flex-1 space-y-3 sm:space-y-4">
                    <div>
                      <div className="text-[11px] sm:text-sm text-slate-500 font-medium mb-0.5 sm:mb-1">Tope máximo exento (Mensual)</div>
                      <div className="text-2xl sm:text-4xl font-extrabold text-slate-900 mb-0.5 sm:mb-1 tabular-nums">$18.330.900</div>
                      <div className="text-[11px] sm:text-sm text-blue-800 font-medium">350 UVT (2026) · Art. 879 E.T.</div>
                    </div>
                    <div className="bg-amber-50 text-amber-700 p-2.5 sm:p-4 rounded-xl border border-amber-100 flex items-start gap-2 text-xs sm:text-sm font-medium w-full">
                      <AlertTriangle className="w-4 h-4 shrink-0 text-amber-500 mt-0.5" />
                      <span>Solo puedes tener <strong>UNA única cuenta</strong> exenta del 4x1000 en el sistema financiero.</span>
                    </div>
                  </div>
                  <div className="hidden sm:flex shrink-0 w-36 h-36 lg:w-44 lg:h-44 p-2 bg-gradient-to-br from-emerald-500/5 to-blue-500/5 rounded-2xl border border-slate-200/60 items-center justify-center">
                    <img 
                      src="/illustrations/tax-shield-dian.svg" 
                      alt="Exención DIAN 4x1000 y Estatuto Tributario" 
                      width="160" 
                      height="160" 
                      className="w-full h-full object-contain filter drop-shadow-sm transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Declaracion Renta */}
        <motion.div variants={itemVariants} className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-3.5 sm:p-8 flex flex-col sm:flex-row gap-3 sm:gap-8 items-start">
            <div className="bg-rose-50 p-2.5 sm:p-4 rounded-xl sm:rounded-2xl text-rose-600 shrink-0 border border-rose-100 hidden sm:flex">
              <FileText className="w-5 h-5 sm:w-8 sm:h-8" />
            </div>
            <div className="flex-1 w-full">
              <h3 className="text-base sm:text-2xl font-bold text-slate-900 mb-0.5 sm:mb-2 flex items-center gap-2">
                <FileText className="w-5 h-5 text-rose-600 sm:hidden shrink-0" />
                Topes para Declarar Renta
              </h3>
              <p className="hidden sm:block text-xs sm:text-sm text-slate-600 mb-3 sm:mb-6">
                Si superas <strong>cualquiera</strong> de estos topes durante el año, estarás obligado a presentar tu declaración de renta.
                <span className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 bg-amber-50 text-amber-700 rounded-lg text-xs font-medium border border-amber-100 ml-0 sm:ml-1">
                  <AlertTriangle className="w-3 h-3 text-amber-500" /> Los rendimientos suman como ingresos anuales.
                </span>
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6 w-full">
                {/* 2025 */}
                <div className="bg-slate-50 p-3 sm:p-6 rounded-xl sm:rounded-2xl border border-slate-200">
                  <div className="flex justify-between items-center mb-3 sm:mb-6">
                    <h4 className="font-bold text-slate-800 text-xs sm:text-lg flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" /> 2025
                    </h4>
                    <span className="text-[10px] sm:text-xs font-bold bg-slate-200 text-slate-700 px-2 py-0.5 sm:py-1 rounded-md">Declara en 2026</span>
                  </div>
                  <ul className="space-y-3 sm:space-y-4">
                    <li>
                      <div className="text-[11px] sm:text-sm text-slate-500 font-medium mb-0.5">Ingresos / Compras / Consignaciones</div>
                      <div className="text-xl sm:text-2xl font-bold text-slate-900 tabular-nums">$69.718.600</div>
                      <div className="text-[10px] sm:text-xs text-slate-400 font-medium">1.400 UVT</div>
                    </li>
                    <li className="pt-3 sm:pt-4 border-t border-slate-200">
                      <div className="text-[11px] sm:text-sm text-slate-500 font-medium mb-0.5">Patrimonio Bruto (Bienes, Cuentas)</div>
                      <div className="text-xl sm:text-2xl font-bold text-slate-900 tabular-nums">$224.095.500</div>
                      <div className="text-[10px] sm:text-xs text-slate-400 font-medium">4.500 UVT</div>
                    </li>
                  </ul>
                </div>

                {/* 2026 */}
                <div className="bg-blue-50 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-blue-100">
                  <div className="flex justify-between items-center mb-4 sm:mb-6">
                    <h4 className="font-bold text-slate-800 text-sm sm:text-lg flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-slate-400" /> 2026
                    </h4>
                    <span className="text-[10px] sm:text-xs font-bold bg-blue-200 text-blue-900 px-2 py-0.5 sm:py-1 rounded-md">Declara en 2027</span>
                  </div>
                  <ul className="space-y-3 sm:space-y-4">
                    <li>
                      <div className="text-[11px] sm:text-sm text-slate-500 font-medium mb-0.5">Ingresos / Compras / Consignaciones</div>
                      <div className="text-xl sm:text-2xl font-extrabold text-slate-900 tabular-nums">$73.323.600</div>
                      <div className="text-[10px] sm:text-xs text-slate-400 font-medium">1.400 UVT</div>
                    </li>
                    <li className="pt-3 sm:pt-4 border-t border-slate-200">
                      <div className="text-[11px] sm:text-sm text-slate-500 font-medium mb-0.5">Patrimonio Bruto (Bienes, Cuentas)</div>
                      <div className="text-xl sm:text-2xl font-extrabold text-slate-900 tabular-nums">$235.683.000</div>
                      <div className="text-[10px] sm:text-xs text-slate-400 font-medium">4.500 UVT</div>
                    </li>
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
    </MotionConfig>
  );
}
