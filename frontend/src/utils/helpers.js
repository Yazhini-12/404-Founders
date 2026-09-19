export function truncateText(text, length = 100) {
  if (!text) return '';
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
}

export function filterBySearch(items, query, keys = []) {
  if (!query) return items;
  const q = query.toLowerCase();
  return items.filter(item => {
    return keys.some(key => {
      const val = item[key];
      if (Array.isArray(val)) {
        return val.some(v => String(v).toLowerCase().includes(q));
      }
      return String(val || '').toLowerCase().includes(q);
    });
  });
}
