/**
 *
 * SVG
 *
 */



// get the Config
var config = require('../tdna.config.json');



// if task is not activated
if(!config.tasks.svg || (config.tasks.svg && !config.tasks.svg.active)) { return; }



// the Imports
var gulp = require('gulp'),
	gulpif = require('gulp-if'),
	browser = require('./browser'),
	notify = require('gulp-notify'),
	svgmin = require('gulp-svgmin'),
	plumber = require('gulp-plumber'),
	flatten = require('gulp-flatten'),
	env = require('gulp-environments');



// the Variables
var dev = env.development,
	prod = env.production,
	theCwd = config.tasks.svg.cwd,
	theSource = config.tasks.svg.src,
	theDest = config.tasks.svg.dest,
	watchIt = config.tasks.svg.watchIt,
	watcher = null,
	theOptions = {
		plugins: [
			{ removeDoctype: true },
			{ removeComments: true },
			{ removeDimensions: true },
			{ convertShapeToPath: true },
			{ convertStyleToAttrs: true },
			{ cleanupNumericValues: { floatPrecision: 0 } }
		]
	};



// the Function
function svg(cb) {

	// get browser reload function ... or not
	var reloadIt = !!browser.stream ? browser.stream({once: true}) : function() { return true; };

	// the Watcher
	if(!watcher && !prod() && watchIt) {

		watcher = gulp.watch(theSource, {cwd: theCwd}, svg);
		watcher.on('all', function(event, path, stats) { console.log(path + ' : ' + event); });

	}

	return gulp.src(theSource, {cwd: theCwd})
		.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
		.pipe(flatten())
		.pipe(svgmin(theOptions))
		.pipe(gulp.dest(theDest))
		.pipe(gulpif(!!browser.stream, dev(reloadIt)));

}



// the Task
gulp.task(svg);