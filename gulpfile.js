const { renderToStream } = require('@popeindustries/lit-html-server')
const gulp = require('gulp')
const connect = require('gulp-connect')
const posthtml = require('gulp-posthtml')
const buffer = require('vinyl-buffer')
const source = require('vinyl-source-stream')

async function html() {
  const builder = './src/index.html'
  delete require.cache[require.resolve(builder)]
  const IndexHtml = require(builder)

  return renderToStream(await IndexHtml())
    .pipe(source('index.html'))
    .pipe(buffer())
    .pipe(posthtml())
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload())
}

exports.html = html

async function favicon() {
  return gulp
    .src('src/favicon.png')
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload())
}

exports.favicon = favicon

async function devServer() {
  return connect.server({
    root: 'dist',
    livereload: true,
    port: process.env.npm_package_config_devServer_port,
    host: process.env.npm_package_config_devServer_host
  })
}

exports.devServer = devServer

async function watch() {
  gulp.watch('src/**/*.{md,css,js}', { ignoreInitial: false }, html)
  gulp.watch('src/favicon.png', { ignoreInitial: false }, favicon)
}

exports.watch = watch

/**
 * Start a watch task and Run a dev server.
 */
exports.dev = gulp.parallel(watch, devServer)

/**
 * Build static files.
 */
exports.build = gulp.parallel(html, favicon)

exports.default = exports.dev
