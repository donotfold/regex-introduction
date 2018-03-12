/**
 *
 * GRAPHICS
 *
 */



// get the Config
var config = require('../tdna.config.json');



// if task is not activated
if(!config.tasks.graphics || (config.tasks.graphics && !config.tasks.graphics.active)) { return; }



// the Imports
var gulp = require('gulp'),
	gulpif = require('gulp-if'),
	browser = require('./browser'),
	notify = require('gulp-notify'),
	plumber = require('gulp-plumber'),
	changed = require('gulp-changed'),
	flatten = require('gulp-flatten'),
	env = require('gulp-environments'),
	imagemin = require('gulp-imagemin');



// the Variables
var dev = env.development,
	prod = env.production,
	theCwd = config.tasks.graphics.cwd,
	theSource = config.tasks.graphics.src,
	theDest = config.tasks.graphics.dest,
	watchIt = config.tasks.graphics.watchIt,
	watcher = null,
	theOptions = {
		progressive: true
	};



// the Function
function graphics(cb) {

	// get browser reload function ... or not
	var reloadIt = !!browser.stream ? browser.stream({once: true}) : function() { return true; };

	// the Watcher
	if(!watcher && !prod() && watchIt) {

		watcher = gulp.watch(theSource, {cwd: theCwd}, graphics);
		watcher.on('all', function(event, path, stats) { console.log(path + ' : ' + event); });

	}

	return gulp.src(theSource, {cwd: theCwd})
		.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
		.pipe(flatten())
		.pipe(prod(imagemin(theOptions)))
		.pipe(changed(theDest, {hasChanged: changed.compareLastModifiedTime}))
		.pipe(gulp.dest(theDest))
		.pipe(gulpif(!!browser.stream, dev(reloadIt)));

}



// the Task
gulp.task(graphics);