const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const IgnoreAssetsWebpackPlugin = require('ignore-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  mode: 'development',
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin([
      {from: 'src/appsscript.json', to: '.'},
      {from: 'src/backend', to: '.'}
    ]),
    new HtmlWebpackPlugin({
      inlineSource: '.(js)$',
      template: 'src/frontend/index.html'
    }),
    new HtmlWebpackInlineSourcePlugin(),
    new IgnoreAssetsWebpackPlugin({ignore: 'index.js'}),
    new VueLoaderPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/]
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader']
      }
    ]
  },
  entry: {
    index: './src/frontend/index.ts'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  }
};
