import { motion, MotionConfig } from 'framer-motion';
import { TrendingUp, ShieldCheck, Wallet } from 'lucide-react';

export default function Hero() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="relative pt-6 pb-8 sm:pt-20 sm:pb-24 lg:pb-32 overflow-hidden">
        {/* High-impact dynamic wealth growth backdrop */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none select-none flex items-center justify-center">
        {/* Ambient atmospheric aura */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] lg:w-[1100px] h-[340px] sm:h-[460px] bg-gradient-to-tr from-emerald-400/20 via-blue-600/10 to-transparent blur-3xl rounded-full" />
        
        {/* Vibrant SVG Illustration with gentle floating aura (shown on sm+ screens to perfectly frame the headline) */}
        <div className="hidden sm:block w-full max-w-7xl h-full max-h-[520px] px-4 lg:px-6 opacity-100 transition-opacity duration-700">
          <img 
            src="/illustrations/hero-wealth-dynamics.svg" 
            alt="Crecimiento de rendimientos e interés compuesto" 
            className="w-full h-full object-contain filter drop-shadow-sm"
            loading="eager"
          />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="tracking-tight mb-3 sm:mb-8 leading-tight">
            {/* Minimalist badge on mobile, full on desktop */}
            <span className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-4 sm:py-2 rounded-full bg-blue-50/90 border border-blue-100 text-blue-800 text-[11px] sm:text-sm font-semibold mb-2.5 sm:mb-5 shadow-xs max-w-full">
              <span className="flex h-1.5 w-1.5 sm:h-2 sm:w-2 relative shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-emerald-600"></span>
              </span>
              <span className="sm:hidden">Tasas Colombia 2026</span>
              <span className="hidden sm:inline">Calculadora de Rendimientos Cuentas de Ahorro Colombia 2026</span>
            </span>

            <span className="text-2xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 block">
              Haz que tu dinero <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-800 to-emerald-600">
                trabaje para ti
              </span>
            </span>
          </h1>
          
          <p className="text-xs sm:text-lg text-slate-600 leading-relaxed mb-3 sm:mb-8 max-w-2xl mx-auto">
            Calcula y compara los rendimientos reales de las mejores cuentas de ahorro en Colombia.
            <span className="hidden sm:inline"> Descubre dónde crece más rápido tu capital con liquidación diaria y respaldo Fogafín.</span>
          </p>
        </motion.div>

        {/* Mobile: Ultra-minimalist row of pills */}
        <div className="flex sm:hidden items-center justify-center gap-1.5 flex-wrap mt-3 mb-2">
          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/80 border border-slate-200/60 text-[10px] font-medium text-slate-600 shadow-xs">
            <TrendingUp className="w-3 h-3 text-emerald-600 shrink-0" />
            <span>Tasas al día</span>
          </div>
          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/80 border border-slate-200/60 text-[10px] font-medium text-slate-600 shadow-xs">
            <ShieldCheck className="w-3 h-3 text-blue-700 shrink-0" />
            <span>Topes 2026</span>
          </div>
          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/80 border border-slate-200/60 text-[10px] font-medium text-slate-600 shadow-xs">
            <Wallet className="w-3 h-3 text-emerald-600 shrink-0" />
            <span>Simulador real</span>
          </div>
        </div>

        {/* Desktop: Rich feature cards with smooth transitions & depth */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="hidden sm:grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto mt-10"
        >
          {[
            { tag: "Comparación", title: "Tasas Actualizadas", icon: TrendingUp, desc: "Monitoreamos constantemente las E.A. de los bancos líderes." },
            { tag: "Seguridad", title: "Topes y Retención", icon: ShieldCheck, desc: "Avisos automáticos de límites de bajo monto y retención en la fuente." },
            { tag: "Interactivo", title: "Simulación Real", icon: Wallet, desc: "Resultados mensuales y totales con herramientas de slider fáciles." }
          ].map((feature, i) => (
            <div 
              key={i} 
              className="bg-white/80 backdrop-blur-md border border-slate-200/80 hover:border-emerald-300 p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_16px_40px_rgba(5,150,105,0.09)] transition-[transform,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:hover:-translate-y-2 group flex flex-col items-start text-left relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-emerald-500/5 to-transparent rounded-full -mr-8 -mt-8 pointer-events-none group-hover:scale-150 transition-transform duration-700 ease-out"></div>
              <div className="bg-blue-50 w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-blue-700 motion-safe:group-hover:scale-110 motion-safe:group-hover:bg-emerald-50 motion-safe:group-hover:text-emerald-700 transition-[transform,background-color,color] duration-400 ease-out shrink-0">
                <feature.icon className="w-6 h-6" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-slate-900 mb-2 text-base group-hover:text-blue-950 transition-colors duration-300">{feature.title}</h3>
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
