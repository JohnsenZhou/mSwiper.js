const gulp = require('gulp');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

gulp.task('default', function() {
  gulp.src('src/*.js')
      .pipe(rename('mSwiper.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest('dist'))
})