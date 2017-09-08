const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify');
const rev = require('gulp-rev');
const revCollector = require('gulp-rev-collector');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const rename = require('gulp-rename');

const PATH = {
  IMG: 'dist/demo/img',
  LIB: 'dist/demo/lib',
  DIST: './dist',
  INDEX: './dist/demo',
  REV: './rev/js'
}

gulp.task('dev', ['min-js', 'min-img', 'rev'], () => {
  browserSync.init({
    server: {
      baseDir: './src'
    },
    ui: {
      port: 8080
    },
    startPath: '/demo'
  });
  gulp.watch([
    './src/demo/lib/*.js',
    './src/demo/img/*',
    './src/demo/*.html',
    './src/*.js'
  ], ['file-watch'])
})

gulp.task('file-watch', (done) => {
  browserSync.reload();
  done();
})

gulp.task('min-js', () => {
  return gulp.src('./src/demo/lib/*.js')
      .pipe(uglify())
      .pipe(gulp.dest(PATH.LIB))
})

gulp.task('min-img', () => {
  return gulp.src('./src/demo/img/*')
      .pipe(imagemin())
      .pipe(gulp.dest(PATH.IMG))
})

gulp.task('rev-js', () => {
  return gulp.src('./src/mSwiper.js')
      .pipe(uglify())
      .pipe(rev())
      .pipe(gulp.dest('dist'))
      .pipe(rev.manifest())
      .pipe(gulp.dest(PATH.REV))
})

gulp.task('rev', ['rev-js'], () => {
  return gulp.src(['rev/js/*.json', './src/demo/*.html'])
      .pipe(revCollector())
      .pipe(htmlmin({
        minifyCSS: true,
        minifyJS: true,
        collapseWhitespace: true
      }))
      .pipe(gulp.dest(PATH.INDEX))
})

gulp.task('dist', () => {
  gulp.src('src/*.js')
      .pipe(rename('mSwiper.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest(PATH.DIST))
})

gulp.task('default', ['dev'])

gulp.task('build', ['min-js', 'min-img', 'rev', 'dist'])
