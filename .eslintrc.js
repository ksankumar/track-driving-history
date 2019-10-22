module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  'globals': {
    'is_defined': true,
    'is_undefined': true
  },
  rules: {
    'no-tabs': 0,
    'indent': 'off',
    'no-useless-escape': 'error',
    'no-extend-native': [2, { 'exceptions': ['Array', 'Object', 'String'] }],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
