// Утилиты для работы с датами

/**
 * Форматирование даты в русский формат
 * @param {string|Date} date - Дата
 * @returns {string} - Отформатированная дата
 */
export const formatDate = (date) => {
  const d = new Date(date);
  return d.toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Форматирование краткой даты
 * @param {string|Date} date - Дата
 * @returns {string} - Краткая дата
 */
export const formatShortDate = (date) => {
  const d = new Date(date);
  return d.toLocaleDateString('ru-RU');
};

/**
 * Проверка, является ли тур ближайшим (в течение 60 дней)
 * @param {string} tourDate - Дата начала тура
 * @returns {boolean}
 */
export const isUpcoming = (tourDate) => {
  const now = new Date();
  const tour = new Date(tourDate);
  const diffTime = tour - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 && diffDays <= 60;
};

/**
 * Получить количество дней до тура
 * @param {string} tourDate - Дата начала тура
 * @returns {number}
 */
export const daysUntilTour = (tourDate) => {
  const now = new Date();
  const tour = new Date(tourDate);
  const diffTime = tour - now;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

/**
 * Добавить месяцы к дате
 * @param {Date} date - Исходная дата
 * @param {number} months - Количество месяцев
 * @returns {Date}
 */
export const addMonths = (date, months) => {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
};

/**
 * Проверка, нужно ли автопополнение кошелька
 * @param {string} nextTopUpDate - Дата следующего пополнения
 * @returns {boolean}
 */
export const shouldAutoTopUp = (nextTopUpDate) => {
  const now = new Date();
  const next = new Date(nextTopUpDate);
  return now >= next;
};