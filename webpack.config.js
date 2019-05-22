const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  // entry: './src/index.js',
  entry: { // 入口文件
    app: './src/index.js',
    print: './src/print.js'
  },
  output: { // 出口文件
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: { // webpack-dev-server,自动更新+浏览器刷新
    contentBase: './dist'
  },
  module: { // 依赖的loader
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader', // css格式化
          'css-loader'
        ],
      },
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
  ],
  devtool: 'inline-source-map' // 开发工具,提示哪个JS文件报错
}