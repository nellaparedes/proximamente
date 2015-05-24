'use strict';

var gulp    = require('gulp'),
	gutil 	= require('gulp-util'),
	sass  	= require('gulp-sass'),
	inject  = require('gulp-inject'),
	minifyCss  = require('gulp-minify-css'),
	uncss 	= require('gulp-uncss'),
	mustache = require('gulp-mustache'),
	rename 	= require('gulp-rename'),
	useref  = require('gulp-useref'),
	uglify  = require('gulp-uglify'),
	gulpif  = require('gulp-if'),
	imageop = require('gulp-image-optimization'),
	clean 	= require('gulp-clean'),
	wiredep = require('wiredep').stream,
	fs 		= require('fs');


var folder = 'build';
var template = 'default';
var theme = 'grey';

if(gutil.env.folder)
{
	folder = gutil.env.folder;
}

if(gutil.env.template)
{
	if( fs.existsSync('./templates/' + gutil.env.template + '.mustache')) 
	{
		template = gutil.env.template;
	}
	else
	{
		console.log('Template ' + gutil.env.template + ' not found. Using default instead');		
	}	
}

if(gutil.env.theme)
{
	if( fs.existsSync('./app/sass/' + gutil.env.theme + '.scss'))
	{
		theme = gutil.env.theme;
	}
	else
	{
		console.log('Theme ' + gutil.env.theme + ' not found. Using default instead');		
	}	
}

gulp.task('replace',function()
{
	var mustache_vars = require('./config.json');
	return gulp.src("./templates/" + template + ".mustache")
    .pipe(mustache(mustache_vars))
    .pipe(rename('index.html'))
    .pipe(gulp.dest("./app/"));
});

gulp.task('wiredep', ['replace'], function () {
	return gulp.src('./app/index.html')
	.pipe(wiredep({directory: './app/bower_components'}))
	.pipe(gulp.dest('./app/'));
});

gulp.task('generate', ['wiredep','sass'], function() {

	gulp.src(['./themes/' + theme + '.jpg'])
    	.pipe(gulp.dest('./app/assets/img/'));

	var target = gulp.src('./app/index.html');
	var sources = gulp.src(['./app/assets/js/*.js','./app/assets/css/*.css'], {read: false});
	return target.pipe(inject(sources, {relative: true}))
			.pipe(gulp.dest('./app/'));
});

gulp.task('sass', function () {
  return gulp.src('./app/sass/' + theme + '.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(rename('main.css'))
    .pipe(gulp.dest('./app/assets/css/'));
});
 
gulp.task('watch', function () {
  gulp.watch('./sass/*.scss', ['sass']);
  gulp.watch(['./template/*.mustache'], ['generate']);
  gulp.watch(['config.json'], ['generate']); 
});

gulp.task('compress',function(cb) {
	var assets = useref.assets();
    
	gulp.src(['./app/assets/img/*.png','./app/assets/img/*.jpg','./app/assets/img/*.gif','./app/assets/img/*.jpeg'])
    	.pipe(imageop({optimizationLevel: 5,progressive: true,interlaced: true}))
    	.pipe(gulp.dest('./' + folder + '/img'))
    	.on('end', cb).on('error', cb);

    gulp.src(['./app/assets/fonts/*.*'])
    	.pipe(gulp.dest('./' + folder + '/fonts'));	

	gulp.src('./app/index.html')
		.pipe(assets)
		.pipe(gulpif('*.css', minifyCss({rebase: false})))
		.pipe(gulpif('*.js', uglify()))
		.pipe(assets.restore())
		.pipe(useref())
		.pipe(gulp.dest('./' + folder));
});

gulp.task('optimize', ['compress'], function() {
	
	return gulp.src('./' + folder + '/css/main.min.css')
		.pipe(uncss({
			html: ['./' + folder + '/index.html']
		}))
		.pipe(minifyCss({rebase: false}))
		.pipe(gulp.dest('./' + folder + '/css'));
	
});

gulp.task('clean', function () 
{
	gulp.src(['./app/assets/js/*.js', './app/assets/css/*.css','./app/assets/img/*.*', './app/index.html'], {read: false})
    .pipe(clean());
});
 
gulp.task('scripts', ['clean-scripts'], function () {
  gulp.src('app/scripts/*.js')
    .pipe(gulp.dest('app/tmp'));
});

gulp.task('default', ['generate']);
gulp.task('build', ['optimize']);