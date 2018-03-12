/**
 *
 * STYLES
 *
 */



// get the Config
var config = require('../tdna.config.json');



// if task is not activated
if(!config.tasks.styles || (config.tasks.styles && !config.tasks.styles.active)) { return; }



// the Imports
var gulp = require('gulp'),
	gulpif = require('gulp-if'),
	sass = require('gulp-sass'),
	browser = require('./browser'),
	notify = require('gulp-notify'),
	postcss = require('gulp-postcss'),
	plumber = require('gulp-plumber'),
	flatten = require('gulp-flatten'),
	env = require('gulp-environments'),
	sassGlob = require('gulp-sass-glob'),
	autoprefixer = require('autoprefixer'),
	sourcemaps = require('gulp-sourcemaps');



// the Variables
var dev = env.development,
	prod = env.production,
	theCwd = config.tasks.styles.cwd,
	theSource = config.tasks.styles.src,
	theDest = config.tasks.styles.dest,
	watchIt = config.tasks.styles.watchIt,
	watcher = null,
	theOptions = {
		sass: {
			outputStyle: 'compressed'
		},
		autoprefixer: {
			cascade: false,
			browsers: config.browserSupport
		}
	};



// the Function
function styles(cb) {

	// get browser reload function ... or not
	var reloadIt = !!browser.stream ? browser.stream({once: true}) : function() { return true; };

	// the Watcher
	if(!watcher && !prod() && watchIt) {

		watcher = gulp.watch(theSource, {cwd: theCwd}, styles);
		watcher.on('all', function(event, path, stats) { console.log(path + ' : ' + event); });

	}

	// the Pump
	return gulp.src(theSource, {cwd: theCwd})
		.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
		.pipe(sassGlob())
		.pipe(dev(sourcemaps.init()))
		.pipe(sass(theOptions.sass))
		.pipe(postcss([ autoprefixer(theOptions.autoprefixer) ]))
		.pipe(dev(sourcemaps.write()))
		.pipe(flatten())
		.pipe(gulp.dest(theDest))
		.pipe(gulpif(!!browser.stream, dev(reloadIt)));

}



// the Task
gulp.task(styles);