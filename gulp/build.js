'use strict';

const _ = require('lodash');
const autoprefixer = require('gulp-autoprefixer');
const babelify = require('babelify');
const Browserify = require('browserify');
const buffer = require('vinyl-buffer');
const jsonImporter = require('node-sass-json-importer');
const path = require('path');
const sass = require('gulp-sass');
const source = require('vinyl-source-stream');
const sourcemaps = require('gulp-sourcemaps');

const distDest = 'web/dist';
const vendors = ['bluebird', 'react', 'react-dom', 'immutability-helper'];

module.exports = (gulp) => {

  gulp.task('build:vendor:js', () => {
    return new Browserify({
      require: vendors,
      debug: true
    })
      .bundle()
      .on('error', onError)
      .pipe(source('vendor.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(distDest))
    ;
  });

  gulp.task('build:js', () => {
    return new Browserify({
      entries: 'web/js/app.jsx',
      extensions: ['.js', '.jsx'],
      debug: true
    })
      .external(vendors)
      .transform((file, opts) => {
        let presets = ['es2015'];
        if (path.extname(file) === '.jsx') {
          presets.push('react');
        }
        return babelify(file, _.extend({}, opts, { presets: presets }));
      })
      .bundle()
      .on('error', onError)
      .pipe(source('app.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(distDest));
  });

  gulp.task('build:css', () => {

    return gulp
      .src('web/css/**/*.scss')
      .pipe(
        sass({
          importer: jsonImporter
        })
          .on('error', sass.logError)
      )
      .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
      }))
      .pipe(gulp.dest(distDest));
  });

  gulp.task('build:html', () => {
    return gulp.src('web/html/**/*.html')
      .pipe(gulp.dest(distDest));
  });

  gulp.task('build:all',
            [
              'build:vendor:js',
              'build:js',
              'build:css',
              'build:html'
            ]
           );

  gulp.task('build:continuous', () => {
    gulp.watch(['web/common/**/*.json', 'web/js/**/*.*js', 'web/js/**/*.jsx'], ['build:js']);
    gulp.watch(['web/common/**/*.json', 'web/css/**/*.scss'], ['build:css']);
    gulp.watch('web/html/**/*.html', ['build:html']);
    gulp.watch([module.filename, '../package.json'], ['build:vendor:js']);
  });

};

function onError (err) {
  console.error("-E- " + (err.stack || err.message || err)); // eslint-disable-line no-console
  this.emit('end'); // eslint-disable-line no-invalid-this
}
