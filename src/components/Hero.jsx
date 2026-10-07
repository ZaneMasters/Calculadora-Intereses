import { motion, MotionConfig } from 'framer-motion';
import { TrendingUp, ShieldCheck, Wallet } from 'lucide-react';

export default function Hero() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="relative pt-6 pb-8 sm:pt-20 sm:pb-24 lg:pb-32 overflow-hidden">
      {/* Decorative ambient brand icon in hero background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-[460px] sm:h-[460px] -z-10 pointer-events-none opacity-[0.05] sm:opacity-[0.08] select-none transform rotate-6">
        <img src="/logo.png" alt="" className="w-full h-full object-contain rounded-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 340, damping: 30, mass: 0.9 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="tracking-tight mb-3 sm:mb-8 leading-tight">
            {/* Minimalist badge on mobile, full on desktop */}
            <span className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-4 sm:py-2 rounded-full bg-indigo-50/90 border border-indigo-100 text-indigo-700 text-[11px] sm:text-sm font-semibold mb-2.5 sm:mb-5 shadow-xs max-w-full">
              <span className="flex h-1.5 w-1.5 sm:h-2 sm:w-2 relative shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-indigo-600"></span>
              </span>
              <span className="sm:hidden">Tasas Colombia 2026</span>
              <span className="hidden sm:inline">Calculadora de Rendimientos Cuentas de Ahorro Colombia 2026</span>
            </span>

            <span className="text-2xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 block">
              Haz que tu dinero <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
                trabaje para ti
              </span>
            </span>
          </h1>
          
          <p className="text-xs sm:text-lg text-slate-600 leading-relaxed mb-3 sm:mb-10 max-w-2xl mx-auto">
            Calcula y compara los rendimientos reales de las mejores cuentas de ahorro en Colombia.
            <span className="hidden sm:inline"> Descubre dónde crece más rápido tu capital.</span>
          </p>
        </motion.div>

        {/* Mobile: Ultra-minimalist row of pills */}
        <div className="flex sm:hidden items-center justify-center gap-1.5 flex-wrap mt-3 mb-2">
          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/80 border border-slate-200/60 text-[10px] font-medium text-slate-600 shadow-xs">
            <TrendingUp className="w-3 h-3 text-indigo-600 shrink-0" />
            <span>Tasas al día</span>
          </div>
          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/80 border border-slate-200/60 text-[10px] font-medium text-slate-600 shadow-xs">
            <ShieldCheck className="w-3 h-3 text-indigo-600 shrink-0" />
            <span>Topes 2026</span>
          </div>
          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/80 border border-slate-200/60 text-[10px] font-medium text-slate-600 shadow-xs">
            <Wallet className="w-3 h-3 text-indigo-600 shrink-0" />
            <span>Simulador real</span>
          </div>
        </div>

        {/* Desktop: Rich feature cards */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28, mass: 0.9, delay: 0.15 }}
          className="hidden sm:grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12"
        >
          {[
            { tag: "Comparación", title: "Tasas Actualizadas", icon: TrendingUp, desc: "Monitoreamos constantemente las E.A. de los bancos líderes." },
            { tag: "Seguridad", title: "Topes y Retención", icon: ShieldCheck, desc: "Avisos automáticos de límites de bajo monto y retención en la fuente." },
            { tag: "Interactivo", title: "Simulación Real", icon: Wallet, desc: "Resultados mensuales y totales con herramientas de slider fáciles." }
          ].map((feature, i) => (
            <div key={i} className="bg-white/60 backdrop-blur-md border border-white p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-left hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-[transform,box-shadow] duration-200 ease-out motion-safe:hover:-translate-y-1.5 group flex flex-col items-start">
              <div className="bg-indigo-100/50 w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-indigo-600 motion-safe:group-hover:scale-110 transition-transform duration-200 ease-out shrink-0">
                <feature.icon className="w-6 h-6" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-slate-900 mb-2 text-base">{feature.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{feature.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
    </MotionConfig>
  );
}
