const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Добавляем поддержку расширений mjs и cjs для корректной работы lucide и других новых библиотек
config.resolver.sourceExts.push('mjs', 'cjs');

module.exports = config;