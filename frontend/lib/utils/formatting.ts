/**
 * Format number to Indonesian locale
 */
export const formatNumber = (value: number | undefined, decimals = 0): string => {
  if (value === undefined || value === null) return '-';
  return new Intl.NumberFormat('id-ID', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
};

/**
 * Format currency to Indonesian Rupiah
 */
export const formatCurrency = (value: number | undefined): string => {
  if (value === undefined || value === null) return '-';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(value);
};

/**
 * Format percentage
 */
export const formatPercentage = (value: number | undefined, decimals = 1): string => {
  if (value === undefined || value === null) return '-';
  return `${formatNumber(value, decimals)}%`;
};

/**
 * Format date to Indonesian locale
 */
export const formatDate = (date: string | Date | undefined): string => {
  if (!date) return '-';
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(dateObj);
};

/**
 * Format datetime
 */
export const formatDateTime = (date: string | Date | undefined): string => {
  if (!date) return '-';
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(dateObj);
};

/**
 * Format time
 */
export const formatTime = (date: string | Date | undefined): string => {
  if (!date) return '-';
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(dateObj);
};

/**
 * Get status badge color
 */
export const getStatusColor = (status: string): string => {
  const statusMap: Record<string, string> = {
    draft: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
    submitted: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    verified: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    approved: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    rejected: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    on_track: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    at_risk: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    off_track: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  };
  return statusMap[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
};

/**
 * Get status label in Indonesian
 */
export const getStatusLabel = (status: string): string => {
  const statusMap: Record<string, string> = {
    draft: 'Draft',
    submitted: 'Diajukan',
    verified: 'Diverifikasi',
    approved: 'Disetujui',
    rejected: 'Ditolak',
    on_track: 'Sesuai Target',
    at_risk: 'Berisiko',
    off_track: 'Tidak Sesuai Target',
    in_progress: 'Dalam Proses',
    completed: 'Selesai',
  };
  return statusMap[status] || status;
};
