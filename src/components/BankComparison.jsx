import bancosData from "../utils/bankOptions.json";

export default function BankComparison() {
  const bancos = Object.values(bancosData).sort((a, b) => b.tasaEA - a.tasaEA); // Ordenar por mayor tasa

  return (
    <div className="mt-8 bg-white shadow-lg rounded-2xl overflow-hidden border border-slate-200">
      <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <span>📊</span> Comparativa de Tasas (E.A.)
        </h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-600 text-sm uppercase tracking-wider">
              <th className="px-6 py-3 font-semibold">Banco</th>
              <th className="px-6 py-3 font-semibold text-right">Tasa Anual</th>
              <th className="px-6 py-3 font-semibold hidden sm:table-cell">Capitalización</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {bancos.map((banco, index) => (
              <tr 
                key={banco.nombre} 
                className={`hover:bg-indigo-50/50 transition-colors ${index < 3 ? 'bg-indigo-50/10' : ''}`}
              >
                <td className="px-6 py-4 font-medium text-slate-900 flex items-center gap-3 relative group">
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${index < 3 ? 'bg-indigo-500' : 'bg-slate-300'}`}></div>
                  
                  <div className="flex flex-wrap items-center gap-2 w-full">
                    {banco.url ? (
                      <a href={banco.url} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 hover:underline transition-colors line-clamp-1">
                        {banco.nombre}
                      </a>
                    ) : (
                      <span className="line-clamp-1">{banco.nombre}</span>
                    )}
                    
                    {banco.isBajoMonto && (
                      <span className="inline-flex items-center justify-center rounded-md bg-blue-50 px-2 py-0.5 text-[10px] leading-tight font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 cursor-default transition-colors hover:bg-blue-100 whitespace-nowrap">
                        Bajo Monto
                      </span>
                    )}

                    {banco.nota && (
                      <div className="relative group cursor-help">
                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-slate-400 hover:text-indigo-500 transition-colors">
                           <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                         </svg>
                         <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-48 p-2 bg-slate-800 text-white text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 text-center z-50">
                           {banco.nota}
                           <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800"></div>
                         </div>
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className={`inline-block px-2 py-1 rounded text-xs font-bold ${
                    index === 0 ? 'bg-emerald-100 text-emerald-700' : 
                    index === 1 ? 'bg-emerald-50 text-emerald-600' : 'text-slate-600'
                  }`}>
                    {(banco.tasaEA * 100).toFixed(2)}%
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-500 text-sm capitalize hidden sm:table-cell">
                  {banco.capitalizacion}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-slate-50 px-6 py-3 text-xs text-slate-400 text-center border-t border-slate-200">
        * Tasas referenciales sujetas a términos y condiciones de cada entidad.
      </div>
    </div>
  );
}
