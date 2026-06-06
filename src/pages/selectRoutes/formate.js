
const formatDisplayText = value =>
  String(value || '')
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

export const formatRouteName = value => {
  const routeName = formatDisplayText(value);
  if (!routeName) {
    return '';
  }
  return routeName.charAt(0).toUpperCase() + routeName.slice(1);
};