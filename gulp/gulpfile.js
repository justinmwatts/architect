'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var eslint = require('gulp-eslint');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat-util');
var del = require('del');
var connect = require('gulp-connect');

var config = {
	srcDir: '../src/',
	sassPattern: 'sass/**/*.scss',
	scriptsPattern: 'js/**/*.js',
	htmlPattern: '../*.html'
};

var JAVASCRIPT = [
	'../src/js/architect.core.js',
	'../src/js/*.js'
];

// Clean dist
gulp.task('clean', function () {
	del(['dist']);
});

// SASS
gulp.task('sass', ['clean'], function () {
	return gulp.src(config.srcDir + config.sassPattern)
		.pipe(sass({
			outputStyle: 'compressed'
		}).on('error', sass.logError))
		.pipe(gulp.dest('../dist'))
		.pipe(connect.reload());
});

// JavaScript
gulp.task('javascript', ['clean'], function () {
	return gulp.src(JAVASCRIPT)
		.pipe(sourcemaps.init())
		.pipe(uglify())
		.pipe(concat('app.min.js'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('../dist'))
		.pipe(connect.reload());
});

// JavaScript Demo
gulp.task('demoJavascript', ['clean'], function () {
	return gulp.src('../demo/*.js')
		.pipe(sourcemaps.init())
		.pipe(uglify())
		.pipe(concat('demo.min.js'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('../dist'))
		.pipe(connect.reload());
});

// ESLint
gulp.task('lintJavascript', function () {
	return gulp.src([config.srcDir + config.scriptsPattern, '!node_modules/**'])
		.pipe(eslint())
		.pipe(eslint.result(result => {
			// Called for each ESLint result. 
			console.log(`ESLint result: ${result.filePath}`);
			console.log(`# Messages: ${result.messages.length}`);
			console.log(`# Warnings: ${result.warningCount}`);
			console.log(`# Errors: ${result.errorCount}`);
		}))
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});

// HTML
gulp.task('html', function () {
	return gulp.src(config.htmlPattern)
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

// Watch - Run our tasks when a file changes
gulp.task('watch', ['lintJavascript'], function () {
	gulp.watch([config.srcDir + config.sassPattern], ['sass']);
	gulp.watch(config.srcDir + config.scriptsPattern, ['lintJavascript', 'javascript']);
	gulp.watch([config.htmlPattern], ['html']);

	// DEMO
	gulp.watch('../demo/*.js', ['demoJavascript']);
});

// Default task
// Compile and lint everything first, then start the webserver and watch
gulp.task('default', ['sass', 'lintJavascript', 'javascript', 'demoJavascript', 'connect', 'watch']);