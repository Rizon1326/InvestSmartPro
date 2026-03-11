export function formatBDT(amount) {
  const num = Number(amount);
  if (isNaN(num)) return '৳0';
  return '৳' + num.toLocaleString('en-BD', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

export function formatNumber(num) {
  return Number(num).toLocaleString('en-BD');
}

export function formatDate(dateStr) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatDateTime(dateStr) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function truncate(str, len = 100) {
  if (!str) return '';
  return str.length > len ? str.slice(0, len) + '...' : str;
}

export const CATEGORY_ICONS = {
  store: '🏪',
  restaurant: '🍽️',
  computer: '💻',
  leaf: '🌿',
  briefcase: '💼',
  factory: '🏭',
  school: '🎓',
  medical: '🏥',
  shirt: '👕',
  cart: '🛒',
};

export function getCategoryIcon(iconName) {
  return CATEGORY_ICONS[iconName] || '📦';
}
