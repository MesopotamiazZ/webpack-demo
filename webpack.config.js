const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const packagejson = require("./package.json");

module.exports = {
  // entry: './src/index.js',
  entry: { // 入口文件
    // app: './src/index.js',
    // print: './src/print.js'
    app: './src/index.js',
    vendor: Object.keys(packagejson.dependencies)//获取生产环境依赖的库
  },
  output: { // 出口文件
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  devServer: { // webpack-dev-server,自动更新+浏览器刷新
    contentBase: './dist',
    hot: true
  },
  module: { // 依赖的loader
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      // {
      //   test: /\.(scss|sass)$/,
      //   use: [
      //     // 'style-loader', // css格式化
      //     'css-loader',
      //     'sass-loader'
      //   ],
      // },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader' // 文件格式化
        ],
      }
    ]
  },
  plugins: [ // 加入的插件
    new CleanWebpackPlugin({ // 清空dist中没有使用的文件
      default: ['dist']
    }),
    new HtmlWebpackPlugin({ // 在dist生成index.html文件
      title: 'Output Management'
    }),
    // ----------这两行是启用模块热替换的插件---------
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    // ----------这两行是启用模块热替换的插件---------

    // ----------这个插件的作用是提取packagejson.dependencies离的公共模块(已经弃用)------------
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor',
    //   filename: '[name].js'
    // }),
  ],
  devtool: 'inline-source-map', // 开发工具,提示哪个JS文件报错
  optimization: { // ----------这个插件的作用是提取packagejson.dependencies离的公共模块------------
    //抽取公共的dm
    splitChunks: {
      cacheGroups: {
        commons: {
          name: "vendor",
          chunks: "initial",
          minChunks: 2
        }
      }
    }
  },
}