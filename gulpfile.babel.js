import gulp from 'gulp'
import named from 'vinyl-named'
import rename from 'gulp-rename'
import pkg from './package.json'
import sass from 'gulp-sass'
import uglify from 'gulp-uglify'
import webpackStream from 'webpack-stream'
import htmlmin from 'gulp-htmlmin'
import nunjucksRender from 'gulp-nunjucks-render'
import data from './data'

gulp.task('build:js', () => gulp.src('./static/js/**/*.page.js')
  .pipe(named())
  .pipe(webpackStream({
    output: {
      filename: '[name]'
    },
    module: {
      loaders: [{
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }]
    }
  }))
  .pipe(uglify())
  .pipe(rename({
    extname: '.min.js'
  }))
  .pipe(gulp.dest('./dist/static/js'))
)

gulp.task('build:css', () => gulp.src('./static/scss/**/*.scss')
  .pipe(sass({
    outputStyle: 'compressed'
  }).on('error', sass.logError))
  .pipe(rename({
    extname: '.min.css'
  }))
  .pipe(gulp.dest('./dist/static/css'))
)

gulp.task('build:html', () => gulp.src(['./index.html', './**/*.page.html'])
  .pipe(nunjucksRender({
    path: pkg.template.cwd,
    data: {
      static: pkg.template.static,
      version: pkg.version,
      page: data
    }
  }))
  .pipe(htmlmin({
    minifyJS: true,
    minifyCSS: true,
    collapseWhitespace: true
  }))
  .pipe(rename(path => {
    path.basename = path.basename.replace('.page', '')
    path.extname = '.html'
  }))
  .pipe(gulp.dest('./dist'))
)

gulp.task('default', ['build:js', 'build:css', 'build:html'], () => {
  gulp.src('./favicon.png').pipe(gulp.dest('./dist'))
  gulp.src('./static/images/**').pipe(gulp.dest('./dist/static/images'))
})
