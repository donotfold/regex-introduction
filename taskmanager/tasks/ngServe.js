/**
 *
 * NGSERVE
 *
 */



// get the Config
var config = require('../tdna.config.json');



// if task is not activated
if(!config.tasks.ngServe || (config.tasks.ngServe && !config.tasks.ngServe.active)) { return; }



// the Imports
var gulp = require('gulp'),
	shell = require('gulp-shell'),
	env = require('gulp-environments');



// the Variables
var dev = env.development,
	prod = env.production;



// the Task
gulp.task('ngServe', shell.task(config.tasks.ngServe.options.command));