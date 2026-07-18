'use client';

import { useState } from 'react';
import { ChevronDown, LayoutDashboard, Settings, LogOut } from 'lucide-react';
import Link from 'next/link';

const menuItems = [
  {
    group: 'Menu Utama',
    items: [
      { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
    ],
  },
  {
    group: 'Master Data',
    items: [
      { icon: Settings, label: 'Unit Kerja', href: '/master/unit-kerja' },
      { icon: Settings, label: 'Pegawai', href: '/master/pegawai' },
      { icon: Settings, label: 'Tahun', href: '/master/tahun' },
    ],
  },
  {
    group: 'Modul Aplikasi',
    items: [
      { icon: Settings, label: 'RENSTRA', href: '/renstra' },
      { icon: Settings, label: 'SAKIP', href: '/sakip' },
      { icon: Settings, label: 'IKU', href: '/iku' },
      { icon: Settings, label: 'SPIP', href: '/spip' },
      { icon: Settings, label: 'Zona Integritas', href: '/zona-integritas' },
      { icon: Settings, label: 'RB', href: '/rb' },
      { icon: Settings, label: 'PK', href: '/pk' },
      { icon: Settings, label: 'LKjIP', href: '/lkjip' },
    ],
  },
  {
    group: 'Manajemen',
    items: [
      { icon: Settings, label: 'Dokumen', href: '/dokumen' },
      { icon: Settings, label: 'Monitoring', href: '/monitoring' },
      { icon: Settings, label: 'Laporan', href: '/laporan' },
      { icon: Settings, label: 'Admin', href: '/admin' },
    ],
  },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    'Menu Utama': true,
    'Master Data': false,
    'Modul Aplikasi': false,
    'Manajemen': false,
  });

  const toggleGroup = (group: string) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [group]: !prev[group],
    }));
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-700 overflow-y-auto transform transition-transform lg:translate-x-0 z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 space-y-8">
          {menuItems.map((group) => (
            <div key={group.group}>
              <button
                onClick={() => toggleGroup(group.group)}
                className="flex items-center justify-between w-full text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-3 hover:text-gray-900 dark:hover:text-gray-300"
              >
                {group.group}
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    expandedGroups[group.group] ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {expandedGroups[group.group] && (
                <nav className="space-y-2">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-white transition"
                      >
                        <Icon className="w-4 h-4 flex-shrink-0" />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </nav>
              )}
            </div>
          ))}
        </div>
      </aside>
    </>
  );
}
