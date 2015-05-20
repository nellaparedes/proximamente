'use strict';

var gulp    = require('gulp'),
	sass  = require('gulp-sass'),
	jshint  = require('gulp-jshint'),
	stylish = require('jshint-stylish'),
	inject  = require('gulp-inject'),
	minifyCss  = require('gulp-minify-css'),
	concat = require('gulp-concat'),
	wiredep = require('wiredep').stream;

/*
gulp.task('inject', function() {
	var sources = gulp.src(['./app/js/*.js','./app/css/*.css']);
	return gulp.src('index.html')
		.pipe(inject(sources, {
				read: false
			}))
		.pipe(gulp.dest('./'));
});

gulp.task('wiredep', function () {
	gulp.src('./index.html')
	.pipe(wiredep({
		directory: './app/lib'
	}))
	.pipe(gulp.dest('./app'));
});*/


gulp.task('jshint', function() {
return gulp.src('./assets/js/*.js')
	.pipe(jshint('.jshintrc'))
	.pipe(jshint.reporter('jshint-stylish'))
	.pipe(jshint.reporter('fail'));
});

gulp.task('copy',function(){
	gulp.src('./bower_components/foundation/js/vendor/*.js')
		.pipe($.copy('./assets/js'));

	gulp.src('./bower_components/foundation/js/foundation.min.js')
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

