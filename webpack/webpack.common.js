const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');

// https://stackoverflow.com/questions/64557638/how-to-polyfill-node-core-modules-in-webpack-5
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.js',
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, '../', 'dist'),
    clean: true,
    globalObject: 'this',
    library: {
      name: 'index',
      type: 'umd',
    },
  },
  externals: ['child_process'],
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [new ESLintPlugin(), new NodePolyfillPlugin()],
  resolve: {
    extensions: ['.js'],
    fallback: {
      fs: false,
      tls: false,
      net: false,
      child_process: false,
      stream: require.resolve('readable-stream'),
    },
  },
};
