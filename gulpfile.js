// general
var gulp = require('gulp');
var gutil = require('gulp-util');
var notify = require('gulp-notify');

// scripts
var watchify = require('watchify');
var browserify = require('browserify');
var to5ify = require("6to5ify");
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

function scripts (watch) {
  var bundler = browserify('./app/src/scripts/main.js', watchify.args);
  bundler.transform(to5ify);
  bundler.transform('browserify-shim');

  if (watch || true) {
    bundler = watchify(bundler);
    bundler.on('update', bundle);
  }

  function bundle () {
    return bundler.bundle()
      .on('error', function (error) {
        gutil.log('Browserify error', error);
        gutil.beep();
        notify({ title: 'Scripts', message: 'Error', sound: 'Basso' });
        this.end();
      })
      .pipe(source('main.js'))
      .pipe(buffer())
      .pipe(gutil.env.prod ? uglify() : gutil.noop())
      .pipe(gutil.env.prod ? gutil.noop() : sourcemaps.init({ loadMaps: true }))
      .pipe(gutil.env.prod ? gutil.noop() : sourcemaps.write('./'))
      .pipe(gulp.dest('./app/dist/js'))
      .pipe(notify({ title: 'Scripts', message: 'Success', sound: 'Morse' }));
  }

  return bundle();
};

// vendor
var fs = require('fs');
var concat = require('gulp-concat');

function vendor () {
  var paths = [];

  var pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));

  for (var name in pkg.browser || {}) {
    if (pkg.browser.hasOwnProperty(name)) {
      paths.push(pkg.browser[name]);
    }
  }

  return gulp.src(paths)
    .pipe(concat('vendor.js'))
    .pipe(gutil.env.prod ? uglify() : gutil.noop())
    .pipe(gulp.dest('./app/dist/js'))
    .pipe(notify({ title: 'Vendor', message: 'Success', sound: 'Morse' }));
}

// styles
var less = require('gulp-less');
var cssminify = require('gulp-minify-css');
var rename = require('gulp-rename');

function styles (watch) {
  function process () {
    return gulp.src('./app/src/styles/main.less')
      .pipe(less().on('error', function (error) {
        gutil.log('Less error', error);
        gutil.beep();
        notify({ title: 'Styles', message: 'Error', sound: 'Basso' });
        this.end();
      }))
      .pipe(rename('main.css'))
      .pipe(gutil.env.prod ? cssminify() : gutil.noop())
      .pipe(gulp.dest('./app/dist/css'))
      .pipe(notify({ title: 'Styles', message: 'Success', sound: 'Morse' }));
  }

  process();

  if (watch || true) {
    gulp.watch('./app/src/styles/**/*.less', process);
  }
};

// html
var htmlminify = require('gulp-htmlmin');

function html (watch) {
  function process () {
    return gulp.src('./app/src/index.html')
      .pipe(gutil.env.prod ? htmlminify({
        collapseWhitespace: true,
        removeComments: true,
        minifyJS: true,
        minifyCSS: true
      }) : gutil.noop())
      .pipe(gulp.dest('./'))
      .pipe(notify({ title: 'Html', message: 'Success', sound: 'Morse' }));;  
  }

  process();

  if (watch || true) {
    gulp.watch('./app/src/index.html', process);
  }
};

// serve
var connect = require('gulp-connect');

function serve () {
  connect.server({
    root: './',
    port: 8000
  });
};

gulp.task('scripts', scripts);
gulp.task('vendor', vendor);
gulp.task('styles', styles);
gulp.task('html', html);
gulp.task('serve', serve);

gulp.task('watch', ['scripts', 'styles', 'html', 'serve']);

gulp.task('build', function () {
  scripts(false);
  vendor(false);
  styles(false);
  html(false);
});