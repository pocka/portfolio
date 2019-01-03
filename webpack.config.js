const path = require('path')

const HtmlPlugin = require('html-webpack-plugin')
const StyleExtHtmlPlugin = require('style-ext-html-webpack-plugin')
const ScriptExtHtmlPlugin = require('script-ext-html-webpack-plugin')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const pkg = require('./package.json')

const paths = ['/', '/foo']

module.exports = {
  entry: {
    index: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        include: [
          path.resolve(__dirname, './src'),
          /\/node_modules\/(@polymer|lit-html)\//
        ],
        use: {
          loader: 'babel-loader',
          options: pkg.babel
        }
      },
      {
        test: /\.scss$/,
        use: [
          'raw-loader',
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: { implementation: require('sass') }
          }
        ]
      },
      {
        test: /index.scss$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          'css-loader',
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: { implementation: require('sass') }
          }
        ]
      }
    ]
  },
  devServer: {
    contentBase: './dist'
  },
  plugins: [
    new MiniCssExtractPlugin(),
    ...paths.map(
      p =>
        new HtmlPlugin({
          template:
            process.env.NODE_ENV === 'production'
              ? `!prerender-loader?${JSON.stringify({
                  string: true,
                  documentUrl: 'http://localhost' + p
                })}!./src/index.html`
              : './src/index.html',
          filename: path.resolve(__dirname, `./dist${p}/index.html`),
          hash: true,
          minify: {
            collapseWhitespace: true,
            removeComments: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            useShortDoctype: true
          },
          inject: 'head'
        })
    ),
    new StyleExtHtmlPlugin(),
    new ScriptExtHtmlPlugin({
      defaultAttribute: 'async',
      defer: 'index.js'
    })
  ]
}
