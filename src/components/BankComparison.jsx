import { useState } from 'react';
import { motion, MotionConfig } from 'framer-motion';
import { TrendingUp, Info, ExternalLink, CalendarDays, ChevronRight } from 'lucide-react';
import bancosData from "../utils/bankOptions.json";
import { BankLogos } from './BankLogos';

const slugMap = {
  PiBank: 'pibank',
  Nu: 'nu-colombia',
  Lulo: 'lulo-bank',
  LuloPro: 'lulo-pro',
  DaleBolsillo: 'dale',
  BoldBolsillo: 'bold',
  RappiPayBolsillo: 'rappipay',
  Uala: 'uala',
  BancoPopularPlateada: 'banco-popular',
  Global66: 'global66'
};

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
      transition: { staggerChildren: 0.05, delayChildren: 0.06 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <div id="ranking-bancos" className="space-y-6 scroll-mt-20">
      {/* Section Header with Illustrated Badge */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 max-w-4xl mx-auto bg-gradient-to-r from-blue-900/5 via-emerald-500/5 to-transparent p-3.5 sm:p-7 rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-xs">
        <div className="text-center md:text-left space-y-1 sm:space-y-2 flex-1">
          <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Comparativa de Cuentas de Ahorro <span className="hidden sm:inline">de Alto Rendimiento</span>
          </h2>
          <p className="hidden sm:block text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl">
            Monitoreamos periódicamente las tasas efectivas anuales (E.A.), capitalización y condiciones de cada banco en Colombia para ayudarte a tomar la mejor decisión de ahorro.
          </p>
        </div>
        <div className="w-40 sm:w-48 shrink-0 hidden sm:block">
          <img 
            src="/illustrations/smart-comparison-ranking.svg" 
            alt="Podio y comparativa de tasas de interés bancario" 
            className="w-full h-auto object-contain motion-safe:animate-gentle-float drop-shadow-sm" 
            width="200" 
            height="145" 
            loading="lazy" 
          />
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="bg-white/95 shadow-[0_15px_40px_rgb(0,0,0,0.04)] rounded-3xl overflow-hidden border border-slate-200/80"
      >
        <div className="bg-gradient-to-r from-slate-50 to-white px-4 sm:px-8 py-4 sm:py-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-xl">
              <TrendingUp className="w-5 h-5 text-blue-700" />
            </div>
            <h3 className="text-base sm:text-xl font-bold text-slate-800 tracking-tight">
              Ranking de Tasas Vigentes <span className="text-slate-400 font-medium text-sm sm:text-base ml-1">(E.A.)</span>
            </h3>
          </div>
          <span className="hidden sm:inline-flex items-center text-xs text-slate-400 font-medium">
            Pasa el cursor o toca para ver detalles
          </span>
        </div>
      
        <div className="p-2.5 sm:p-6">
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
                  role="button"
                  tabIndex={0}
                  aria-expanded={isActive}
                  aria-label={`Ver información detallada de ${banco.nombre}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveKey(isActive ? null : banco.key);
                    }
                  }}
                  className={`group cursor-pointer px-2.5 py-2.5 sm:px-6 sm:py-4 rounded-2xl border transition-[background-color,border-color,box-shadow] duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                    isActive
                      ? 'bg-blue-50/70 border-blue-300 shadow-sm'
                      : index === 0 
                        ? 'bg-gradient-to-r from-emerald-50/80 to-white border-emerald-200/90 shadow-sm shadow-emerald-500/5 hover:border-emerald-300 hover:bg-emerald-50/90' 
                        : index < 3 
                          ? 'bg-gradient-to-r from-blue-50/40 to-white border-blue-100/60 hover:bg-blue-50/70 hover:border-blue-200' 
                          : 'bg-white border-slate-100 hover:border-slate-300 hover:bg-slate-50/70'
                  }`}
                >
                  {/* Mobile layout: single row */}
                  <div className="flex items-center gap-2.5 sm:hidden">
                    {/* Logo */}
                    <div className="flex items-center justify-center w-8 h-8 rounded-xl flex-shrink-0 bg-white shadow-sm border border-slate-100 overflow-hidden">
                      {getBankLogo(banco.key, banco.nombre)}
                    </div>
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-slate-800 text-xs sm:text-sm leading-tight truncate">{banco.nombre}</span>
                      </div>
                      <div className="flex items-center gap-1.5 mt-0.5 text-[10px] text-slate-400 font-medium">
                        <CalendarDays className="w-2.5 h-2.5" />
                        <span className="capitalize">{banco.capitalizacion}</span>
                        {banco.nota && (
                          <>
                            <span>·</span>
                            <Info className="w-2.5 h-2.5 flex-shrink-0" />
                            <span className="truncate">{banco.nota.split(' ').slice(0, 4).join(' ')}…</span>
                          </>
                        )}
                      </div>
                    </div>
                    {/* Rate badge */}
                    <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded-xl text-sm sm:text-base font-black tabular-nums shadow-sm flex-shrink-0 ${
                      index === 0 ? 'bg-emerald-600 text-white shadow-emerald-600/20' : 
                      index === 1 ? 'bg-emerald-100/80 text-emerald-700 border border-emerald-200/50' : 
                      index === 2 ? 'bg-blue-50 text-blue-700 border border-blue-100/50' : 
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
                          <span className="font-bold text-slate-800 group-hover:text-blue-700 transition-colors flex items-center gap-1">
                            {banco.nombre}
                            <ExternalLink className="w-3 h-3 text-slate-400 opacity-0 -ml-1 group-hover:opacity-100 group-hover:ml-0 transition-[opacity,margin] duration-150 ease-out" />
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
                      <span className={`inline-flex items-center justify-center px-4 py-1.5 rounded-xl text-lg font-black tabular-nums shadow-sm ${
                        index === 0 ? 'bg-emerald-600 text-white shadow-emerald-600/20' : 
                        index === 1 ? 'bg-emerald-100/80 text-emerald-700 border border-emerald-200/50' : 
                        index === 2 ? 'bg-blue-50 text-blue-700 border border-blue-100/50' : 
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
                      isActive ? 'grid-rows-[1fr] opacity-100 pt-3 mt-3 border-t border-slate-200' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs bg-white/90 p-3.5 rounded-xl border border-slate-200 shadow-sm">
                        <div className="flex-1 space-y-1.5">
                          {banco.isBajoMonto && (
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 border border-blue-200/80 text-[11px] font-bold">
                              <span>🛡️</span>
                              <span>Cuenta de Bajo Monto (Tope 2026: $11.024.727 COP)</span>
                            </div>
                          )}
                          <p className="leading-relaxed font-normal text-slate-700">
                            {banco.descripcion || banco.nota}
                          </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 shrink-0 self-start sm:self-center">
                          {slugMap[banco.key] && (
                            <a
                              href={`/bancos/${slugMap[banco.key]}/`}
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1 font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200/80 px-3 py-1.5 rounded-lg transition-colors text-xs"
                            >
                              <span>Simulador {banco.nombre.split(' ')[0]}</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </a>
                          )}
                          {banco.url && (
                            <a
                              href={banco.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1 font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-2.5 py-1.5 rounded-lg transition-colors text-xs"
                            >
                              <span>Sitio oficial</span>
                              <ExternalLink className="w-3 h-3 text-slate-400" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
        
        <div className="bg-slate-50 px-3 sm:px-8 py-2.5 sm:py-4 text-[10px] sm:text-xs font-semibold text-slate-400 text-center border-t border-slate-100 uppercase tracking-wider sm:tracking-widest leading-relaxed">
          * Tasas referenciales 2026 sujetas a términos de cada banco.
        </div>
      </motion.div>
    </div>
    </MotionConfig>
  );
}
