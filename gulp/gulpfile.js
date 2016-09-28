'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat-util');
var del = require('del');
var sourcemaps = require('gulp-sourcemaps');
var connect = require('gulp-connect');

var config = {
	srcDir: '../src/',
	sassPattern: 'sass/**/*.scss',
	scriptsPattern: 'js/**/*.js',
	htmlPattern: '../*.html'
};

// Clean dist
gulp.task('clean', function () {
	return del(['dist']);
});

// SASS
gulp.task('sass', ['clean'], function () {
	gulp.src(config.srcDir + config.sassPattern)
		.pipe(sass({
			outputStyle: 'compressed'
		}).on('error', sass.logError))
		.pipe(gulp.dest('../dist/css'))
		.pipe(connect.reload());
});

// Scripts
gulp.task('scripts', ['clean'], function () {
	return gulp.src(config.srcDir + config.scriptsPattern)
		.pipe(sourcemaps.init())
		.pipe(uglify())
		.pipe(concat('app.min.js'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('../dist/js'))
		.pipe(connect.reload());
});

// HTML
gulp.task('html', function () {
	gulp.src(config.htmlPattern)
		.pipe(connect.reload());
});

// Connect webserver
gulp.task('connect', function () {
	connect.server({
		root: '../',
		port: 8888,
		livereload: true
	});
});

// Watch - run our task when a file changes
gulp.task('watch', function () {
	gulp.watch([config.srcDir + config.sassPattern], ['sass']);
	gulp.watch(config.srcDir + config.scriptsPattern, ['scripts']);
	gulp.watch([config.htmlPattern], ['html']);
});

// Default task
gulp.task('default', ['sass', 'scripts', 'connect', 'watch']);