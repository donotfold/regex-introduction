/**
 *
 * BROWSERSYNC
 *
 */



// get the Config
var config = require('../tdna.config.json');



// if task is not activated
if(!config.tasks.browser || (config.tasks.browser && !config.tasks.browser.active)) { return; }



// the Imports
var gulp = require('gulp'),
	env = require('gulp-environments'),
	theSyncer = require('browser-sync').create();



// the Variables
var prod = env.production,
	theOptions = config.tasks.browser ? config.tasks.browser.options : {};



// set the vhost that browserSync needs to proxy
theOptions.proxy = config.general.vhost;



// the Functions
function browser(cb) {

	// if --env production
	if(prod()) { console.log('Browersync is skipped on the production environment!'); cb(); return; }

	config.tasks.browser && config.tasks.browser.active && theSyncer.init(theOptions) || console.log('Browser task is NOT active!');

	cb();

}

// the Exports
module.exports = theSyncer;



// the Tasks
gulp.task(browser);