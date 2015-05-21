'use strict';

var gulp    = require('gulp'),
	sass  = require('gulp-sass'),
	jshint  = require('gulp-jshint'),
	stylish = require('jshint-stylish'),
	inject  = require('gulp-inject'),
	minifyCss  = require('gulp-minify-css'),
	wiredep = require('wiredep').stream;

gulp.task('inject', function() {
	var target = gulp.src('index.html');
	var sources = gulp.src(['./assets/js/*.js','./assets/css/*.css']);
	return target.pipe(inject(sources, {read: false}))
			.pipe(gulp.dest('./'));
});

gulp.task('wiredep', function () {
	gulp.src('./index.html')
	.pipe(wiredep({
		directory: './bower_components'
	}))
	.pipe(gulp.dest('./'));
});


gulp.task('jshint', function() {
return gulp.src('./assets/js/*.js')
	.pipe(jshint('.jshintrc'))
	.pipe(jshint.reporter('jshint-stylish'))
	.pipe(jshint.reporter('fail'));
});


gulp.task('sass', function () {
  gulp.src('./sass/foundation.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./assets/css/'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('./sass/*.scss', ['sass']);
});

