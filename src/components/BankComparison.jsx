import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Info, ExternalLink, CalendarDays } from 'lucide-react';
import bancosData from "../utils/bankOptions.json";
import { BankLogos } from './BankLogos';

export default function BankComparison() {
  const [activeKey, setActiveKey] = useState(null);

  const bancos = Object.entries(bancosData)
    .map(([key, value]) => ({ key, ...value }))
    .sort((a, b) => b.tasaEA - a.tasaEA);

  const getBankLogo = (key, nombre) => {
    const logoMap = {
      Nu: BankLogos.nu,
      Uala: BankLogos.uala,
      Lulo: BankLogos.lulo,
      LuloPro: BankLogos.lulo,
      PiBank: BankLogos.pibank,
      BancoPopularPlateada: BankLogos.popular,
      RappiPayBolsillo: BankLogos.rappi,
      BoldBolsillo: BankLogos.bold,
      Global66: BankLogos.global66,
      DaleBolsillo: BankLogos.dale
    };
    
    const Component = logoMap[key];
    if (Component) return <Component className="w-full h-full" />;
    
    return <div className="w-full h-full bg-slate-800 text-white font-bold flex items-center justify-center text-sm">{nombre.charAt(0)}</div>;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.04 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, ease: "easeOut" }
    }
  };

  return (
    <div className="mt-16 space-y-6">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Comparativa de Cuentas de Ahorro de Alto Rendimiento
        </h2>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Conoce las características, tasas efectivas anuales (E.A.), topes de bajo monto y condiciones de cada banco en Colombia para tomar la mejor decisión de ahorro e inversión.
        </p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="bg-white/95 shadow-[0_15px_40px_rgb(0,0,0,0.04)] rounded-3xl overflow-hidden border border-slate-200/80"
      >
        <div className="bg-gradient-to-r from-slate-50 to-white px-4 sm:px-8 py-4 sm:py-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-100 p-2 rounded-xl">
              <TrendingUp className="w-5 h-5 text-indigo-600" />
            </div>
            <h3 className="text-base sm:text-xl font-bold text-slate-800 tracking-tight">
              Ranking de Tasas Vigentes <span className="text-slate-400 font-medium text-sm sm:text-base ml-1">(E.A.)</span>
            </h3>
          </div>
          <span className="hidden sm:inline-flex items-center text-xs text-slate-400 font-medium">
            Pasa el cursor o toca para ver detalles
          </span>
        </div>
      
        <div className="p-4 sm:p-6">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-3"
          >
            {/* Header (Desktop Only) */}
            <div className="hidden sm:grid grid-cols-12 gap-4 px-6 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
              <div className="col-span-5">Entidad Financiera</div>
              <div className="col-span-4 text-center">Rendimiento (E.A.)</div>
              <div className="col-span-3 text-right">Frecuencia</div>
            </div>

            {/* Rows */}
            {bancos.map((banco, index) => {
              const isActive = activeKey === banco.key;

              return (
                <motion.div 
                  key={banco.key} 
                  variants={itemVariants}
                  onMouseEnter={() => setActiveKey(banco.key)}
                  onMouseLeave={() => setActiveKey(null)}
                  onClick={() => setActiveKey(isActive ? null : banco.key)}
                  className={`group cursor-pointer px-3 py-3 sm:px-6 sm:py-4 rounded-2xl border transition-all duration-200 ease-out ${
                    isActive
                      ? 'bg-indigo-50/70 border-indigo-300 shadow-sm'
                      : index === 0 
                        ? 'bg-gradient-to-r from-emerald-50/80 to-white border-emerald-200/90 shadow-sm shadow-emerald-500/5 hover:border-emerald-300 hover:bg-emerald-50/90' 
                        : index < 3 
                          ? 'bg-gradient-to-r from-indigo-50/40 to-white border-indigo-100/60 hover:bg-indigo-50/70 hover:border-indigo-200' 
                          : 'bg-white border-slate-100 hover:border-slate-300 hover:bg-slate-50/70'
                  }`}
                >
                  {/* Mobile layout: single row */}
                  <div className="flex items-center gap-3 sm:hidden">
                    {/* Logo */}
                    <div className="flex items-center justify-center w-9 h-9 rounded-xl flex-shrink-0 bg-white shadow-sm border border-slate-100 overflow-hidden">
                      {getBankLogo(banco.key, banco.nombre)}
                    </div>
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-bold text-slate-800 text-sm leading-tight truncate">{banco.nombre}</span>
                        {banco.isBajoMonto && (
                          <span className="inline-flex items-center rounded bg-blue-50 px-1.5 py-0.5 text-[9px] font-bold text-blue-600 uppercase tracking-widest border border-blue-100 whitespace-nowrap">
                            BM
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 mt-0.5 text-[11px] text-slate-400 font-medium">
                        <CalendarDays className="w-3 h-3" />
                        <span className="capitalize">{banco.capitalizacion}</span>
                        {banco.nota && (
                          <>
                            <span>·</span>
                            <Info className="w-3 h-3 flex-shrink-0" />
                            <span className="truncate">{banco.nota.split(' ').slice(0, 4).join(' ')}…</span>
                          </>
                        )}
                      </div>
                    </div>
                    {/* Rate badge */}
                    <span className={`inline-flex items-center justify-center px-3 py-1.5 rounded-xl text-base font-black shadow-sm flex-shrink-0 ${
                      index === 0 ? 'bg-emerald-500 text-white shadow-emerald-500/20' : 
                      index === 1 ? 'bg-emerald-100/80 text-emerald-700 border border-emerald-200/50' : 
                      index === 2 ? 'bg-indigo-50 text-indigo-700 border border-indigo-100/50' : 
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {(banco.tasaEA * 100).toFixed(2)}%
                    </span>
                  </div>

                  {/* Desktop layout: grid columns */}
                  <div className="hidden sm:grid sm:grid-cols-12 sm:gap-4 items-center">
                    <div className="col-span-5 flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-xl flex-shrink-0 bg-white shadow-sm border border-slate-100 group-hover:shadow-sm overflow-hidden">
                        {getBankLogo(banco.key, banco.nombre)}
                      </div>
                      <div className="flex flex-col items-start gap-1">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors flex items-center gap-1">
                            {banco.nombre}
                            <ExternalLink className="w-3 h-3 text-slate-400 opacity-0 -ml-1 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                          </span>
                          {banco.isBajoMonto && (
                            <span className="inline-flex items-center rounded bg-blue-50 px-1.5 py-0.5 text-[9px] font-bold text-blue-600 uppercase tracking-widest border border-blue-100 whitespace-nowrap">
                              Bajo Monto
                            </span>
                          )}
                        </div>
                        {banco.nota && (
                          <div className="flex items-center gap-1 text-[11px] font-medium text-slate-500 mt-0.5">
                            <Info className="w-3 h-3 text-slate-400 flex-shrink-0" />
                            <span className="line-clamp-1">{banco.nota}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="col-span-4 flex items-center justify-center">
                      <span className={`inline-flex items-center justify-center px-4 py-1.5 rounded-xl text-lg font-black shadow-sm ${
                        index === 0 ? 'bg-emerald-500 text-white shadow-emerald-500/20' : 
                        index === 1 ? 'bg-emerald-100/80 text-emerald-700 border border-emerald-200/50' : 
                        index === 2 ? 'bg-indigo-50 text-indigo-700 border border-indigo-100/50' : 
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {(banco.tasaEA * 100).toFixed(2)}%
                      </span>
                    </div>

                    <div className="col-span-3 flex items-center justify-end gap-1.5 text-slate-500 text-sm font-medium capitalize">
                      <CalendarDays className="w-4 h-4 text-slate-400" />
                      {banco.capitalizacion}
                    </div>
                  </div>

                  {/* Fast, GPU-accelerated CSS Grid drawer (Zero JS jank) */}
                  <div 
                    className={`grid transition-[grid-template-rows,opacity] duration-200 ease-out ${
                      isActive ? 'grid-rows-[1fr] opacity-100 pt-3 mt-3 border-t border-indigo-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs bg-white/90 p-3.5 rounded-xl border border-indigo-100 shadow-sm">
                        <p className="leading-relaxed flex-1 font-normal text-slate-700">
                          {banco.descripcion || banco.nota}
                        </p>
                        {banco.url && (
                          <a
                            href={banco.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1 font-bold text-indigo-600 hover:text-indigo-800 hover:underline shrink-0 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition-colors self-start sm:self-center"
                          >
                            <span>Ir al sitio oficial</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
        
        <div className="bg-slate-50 px-8 py-4 text-xs font-semibold text-slate-400 text-center border-t border-slate-100 uppercase tracking-widest">
          * Tasas referenciales sujetas a términos y condiciones de cada entidad. Pasa el cursor o toca una entidad para ver detalles.
        </div>
      </motion.div>
    </div>
  );
}
