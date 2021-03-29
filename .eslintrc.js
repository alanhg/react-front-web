module.exports = {
  root: true,
  extends: [
    '@stacker/react',
    'plugin:compat/recommended'
  ],
  plugins: ['es'],
  ignorePatterns: ['webpack/*.js'],
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    '@typescript-eslint/member-ordering': [
      'warn',
      {
        default: { 'memberTypes': 'never', 'order': 'as-written' }
      }],
    'no-implicit-coercion': ['error', {
      'boolean': true
    }],
    'one-var': ['error', 'never'],
    'no-unneeded-ternary': ['error'],
    'compat/compat': ['error'],
    'es/no-regexp-lookbehind-assertions': ['error'],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    'react/jsx-no-target-blank': ['error']
  }
};
