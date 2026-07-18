'use client';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { MetricCard } from '@/components/dashboard/MetricCard';
import {
  LineChartComponent,
  BarChartComponent,
  PieChartComponent,
  RadarChartComponent,
  AreaChartComponent,
} from '@/components/charts/ChartComponents';
import { ProgressCircle } from '@/components/charts/ProgressCircle';
import { TrafficLight } from '@/components/charts/TrafficLight';
import {
  TrendingUp,
  Users,
  FileText,
  CheckCircle,
  Shield,
  Zap,
} from 'lucide-react';
import { Card } from '@/components/ui/card';

// Mock Data
const trendData = [
  { name: 'Jan', value: 65 },
  { name: 'Feb', value: 72 },
  { name: 'Mar', value: 78 },
  { name: 'Apr', value: 75 },
  { name: 'May', value: 82 },
  { name: 'Jun', value: 88 },
];

const capaianData = [
  { name: 'Target', value: 100 },
  { name: 'Realisasi', value: 85 },
];

const dokumenData = [
  { name: 'Lengkap', value: 65 },
  { name: 'Tidak Lengkap', value: 35 },
];

const maturityData = [
  { name: 'Governance', value: 3.5 },
  { name: 'Risk Management', value: 3.2 },
  { name: 'Human Resources', value: 3.8 },
  { name: 'Financial Management', value: 3.1 },
  { name: 'Information Systems', value: 2.9 },
];

const kinerjaTahunanData = [
  { name: '2020', value: 70 },
  { name: '2021', value: 75 },
  { name: '2022', value: 80 },
  { name: '2023', value: 85 },
  { name: '2024', value: 88 },
];

export default function DashboardPage() {
  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-poppins font-bold text-gray-900 dark:text-white mb-2">
          Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Selamat datang di e-Kinerja Terpadu
        </p>
      </div>

      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-slide-in">
        <MetricCard
          title="Nilai SAKIP"
          value="88%"
          icon={<CheckCircle className="w-6 h-6" />}
          trend={12}
          color="emerald"
        />
        <MetricCard
          title="Nilai ZI"
          value="82%"
          icon={<Shield className="w-6 h-6" />}
          trend={8}
          color="cyan"
        />
        <MetricCard
          title="Maturity Rating"
          value="3.5/5"
          icon={<TrendingUp className="w-6 h-6" />}
          trend={5}
          color="primary"
        />
        <MetricCard
          title="Total User"
          value="245"
          icon={<Users className="w-6 h-6" />}
          trend={3}
          color="orange"
        />
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <Card className="p-4">
          <p className="text-xs text-gray-600 dark:text-gray-400 uppercase font-semibold mb-2">
            Nilai IKU
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">85%</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-gray-600 dark:text-gray-400 uppercase font-semibold mb-2">
            Nilai RB
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">78%</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-gray-600 dark:text-gray-400 uppercase font-semibold mb-2">
            Dokumen Lengkap
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">92%</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-gray-600 dark:text-gray-400 uppercase font-semibold mb-2">
            Unit Kerja
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">12</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-gray-600 dark:text-gray-400 uppercase font-semibold mb-2">
            Progress Pengisian
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">87%</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-gray-600 dark:text-gray-400 uppercase font-semibold mb-2">
            Total Pegawai
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">156</p>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <LineChartComponent data={trendData} title="Trend Nilai SAKIP" />
        <BarChartComponent data={capaianData} title="Capaian IKU" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-1">
          <Card className="p-6 h-full flex flex-col items-center justify-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Status Dokumen</h3>
            <PieChartComponent data={dokumenData} />
          </Card>
        </div>
        <div className="lg:col-span-1">
          <Card className="p-6 h-full">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Maturity Rating SPIP</h3>
            <RadarChartComponent data={maturityData} />
          </Card>
        </div>
        <div className="lg:col-span-1">
          <Card className="p-6 h-full flex flex-col items-center justify-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Progress Pengisian</h3>
            <ProgressCircle percentage={87} />
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <AreaChartComponent data={kinerjaTahunanData} title="Kinerja Tahunan" />
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Status Overview</h3>
          <div className="space-y-3">
            <TrafficLight status="green" label="Unit Kerja: Sesuai Target" />
            <TrafficLight status="yellow" label="Dokumen: Masih Ada Kekurangan" />
            <TrafficLight status="red" label="Beberapa IKU: Belum Tercapai" />
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
