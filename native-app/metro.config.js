const { getDefaultConfig } = require('@expo/metro-config');

const config = getDefaultConfig(__dirname);

// garantir que Metro resolva .cjs, .ts e .tsx e mantenha as configurações padrão
config.resolver.sourceExts = [...(config.resolver.sourceExts || []), 'cjs', 'ts', 'tsx'];

module.exports = config;