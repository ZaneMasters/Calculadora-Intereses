import { motion } from 'framer-motion';
import { TrendingUp, Info, ExternalLink, CalendarDays } from 'lucide-react';
import bancosData from "../utils/bankOptions.json";
import { BankLogos } from './BankLogos';

export default function BankComparison() {
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
      transition: { staggerChildren: 0.055, delayChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 380, damping: 32, mass: 0.8 }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2 }}
      className="mt-12 bg-white/90 backdrop-blur-md shadow-[0_20px_50px_rgb(0,0,0,0.05)] rounded-3xl overflow-hidden border border-white/50"
    >
      <div className="bg-gradient-to-r from-slate-50 to-white px-4 sm:px-8 py-4 sm:py-6 border-b border-slate-100 flex items-center gap-3">
        <div className="bg-indigo-100 p-2 rounded-xl">
          <TrendingUp className="w-5 h-5 text-indigo-600" />
        </div>
        <h2 className="text-lg sm:text-2xl font-extrabold text-slate-800 tracking-tight">
          Comparativa de Tasas <span className="text-slate-400 font-medium text-base sm:text-lg ml-1">(E.A.)</span>
        </h2>
      </div>
      
      <div className="p-4 sm:p-6">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-4 sm:gap-3"
        >
          {/* Header (Desktop Only) */}
          <div className="hidden sm:grid grid-cols-12 gap-4 px-6 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
            <div className="col-span-5">Entidad Financiera</div>
            <div className="col-span-4 text-center">Rendimiento (E.A.)</div>
            <div className="col-span-3 text-right">Frecuencia</div>
          </div>

          {/* Rows */}
          {bancos.map((banco, index) => (
            <motion.div 
              key={banco.key} 
              variants={itemVariants}
              whileHover={{ scale: 1.012, transition: { type: 'spring', stiffness: 500, damping: 30 } }}
              style={{ willChange: 'transform' }}
              className={`group sm:grid sm:grid-cols-12 sm:gap-4 px-3 py-3 sm:px-6 sm:py-5 rounded-2xl border transition-colors ${
                index === 0 
                  ? 'bg-gradient-to-r from-emerald-50 to-white border-emerald-200 shadow-sm shadow-emerald-500/5 hover:border-emerald-300' 
                  : index < 3 
                    ? 'bg-gradient-to-r from-indigo-50/50 to-white border-indigo-100/50 hover:bg-indigo-50 hover:border-indigo-200' 
                    : 'bg-white border-slate-100 hover:border-slate-300 hover:bg-slate-50/50'
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
                    {banco.url ? (
                      <a href={banco.url} target="_blank" rel="noopener noreferrer" className="font-bold text-slate-800 text-sm leading-tight truncate">
                        {banco.nombre}
                      </a>
                    ) : (
                      <span className="font-bold text-slate-800 text-sm leading-tight truncate">{banco.nombre}</span>
                    )}
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
              <div className="hidden sm:flex col-span-5 items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl flex-shrink-0 bg-white shadow-sm border border-slate-100 group-hover:shadow-md overflow-hidden">
                  {getBankLogo(banco.key, banco.nombre)}
                </div>
                <div className="flex flex-col items-start gap-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {banco.url ? (
                      <a href={banco.url} target="_blank" rel="noopener noreferrer" className="font-bold text-slate-800 hover:text-indigo-600 transition-colors flex items-center gap-1">
                        {banco.nombre}
                        <ExternalLink className="w-3 h-3 text-slate-400 opacity-0 -ml-1 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                      </a>
                    ) : (
                      <span className="font-bold text-slate-800">{banco.nombre}</span>
                    )}
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

              <div className="hidden sm:flex col-span-4 items-center justify-center">
                <span className={`inline-flex items-center justify-center px-4 py-1.5 rounded-xl text-lg font-black shadow-sm ${
                  index === 0 ? 'bg-emerald-500 text-white shadow-emerald-500/20' : 
                  index === 1 ? 'bg-emerald-100/80 text-emerald-700 border border-emerald-200/50' : 
                  index === 2 ? 'bg-indigo-50 text-indigo-700 border border-indigo-100/50' : 
                  'bg-slate-100 text-slate-700'
                }`}>
                  {(banco.tasaEA * 100).toFixed(2)}%
                </span>
              </div>

              <div className="hidden sm:flex col-span-3 items-center justify-end gap-1.5 text-slate-500 text-sm font-medium capitalize">
                <CalendarDays className="w-4 h-4 text-slate-400" />
                {banco.capitalizacion}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      <div className="bg-slate-50 px-8 py-4 text-xs font-semibold text-slate-400 text-center border-t border-slate-100 uppercase tracking-widest">
        * Tasas referenciales sujetas a términos y condiciones de cada entidad.
      </div>
    </motion.div>
  );
}
