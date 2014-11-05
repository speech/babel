'use strict';
var gulp = require('gulp');
var zip = require('gulp-zopfli');
var rename = require('gulp-rename');
var closure = require('gulp-closure-compiler');

gulp.task('compress', function() {
  gulp.src('babel.js')
    .pipe(closure({
      compilerPath: 'bower_components/closure-compiler/lib/vendor/compiler.jar',
      fileName: 'babel.mini.js',
      compilerFlags:{
        compilation_level: 'ADVANCED_OPTIMIZATIONS',
        language_in:'ECMASCRIPT5_STRICT',
        create_source_map: 'babel.map'
      }
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('default', ['compress'], function() {

  gulp.src('babel.mini.js')
    .pipe(zip())
    .pipe(rename('babel.mini.js.gz'))
    .pipe(gulp.dest('./'));

});

gulp.task('debug', function() {


gulp.src('babel.js')
  .pipe(closure({
    compilerPath: 'bower_components/closure-compiler/lib/vendor/compiler.jar',
    fileName: 'build.js',
    compilerFlags:{
      compilation_level: 'WHITESPACE_ONLY',
      formatting:'pretty_print',
        language_in:'ECMASCRIPT5_STRICT'
    }
  }))
  .pipe(gulp.dest('.tmp'));

});