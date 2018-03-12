/**
 *
 * SCRIPTS
 *
 */



// get the Config
var config = require('../tdna.config.json');



// if task is not activated
if(!config.tasks.scripts || (config.tasks.scripts && !config.tasks.scripts.active)) { return; }



// the Imports
var gulp = require('gulp'),
	gulpif = require('gulp-if'),
	babel = require('gulp-babel'),
	browser = require('./browser'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	notify = require('gulp-notify'),
	plumber = require('gulp-plumber'),
	env = require('gulp-environments'),
	sourcemaps = require('gulp-sourcemaps');



// the Variables
var dev = env.development,
	prod = env.production,
	theCwd = config.tasks.scripts.cwd,
	theSource = config.tasks.scripts.src,
	theDest = config.tasks.scripts.dest,
	watchIt = config.tasks.scripts.watchIt,
	watcher = null,
	theOptions = config.tasks.scripts.options.filename;



// the Function
function scripts(cb) {

	// get browser reload function ... or not
	var reloadIt = !!browser.stream ? browser.stream({once: true}) : function() { return true; };

	// the Watcher
	if(!watcher && !prod() && watchIt) {

		watcher = gulp.watch(theSource, {cwd: theCwd}, scripts);
		watcher.on('all', function(event, path, stats) { console.log(path + ' : ' + event); });

	}

	// the Pump
	return gulp.src(theSource, {cwd: theCwd})
		.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
		.pipe(dev(sourcemaps.init()))
		.pipe(babel())
		.pipe(concat(theOptions))
		.pipe(dev(sourcemaps.write()))
		.pipe(prod(uglify()))
		.pipe(gulp.dest(theDest))
		.pipe(gulpif(!!browser.stream, dev(reloadIt)));

}



// the Task
gulp.task(scripts);