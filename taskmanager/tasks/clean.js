/**
 *
 * CLEAN
 *
 */



// the Imports
var del = require('del'),
	gulp = require('gulp'),
	env = require('gulp-environments'),
	config = require('../tdna.config.json');



// the Variables
var dev = env.development,
	prod = env.production;



// the Function
function clean(cb) {

	del(config.general.cleanPaths, {force: true});

	setTimeout(cb, 1000);

}



// the Task
gulp.task(clean);