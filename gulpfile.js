'use strict';

var gulp    = require('gulp'),
	sass  = require('gulp-sass'),
	inject  = require('gulp-inject'),
	minifyCss  = require('gulp-minify-css'),
	mustache = require('gulp-mustache'),
	rename = require('gulp-rename'),
	useref     = require('gulp-useref'),
	uglify     = require('gulp-uglify'),
	gulpif     = require('gulp-if'),
	wiredep = require('wiredep').stream;

gulp.task('inject', function() {
	var target = gulp.src('index.html');
	var sources = gulp.src(['./assets/js/*.js','./assets/css/*.css'], {read: false});
	return target.pipe(inject(sources, {relative: true}))
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
    /*.pipe(rename({suffix: '.min'}))
    .pipe(minifyCss())*/
    .pipe(gulp.dest('./assets/css/'));
});
 
gulp.task('watch', function () {
  gulp.watch('./sass/*.scss', ['sass']);
  gulp.watch(['./template/*.mustache'], ['replace','inject','wiredep']);
  gulp.watch(['config.json'], ['replace','inject','wiredep']); 
});

var mustache_vars = require('./config.json');

gulp.task('replace',function()
{
	gulp.src("./template/index.mustache")
    .pipe(mustache(mustache_vars))
    .pipe(rename('index.html'))
    .pipe(gulp.dest("./"));
});

gulp.task('compress',function() {
	var assets = useref.assets();

	gulp.src('*.html')
		.pipe(assets)
		.pipe(gulpif('*.js', uglify()))
		.pipe(assets.restore())
		.pipe(useref())
		.pipe(gulp.dest('./'));
});


gulp.task('init',['replace','sass']);
gulp.task('default', ['wiredep', 'inject', 'watch']);

