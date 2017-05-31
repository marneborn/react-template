'use strict';

const mocha = require('gulp-mocha');

module.exports = (gulp) => {
  gulp.task('test:web:unit', () => {
    gulp
      .src('web/test/**/*.spec.js', {read: false})
      .pipe(mocha({
        reporter  : 'dot',
        quiet     : false,
        noFail    : false,
        checkLeaks: true,
        require   : [
          './web/test/utils/globals.js',
          './web/test/utils/babel.js',
          './web/test/utils/dom.js'
        ]
      }));
  });

  gulp.task('test:web:unit:continuous', () => {
    gulp.watch(['web/js/**/*.*js', 'web/js/**/*.jsx', 'web/test/**/*.js'], ['test:web:unit']);
  });
};
