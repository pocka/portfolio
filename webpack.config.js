const path = require('path')

const { EnvironmentPlugin } = require('webpack')
const HtmlPlugin = require('html-webpack-plugin')
const StyleExtHtmlPlugin = require('style-ext-html-webpack-plugin')
const ScriptExtHtmlPlugin = require('script-ext-html-webpack-plugin')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const ImageminPlugin = require('imagemin-webpack-plugin').default

const ForkTsCheckerPlugin = require('fork-ts-checker-webpack-plugin')

const pkg = require('./package.json')

const paths = ['/', '/about/', '/skill/', '/works/', '/contact/']

module.exports = {
  entry: {
    index: './src/index.js',
    'common-components': './src/components/common.js',
    'async-op': './src/async-operations.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].[hash:8].js'
  },
  module: {
    rules: [
      {
        test: /\.(m?js|ts)$/,
        exclude: /\/node_modules\//,
        use: [
          {
            loader: 'babel-loader',
            options: pkg.babel
          },
          'uglify-template-string-loader'
        ]
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
      },
      {
        test: /\.png$/,
        loader: 'file-loader'
      },
      {
        test: /\.svg$/,
        use: [
          'raw-loader',
          {
            loader: 'svgo-loader',
            options: {
              plugins: [
                { cleanupAttrs: true },
                { inlineStyles: true },
                { removeXMLProcInst: true },
                { removeComments: true },
                { removeMetadata: true },
                { removeTitle: true },
                { removeDesc: true },
                { removeUselessDefs: true },
                { removeXMLNS: true },
                { removeEditorNSData: true },
                { removeEmptyAttrs: true },
                { removeEmptyContainers: true },
                { minifyStyles: true },
                { convertPathData: true },
                { convertTransform: true },
                { removeUnknownsAndDefaults: true },
                { cleanupIDs: true },
                { moveElemsAttrsToGroup: true },
                { collapseGroups: true },
                {
                  removeAttrs: {
                    attrs: ['data-.*', 'class']
                  }
                }
              ]
            }
          }
        ]
      }
    ]
  },
  devServer: {
    contentBase: './dist'
  },
  devtool: process.env.NODE_ENV === 'production' ? false : 'cheap-source-map',
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src')
    },
    extensions: ['.js', '.mjs', '.ts']
  },
  plugins: [
    new EnvironmentPlugin(['GOOGLE_ANALYTICS_TRACKING_ID']),
    new ImageminPlugin({
      optipng: {
        optimizationLevel: 5
      }
    }),
    new MiniCssExtractPlugin(),
    ...paths.map(
      p =>
        new HtmlPlugin({
          template:
            process.env.NODE_ENV === 'production'
              ? `!prerender-loader?${JSON.stringify({
                  string: true,
                  entry: './src/index.js',
                  documentUrl: 'http://localhost' + p
                })}!./src/index.html`
              : './src/index.html',
          filename: path.resolve(__dirname, `./dist${p}/index.html`),
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
      defer: /index\..*\.js/
    }),
    new ForkTsCheckerPlugin()
  ]
}
