const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
module.exports = (env, argv) => {
  const devMode = argv.mode !== 'production'
  return {
    entry: [
      "@babel/polyfill",
      path.join(__dirname, './src/main.js')
    ],
    module: {
      rules: [
        {
          test: /\.html$/,
          use: [{
              loader: "html-loader",
              options: {
                  minimize: true
              }
          }]
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {}
        },
        // {
        //   test: /\.css$/,
        //   use: [
        //     devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
        //     'css-loader',
        //     'postcss-loader'
        //   ] 
        // },
        // 解析vue
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
              loaders: {}
          }
        },
        // 处理scss
        {
          test: /\.(scss|css)$/,
          use: [
              devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
              'css-loader',
              'postcss-loader',
              'sass-loader',
          ]
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: {}
            }
          ]
        }
      ],
    },
    resolve: {
      alias: {
          'vue$': 'vue/dist/vue.esm.js'
      }
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: "./public/index.html",
        filename: "./index.html"
      }),
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css"
      }),
      new CleanWebpackPlugin(),
      new VueLoaderPlugin()
    ]
  }
}