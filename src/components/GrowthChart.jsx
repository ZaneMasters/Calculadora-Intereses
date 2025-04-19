import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
  } from 'recharts';
  import { formatNumber } from '../utils/format';
  
  export default function GrowthChart({ data }) {
    if (!data || data.length === 0) return null;
  
    return (
      <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
        <h3 className="text-lg font-bold text-indigo-700 mb-4">Crecimiento del Capital</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid stroke="#e5e5e5" />
            <XAxis
              dataKey="mes"
              tick={{ fontSize: 12 }}
              interval={Math.floor(data.length / 12)} // ajusta ticks si hay muchos datos
            />
            <YAxis
              tickFormatter={(value) => `$${formatNumber(Math.round(value))}`}
              tick={{ fontSize: 12 }}
            />
            <Tooltip
              formatter={(value) => `$${formatNumber(Number(value.toFixed(2)))}`}
              labelFormatter={(label) => `Periodo: ${label}`}
            />
            <Line
              type="monotone"
              dataKey="valor"
              stroke="#6366f1"
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
  