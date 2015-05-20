'use strict';

var gulp    = require('gulp'),
	sass  = require('gulp-sass'),
	jshint  = require('gulp-jshint'),
	stylish = require('jshint-stylish'),
	inject  = require('gulp-inject'),
	minifyCss  = require('gulp-minify-css'),
	wiredep = require('wiredep').stream;

gulp.task('jshint', function() {
return gulp.src('./assets/js/*.js')
	.pipe(jshint('.jshintrc'))
	.pipe(jshint.reporter('jshint-stylish'))
	.pipe(jshint.reporter('fail'));
});

gulp.task('copy',function(){
	gulp.src('./bower_components/foundation/js/vendor/*.js')
		.pipe($.copy('./assets/js'));	
});


gulp.task('sass', function () {
  gulp.src('./sass/foundation.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('./sass/*.scss', ['sass']);
});

