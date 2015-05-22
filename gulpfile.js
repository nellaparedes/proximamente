'use strict';

var gulp    = require('gulp'),
	gutil = require('gulp-util'),
	sass  = require('gulp-sass'),
	inject  = require('gulp-inject'),
	minifyCss  = require('gulp-minify-css'),
	mustache = require('gulp-mustache'),
	rename = require('gulp-rename'),
	useref     = require('gulp-useref'),
	uglify     = require('gulp-uglify'),
	gulpif     = require('gulp-if'),
	imageop = require('gulp-image-optimization'),
	wiredep = require('wiredep').stream;


var folder = 'build';

if(gutil.env.folder)
{
	folder = gutil.env.folder;
}



gulp.task('replace',function()
{
	var mustache_vars = require('./config.json');
	return gulp.src("./template/index.mustache")
    .pipe(mustache(mustache_vars))
    .pipe(rename('index.html'))
    .pipe(gulp.dest("./"));
});

gulp.task('wiredep', ['replace'], function () {
	return gulp.src('index.html')
	.pipe(wiredep({directory: './bower_components'}))
	.pipe(gulp.dest('./'));
});

gulp.task('generate', ['wiredep','sass'], function() {
	var target = gulp.src('index.html');
	var sources = gulp.src(['./assets/js/*.js','./assets/css/*.css'], {read: false});
	return target.pipe(inject(sources, {relative: true}))
			.pipe(gulp.dest('./'));
});

gulp.task('sass', function () {
  return gulp.src('./sass/foundation.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./assets/css/'));
});
 
gulp.task('watch', function () {
  gulp.watch('./sass/*.scss', ['sass']);
  gulp.watch(['./template/*.mustache'], ['generate']);
  gulp.watch(['config.json'], ['generate']); 
});

gulp.task('compress',function(cb) {
	var assets = useref.assets();

    gulp.src(['./assets/img/*.*'])
    	.pipe(imageop({optimizationLevel: 5,progressive: true,interlaced: true}))
    	.pipe(gulp.dest('./' + folder + '/img'))
    	.on('end', cb).on('error', cb);

	gulp.src('./index.html')
		.pipe(assets)
		.pipe(gulpif('*.css', minifyCss({keepSpecialComments : 0, rebase: false})))
		.pipe(gulpif('*.js', uglify()))
		.pipe(assets.restore())
		.pipe(useref())
		.pipe(gulp.dest('./' + folder));
});


gulp.task('default', ['generate']);

