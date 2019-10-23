const {resolve} = require('path');

module.exports = {
  entry: './src/js/index.js',
  output: {
    path: resolve(__dirname, 'dist'),
    filename: './[name].js',
  },
  mode: 'production',
};