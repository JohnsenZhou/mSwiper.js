const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify');
const header = require('gulp-header');
const rename = require('gulp-rename');
const ts = require("gulp-typescript");
const tsProject = ts.createProject("tsconfig.json");

const PATH = {
  DIST: './dist'
}

// Metadata for build files
const now = new Date();
const TIMESTAMP = {
  YEAR: now.getFullYear(),
  MONTH: now.getMonth() + 1,
  DAY: now.getDate()
};

const banner = `
/**
 * <%= pkg.name %> <%= pkg.version %>
 *
 * Copyright (c) ${TIMESTAMP.YEAR}, Johnsen zhou.
 * All rights reserved.
 *
 * LICENSE
 * build: ${TIMESTAMP.YEAR}-${TIMESTAMP.MONTH}-${TIMESTAMP.DAY}
 */
`;

gulp.task('default', ['ts-compiler'], () => {
  browserSync.init({
    server: {
      baseDir: './'
    },
    ui: {
      port: 8080
    },
    startPath: '/example'
  });
  gulp.watch([
    './examples/lib/*.js',
    './examples/img/*',
    './examples/*.html',
    './src/*.js'
  ], ['file-watch'])
})

gulp.task('file-watch', (done) => {
  browserSync.reload();
  done();
})

gulp.task('ts-compiler', () => {
  return tsProject.src()
    .pipe(tsProject())
    .js
    .pipe(rename('mSwiper.min.js'))
    // .pipe(uglify())
    // .pipe(header(banner, {
    //   'pkg': require('./package.json')
    // }))
    .pipe(gulp.dest(PATH.DIST))
})
