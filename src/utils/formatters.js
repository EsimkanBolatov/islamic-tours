// Утилиты для форматирования данных

/**
 * Форматирование цены с разделителями тысяч
 * @param {number} price - Цена
 * @returns {string} - Отформатированная цена
 */
export const formatPrice = (price) => {
  return price.toLocaleString('ru-RU');
};

/**
 * Форматирование краткой цены (в тысячах)
 * @param {number} price - Цена
 * @returns {string} - Краткая цена с 'k'
 */
export const formatShortPrice = (price) => {
  return `${(price / 1000).toFixed(0)}k`;
};

/**
 * Форматирование длительности тура
 * @param {number} days - Количество дней
 * @returns {string} - Строка с правильным склонением
 */
export const formatDuration = (days) => {
  const lastDigit = days % 10;
  const lastTwoDigits = days % 100;
  
  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return `${days} дней`;
  }
  
  if (lastDigit === 1) {
    return `${days} день`;
  }
  
  if (lastDigit >= 2 && lastDigit <= 4) {
    return `${days} дня`;
  }
  
  return `${days} дней`;
};

/**
 * Получить название типа тура на русском
 * @param {string} type - Тип тура
 * @returns {string}
 */
export const getTourTypeName = (type) => {
  const types = {
    umrah: 'Умра',
    hajj: 'Хадж',
    ziyarat: 'Зиярат',
    cultural: 'Культурный'
  };
  return types[type] || type;
};