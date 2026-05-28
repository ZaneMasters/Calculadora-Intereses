import { motion } from 'framer-motion';
import { Shield, AlertTriangle, FileText, Wallet, CheckCircle2, TrendingUp, Calendar } from 'lucide-react';

export default function TopesInfo() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, type: "spring" } }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-20"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm font-semibold mb-6">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
          </span>
          Guía Financiera 2026
        </div>
        
        {/* Título en color sólido oscuro para asegurar que jamás se pierda en el fondo */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
          Conoce tus <span className="text-indigo-700">Topes y Límites</span>
        </h2>
        
        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
          Mantente informado sobre los límites legales para evitar el 4x1000, bloqueos en tus cuentas y saber cuándo debes declarar renta en Colombia.
        </p>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-10 md:space-y-12"
      >
        {/* Bajo Monto */}
        <motion.div variants={itemVariants} className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden relative">
          <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8 items-start">
            <div className="bg-indigo-50 p-4 rounded-2xl text-indigo-600 shrink-0 border border-indigo-100">
              <Wallet className="w-8 h-8" />
            </div>
            <div className="flex-1 w-full">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Cuentas de Bajo Monto</h3>
              <p className="text-slate-600 mb-6">Aplica para billeteras digitales como Nequi, DaviPlata, Ualá, RappiPay (Bolsillos), etc.</p>
              
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-2 text-indigo-700 font-semibold mb-3">
                    <Shield className="w-5 h-5" /> Tope de Movimientos (Mes)
                  </div>
                  <div className="text-3xl font-extrabold text-slate-900 mb-2">$11.024.727</div>
                  <div className="text-sm text-slate-500 font-medium">Equivale a 210,5 UVT (2026)</div>
                  <p className="text-sm text-slate-600 mt-4">Si superas este monto en depósitos o retiros, la cuenta se bloqueará o deberás pasarla a una cuenta de ahorros tradicional.</p>
                </div>

                <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
                  <div className="flex items-center gap-2 text-emerald-700 font-semibold mb-3">
                    <CheckCircle2 className="w-5 h-5" /> Exento 4x1000 (Mensual)
                  </div>
                  <div className="text-3xl font-extrabold text-emerald-900 mb-2">$3.404.310</div>
                  <div className="text-sm text-emerald-600 font-medium">Equivale a 65 UVT (2026)</div>
                  <p className="text-sm text-emerald-800 mt-4">Tus movimientos mensuales hasta este valor no pagan el 4x1000, <strong>sin necesidad de marcar la cuenta</strong>.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 4x1000 Cuentas de Ahorro */}
        <motion.div variants={itemVariants} className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden relative">
          <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8 items-start relative z-10">
            <div className="bg-violet-50 p-4 rounded-2xl text-violet-600 shrink-0 border border-violet-100">
              <TrendingUp className="w-8 h-8" />
            </div>
            <div className="flex-1 w-full">
              <h3 className="text-2xl font-bold text-slate-900 mb-2 flex flex-wrap items-center gap-3">
                Exención 4x1000 
                <span className="px-3 py-1 rounded-full bg-violet-100 text-violet-700 text-xs font-bold uppercase tracking-wider">Cuentas de Ahorro</span>
              </h3>
              <p className="text-slate-600 mb-6">Aplica para tu cuenta de nómina o ahorros principal en cualquier banco (Bancolombia, Nu, Lulo, etc.).</p>
              
              <div className="bg-white p-6 rounded-2xl">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div>
                    <div className="text-slate-500 font-medium mb-1">Tope máximo exento (Mensual)</div>
                    <div className="text-4xl font-extrabold text-slate-900 mb-2">$18.330.900</div>
                    <div className="text-sm text-violet-700 font-medium">
                       350 UVT (2026)
                    </div>
                  </div>
                  <div className="bg-amber-50 text-amber-700 p-4 rounded-xl border border-amber-100 flex items-start gap-3 text-sm font-medium max-w-sm w-full">
                    <AlertTriangle className="w-6 h-6 shrink-0 text-amber-500 mt-0.5" />
                    <span>Recuerda: Solo puedes tener <strong>UNA única cuenta</strong> de ahorros exenta del 4x1000 en todo el sistema financiero.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Declaracion Renta */}
        <motion.div variants={itemVariants} className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden relative">
          <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8 items-start">
            <div className="bg-rose-50 p-4 rounded-2xl text-rose-600 shrink-0 border border-rose-100">
              <FileText className="w-8 h-8" />
            </div>
            <div className="flex-1 w-full">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Topes para Declarar Renta</h3>
              <p className="text-slate-600 mb-6">
                Si superas <strong>cualquiera</strong> de estos topes durante el año, estarás obligado a presentar tu declaración de renta ante la DIAN al año siguiente.
                <br className="hidden sm:block" />
                <span className="inline-flex items-center gap-2 mt-3 px-3 py-1.5 bg-amber-50 text-amber-700 rounded-lg text-sm font-medium border border-amber-100">
                  <AlertTriangle className="w-4 h-4 text-amber-500" /> Los rendimientos e intereses suman como ingresos anuales.
                </span>
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 w-full">
                {/* 2025 */}
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                  <div className="flex justify-between items-center mb-6">
                    <h4 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-slate-400" /> Año Gravable 2025
                    </h4>
                    <span className="text-xs font-bold bg-slate-200 text-slate-700 px-2 py-1 rounded-md">Se declara en 2026</span>
                  </div>
                  <ul className="space-y-4">
                    <li>
                      <div className="text-sm text-slate-500 font-medium mb-1">Ingresos / Compras / Consignaciones</div>
                      <div className="text-2xl font-bold text-slate-900 mb-1">$69.718.600</div>
                      <div className="text-xs text-slate-400 font-medium">1.400 UVT</div>
                    </li>
                    <li className="pt-4 border-t border-slate-200">
                      <div className="text-sm text-slate-500 font-medium mb-1">Patrimonio Bruto (Bienes, Cuentas)</div>
                      <div className="text-2xl font-bold text-slate-900 mb-1">$224.095.500</div>
                      <div className="text-xs text-slate-400 font-medium">4.500 UVT</div>
                    </li>
                  </ul>
                </div>

                {/* 2026 */}
                <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
                  <div className="flex justify-between items-center mb-6">
                    <h4 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-slate-400" /> Año Gravable 2026
                    </h4>
                    <span className="text-xs font-bold bg-indigo-200 text-slate-700 px-2 py-1 rounded-md">Se declara en 2027</span>
                  </div>
                  <ul className="space-y-4">
                    <li>
                      <div className="text-sm text-slate-500 font-medium mb-1">Ingresos / Compras / Consignaciones</div>
                      <div className="text-2xl font-extrabold text-slate-900 mb-1">$73.323.600</div>
                      <div className="text-xs text-slate-400 font-medium">1.400 UVT</div>
                    </li>
                    <li className="pt-4 border-t border-slate-200">
                      <div className="text-sm text-slate-500 font-medium mb-1">Patrimonio Bruto (Bienes, Cuentas)</div>
                      <div className="text-2xl font-extrabold text-slate-900 mb-1">$235.683.000</div>
                      <div className="text-xs text-slate-400 font-medium">4.500 UVT</div>
                    </li>
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
