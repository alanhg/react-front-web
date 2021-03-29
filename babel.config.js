module.exports = function(api) {
  api.cache(true);

  return {
    presets: [['@babel/preset-env', {
      'useBuiltIns': 'entry',
      'corejs':'2'
    }], '@babel/preset-react', '@babel/preset-typescript'],
    plugins: [
      ['@babel/plugin-proposal-decorators', { 'legacy': true }],
      ['@babel/plugin-proposal-class-properties', { 'loose': true }],
      '@babel/plugin-syntax-dynamic-import',
      '@babel/proposal-object-rest-spread',
      ['import', {
        'libraryName': 'antd'
      }]
    ]
  };
};
