'use strict';

const nodemon = require('gulp-nodemon');

module.exports = (gulp) => {
  gulp.task('server:dev', function () {
    nodemon({
      script: 'server/server.js',
      verbose: true,
      watch: [
        'server/',
      ],
      env: {
        NODE_ENV: 'development'
      },
      ext: 'js json'
    });
  });
};
