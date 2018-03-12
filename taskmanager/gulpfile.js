/**
 *
 * DEFAULT
 *
 */



// the Imports
var gulp = require('gulp'),
	env = require('gulp-environments'),
	requireDir = require('require-dir'),
	config = require('./tdna.config.json');



// load all tasks
var dir = requireDir('./tasks', {recurse: true});



// the Variables
var dev = env.development,
	prod = env.production;



// the default no tasks function
var theDefaulTasks = function(cb) { console.log('no tasks!'); cb(); };



// get the task names
var allTasks = config.tasks;
var taskNames = Object.keys(allTasks);

// if tasks get the active ones
if(taskNames.length) {

	// start with an empty array
	let theActiveTasks = [];

	var theEnv = dev() ? "dev" : "prod";

	// loop through all tasks
	taskNames.forEach(function(taskName) {
		allTasks[taskName].active && (!allTasks[taskName].env || allTasks[taskName].env.indexOf(theEnv) > -1) && theActiveTasks.push(taskName);
	});

	// if has active tasks
	if(theActiveTasks.length) {
		theActiveTasks.unshift('clean');
		theDefaulTasks = theActiveTasks;
	}

}



// the Default Task
gulp.task('default', gulp.series(theDefaulTasks));