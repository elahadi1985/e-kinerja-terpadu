'use client';

import ProtectedLayout from '@/app/(app)/layout';

export default function DashboardPage() {
  return (
    <ProtectedLayout>
      <div className="p-8">
        <h1 className="text-4xl font-bold">Dashboard</h1>
        <p>Selamat datang di e-Kinerja Terpadu</p>
      </div>
    </ProtectedLayout>
  );
}
