'use client';

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  AreaChart,
  Area,
} from 'recharts';

const COLORS = {
  primary: '#1E3A8A',
  emerald: '#10B981',
  cyan: '#06B6D4',
  orange: '#F97316',
  red: '#EF4444',
};

interface ChartProps {
  data: any[];
  title?: string;
}

export function LineChartComponent({ data, title }: ChartProps) {
  return (
    <div className="w-full h-80 bg-white dark:bg-slate-900 rounded-lg p-6 shadow-soft">
      {title && <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">{title}</h3>}
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis stroke="#6B7280" />
          <YAxis stroke="#6B7280" />
          <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px' }} />
          <Legend />
          <Line
            type="monotone"
            dataKey="value"
            stroke={COLORS.primary}
            strokeWidth={2}
            dot={{ fill: COLORS.primary, r: 5 }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function BarChartComponent({ data, title }: ChartProps) {
  return (
    <div className="w-full h-80 bg-white dark:bg-slate-900 rounded-lg p-6 shadow-soft">
      {title && <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">{title}</h3>}
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis stroke="#6B7280" />
          <YAxis stroke="#6B7280" />
          <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px' }} />
          <Legend />
          <Bar dataKey="value" fill={COLORS.emerald} radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function PieChartComponent({ data, title }: ChartProps) {
  return (
    <div className="w-full h-80 bg-white dark:bg-slate-900 rounded-lg p-6 shadow-soft">
      {title && <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">{title}</h3>}
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={Object.values(COLORS)[index % Object.keys(COLORS).length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export function RadarChartComponent({ data, title }: ChartProps) {
  return (
    <div className="w-full h-80 bg-white dark:bg-slate-900 rounded-lg p-6 shadow-soft">
      {title && <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">{title}</h3>}
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data}>
          <PolarGrid stroke="#E5E7EB" />
          <PolarAngleAxis dataKey="name" stroke="#6B7280" />
          <PolarRadiusAxis stroke="#6B7280" />
          <Radar name="Level" dataKey="value" stroke={COLORS.primary} fill={COLORS.primary} fillOpacity={0.6} />
          <Tooltip />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function AreaChartComponent({ data, title }: ChartProps) {
  return (
    <div className="w-full h-80 bg-white dark:bg-slate-900 rounded-lg p-6 shadow-soft">
      {title && <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">{title}</h3>}
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={COLORS.cyan} stopOpacity={0.8} />
              <stop offset="95%" stopColor={COLORS.cyan} stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis stroke="#6B7280" />
          <YAxis stroke="#6B7280" />
          <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px' }} />
          <Area type="monotone" dataKey="value" stroke={COLORS.cyan} fillOpacity={1} fill="url(#colorValue)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
