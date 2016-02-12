/*
 * Gulp commands for building the project
 * Specifically just managing the r.js optimizer and configuration.
 * gulp will run an npm script
 */

var gulp 		= require('gulp'),
	gutil   	= require('gulp-util'),
	config  	= require('../config.json'),
	// GULP blacklists most requirejs modules, the team considers requirejs
	// to be another package manager, so we just run it from the shell/command line.
	run			= require('gulp-run');

gulp.task('build', [
	'iconfonts',
	'compass',  // this gets run by watch asap.
], function() {

});


