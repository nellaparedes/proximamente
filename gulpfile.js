'use strict';

var gulp    = require('gulp'),
	sass  = require('gulp-sass'),
	inject  = require('gulp-inject'),
	minifyCss  = require('gulp-minify-css'),
	mustache = require('gulp-mustache'),
	rename = require('gulp-rename'),
	wiredep = require('wiredep').stream;

gulp.task('inject', function() {
	var target = gulp.src('index.html');
	var sources = gulp.src(['./assets/js/*.js','./assets/css/*.css']);
	return target.pipe(inject(sources, {read: false}))
			.pipe(gulp.dest('./'));
});

gulp.task('wiredep', function () {
	gulp.src('index.html')
	.pipe(wiredep({
		directory: './bower_components'
	}))
	.pipe(gulp.dest('./'));
});

gulp.task('sass', function () {
  gulp.src('./sass/foundation.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./assets/css/'));
});
 
gulp.task('watch', function () {
  gulp.watch('./sass/*.scss', ['sass','inject']);
  gulp.watch(['./assets/js/*.js', './gulpfile.js'], ['inject']);
  gulp.watch(['./bower.json'], ['wiredep']);
});

var mustache_vars = require('./config.json');

gulp.task('replace',function()
{
	gulp.src("./template/index.mustache")
    .pipe(mustache(mustache_vars))
    .pipe(rename('index.html'))
    .pipe(gulp.dest("./"));
});

gulp.task('default', ['replace', 'sass', 'wiredep', 'inject', 'watch']);

