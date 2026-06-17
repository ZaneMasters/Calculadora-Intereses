import { motion } from 'framer-motion';
import { TrendingUp, ShieldCheck, Wallet } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative pt-12 pb-20 sm:pt-20 sm:pb-24 lg:pb-32 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 340, damping: 30, mass: 0.9 }}
          className="max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs sm:text-sm font-semibold mb-5 sm:mb-6 shadow-sm">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
            </span>
            Actualizado para Junio 2026
          </div>
          
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-5 sm:mb-8 leading-tight">
            Haz que tu dinero <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
              trabaje para ti
            </span>
          </h1>
          
          <p className="text-base sm:text-xl text-slate-600 leading-relaxed mb-8 sm:mb-10 max-w-2xl mx-auto">
            Calcula y compara los rendimientos reales de las mejores cuentas de ahorro en Colombia.
            <span className="hidden sm:inline"> Descubre dónde crece más rápido tu capital.</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28, mass: 0.9, delay: 0.15 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 max-w-4xl mx-auto mt-8 sm:mt-12"
        >
          {[
            { tag: "Comparación", title: "Tasas Actualizadas", icon: TrendingUp, desc: "Monitoreamos constantemente las E.A. de los bancos líderes." },
            { tag: "Seguridad", title: "Topes y Retención", icon: ShieldCheck, desc: "Avisos automáticos de límites de bajo monto y retención en la fuente." },
            { tag: "Interactivo", title: "Simulación Real", icon: Wallet, desc: "Resultados mensuales y totales con herramientas de slider fáciles." }
          ].map((feature, i) => (
            <div key={i} className="bg-white/60 backdrop-blur-md border border-white p-4 sm:p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-left hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-1.5 will-change-transform group flex sm:flex-col items-start gap-3 sm:gap-0">
              <div className="bg-indigo-100/50 w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center sm:mb-4 text-indigo-600 group-hover:scale-110 transition-transform duration-200 ease-out shrink-0">
                <feature.icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1 sm:mb-2 text-sm sm:text-base">{feature.title}</h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">{feature.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
