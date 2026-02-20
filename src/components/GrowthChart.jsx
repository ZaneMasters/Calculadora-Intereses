import {
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import { formatNumber } from '../utils/format';

export default function GrowthChart({ data }) {
  if (!data || data.length === 0) return null;

  // Si hay muchos datos (ej. más de 60 puntos, típico de diario), usamos AreaChart
  // O si detectamos que la etiqueta empieza por "Día"
  const isDaily = data.length > 60 || (data[0] && data[0].mes && data[0].mes.startsWith('Día'));

  const ChartComponent = isDaily ? AreaChart : BarChart;

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-8 mt-8 border border-slate-200">
      <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        <span>📊</span> Proyección de Crecimiento
      </h3>
      
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ChartComponent data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            {isDaily && (
                <defs>
                  <linearGradient id="colorValor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
            )}
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis
              dataKey="mes"
              tick={{ fontSize: 12, fill: '#64748b' }}
              tickLine={false}
              axisLine={false}
              interval="preserveStartEnd"
              minTickGap={30}
            />
            <YAxis
              tickFormatter={(value) => `$${formatNumber(Math.round(value/1000))}k`}
              tick={{ fontSize: 12, fill: '#64748b' }}
              tickLine={false}
              axisLine={false}
              width={60}
            />
            <Tooltip
              cursor={{ fill: '#f1f5f9' }}
              contentStyle={{ 
                backgroundColor: '#fff', 
                borderRadius: '8px', 
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                border: '1px solid #e2e8f0'
              }}
              formatter={(value) => [`$${formatNumber(Number(value.toFixed(2)))}`, 'Capital Total']}
              labelFormatter={(label) => `${label}`}
            />
            {isDaily ? (
                <Area
                  type="monotone"
                  dataKey="valor"
                  stroke="#6366f1"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorValor)"
                  activeDot={{ r: 4, strokeWidth: 0, fill: '#4f46e5' }}
                />
            ) : (
                <Bar
                  dataKey="valor"
                  fill="#6366f1"
                  radius={[4, 4, 0, 0]}
                  barSize={Math.max(20, 800 / data.length)} 
                />
            )}
          </ChartComponent>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
  