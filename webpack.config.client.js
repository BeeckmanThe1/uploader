const path = require('path');
const sharedConfig = require('./webpack.config');

const config = {
  ...sharedConfig,
  entry: './src/client/hydrate.tsx',
  output: {
    filename: 'hydrate.js',
    path: path.resolve(__dirname, 'dist-client')
  }
};

module.exports = config;