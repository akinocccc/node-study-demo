/*
 * @Description: webpack配置文件
 * @Author: AS
 * @Date: 2021-02-03 19:21:12
 * @LastEditors: AS
 * @LastEditTime: 2021-02-04 12:06:03
 * @FilePath: \AdminLte\Frontend\webpack.config.js
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  //配置环境
  mode: 'development',

  devtool: 'source-map',

  //配置入口
  entry: {
      'js/app': './src/app.js'
  },

  //配置出口
  output: {
      path: path.join(__dirname, './dist'),
      filename: '[name].js'
  },

  module: {
    rules: [
      {
        test: /\.art$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'art-template-loader',
          options: {
            escape: false
          }
        }
      },
      {
        test: /\.css$/,
        loader: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
  },

  //配置插件
  plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, '/public/index.html'),
        filename: 'index.html',
        inject: true
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: './public/*.ico',
            to: path.join(__dirname, './dist/favicon.ico'),
          },
          {
            from: './public/libs',
            to: path.join(__dirname, './dist/libs'),
          }
        ]
      }),
      new CleanWebpackPlugin(),
  ],

  //配置server
  devServer: {
    contentBase: path.join(__dirname, './dist'),
    compress: true,
    port: 8081,
    //使用httpMiddelWare中间件，前端代理，解决跨域
    proxy: {
      "/api": {
        target: "http://localhost:3000"
      }
    }
  },

};