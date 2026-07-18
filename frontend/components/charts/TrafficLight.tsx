'use client';

import { Card } from '@/components/ui/card';

interface TrafficLightProps {
  status: 'green' | 'yellow' | 'red';
  label?: string;
}

const statusConfig = {
  green: {
    bg: 'bg-emerald-100 dark:bg-emerald-900/30',
    dot: 'bg-emerald-500',
    text: 'text-emerald-700 dark:text-emerald-300',
    label: 'Sesuai Target',
  },
  yellow: {
    bg: 'bg-yellow-100 dark:bg-yellow-900/30',
    dot: 'bg-yellow-500',
    text: 'text-yellow-700 dark:text-yellow-300',
    label: 'Berisiko',
  },
  red: {
    bg: 'bg-red-100 dark:bg-red-900/30',
    dot: 'bg-red-500',
    text: 'text-red-700 dark:text-red-300',
    label: 'Tidak Sesuai Target',
  },
};

export function TrafficLight({ status, label }: TrafficLightProps) {
  const config = statusConfig[status];
  return (
    <Card className={`p-4 ${config.bg}`}>
      <div className="flex items-center gap-3">
        <div className={`w-4 h-4 rounded-full ${config.dot} animate-pulse`}></div>
        <span className={`font-medium ${config.text}`}>
          {label || config.label}
        </span>
      </div>
    </Card>
  );
}
