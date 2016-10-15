'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var eslint = require('gulp-eslint');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat-util');
var del = require('del');
var connect = require('gulp-connect');

var SASS = [
	'../sass/*.scss'
];

var JAVASCRIPT = [
	'../js/architect.app.js', // architect.app.js must be compiled first
	'../js/*.js'
];

var HTML = [
	'../*.html'
];

// Clean dist
gulp.task('clean', function () {
	del(['dist']);
});

// SASS
gulp.task('sass', ['clean'], function () {
	return gulp.src(SASS)
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

// ESLint
gulp.task('lintJavascript', function () {
	return gulp.src(['../js/*.js', '!node_modules/**'])
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
	return gulp.src(HTML)
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
	gulp.watch([SASS], ['sass']);
	gulp.watch([JAVASCRIPT], ['lintJavascript', 'javascript']);
	gulp.watch([HTML], ['html']);
});

// Default task
// Compile and lint everything first, then start the webserver and watch
gulp.task('default', ['sass', 'lintJavascript', 'javascript', 'connect', 'watch']);