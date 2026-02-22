import { motion } from 'framer-motion';
import { TrendingUp, ShieldCheck, Wallet } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative pt-12 pb-20 sm:pt-20 sm:pb-24 lg:pb-32 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm font-semibold mb-6 shadow-sm">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
            </span>
            Actualizado para febrero 2026
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-8 leading-tight">
            Haz que tu dinero <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
              trabaje para ti
            </span>
          </h1>
          
          <p className="text-xl text-slate-600 leading-relaxed mb-10 max-w-2xl mx-auto">
            Calcula, simula y compara los rendimientos reales de las mejores cuentas de ahorro en Colombia. Descubre dónde crece más rápido tu capital.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12"
        >
          {[
            { tag: "Comparación", title: "Tasas Actualizadas", icon: TrendingUp, desc: "Monitoreamos constantemente las E.A. de los bancos líderes." },
            { tag: "Seguridad", title: "Topes y Retención", icon: ShieldCheck, desc: "Avisos automáticos de límites de bajo monto y retención en la fuente." },
            { tag: "Interactivo", title: "Simulación Real", icon: Wallet, desc: "Resultados mensuales y totales con herramientas de slider fáciles." }
          ].map((feature, i) => (
            <div key={i} className="bg-white/60 backdrop-blur-md border border-white p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-left hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all hover:-translate-y-1 group">
              <div className="bg-indigo-100/50 w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-indigo-600 group-hover:scale-110 transition-transform">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
