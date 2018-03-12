/**
 *
 * COPY
 *
 */



// get the Config
var config = require('../tdna.config.json');



// if task is not activated
if(!config.tasks.copy || (config.tasks.copy && !config.tasks.copy.active)) { return; }



// the Imports
var gulp = require('gulp'),
	gulpif = require('gulp-if'),
	browser = require('./browser'),
	notify = require('gulp-notify'),
	plumber = require('gulp-plumber'),
	flatten = require('gulp-flatten'),
	changed = require('gulp-changed'),
	env = require('gulp-environments');



// the Variables
var dev = env.development,
	prod = env.production,
	theCwd = config.tasks.copy.cwd,
	theSource = config.tasks.copy.src,
	theDest = config.tasks.copy.dest,
	watchIt = config.tasks.copy.watchIt,
	watcher = null;



// the Function
function copy(cb) {

	// get browser reload function ... or not
	var reloadIt = !!browser.stream ? browser.stream({once: true}) : function() { return true; };

	// the Watcher
	if(!watcher && !prod() && watchIt) {

		watcher = gulp.watch(theSource, {cwd: theCwd}, copy);
		watcher.on('all', function(event, path, stats) { console.log(path + ' : ' + event); });

	}


	return gulp.src(theSource, {cwd: theCwd})
		.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
		.pipe(flatten({includeParents: -1}))
		.pipe(changed(theDest, {hasChanged: changed.compareLastModifiedTime}))
		.pipe(gulp.dest(theDest))
		.pipe(gulpif(!!browser.stream, dev(reloadIt)));

}



// the Task
gulp.task(copy);