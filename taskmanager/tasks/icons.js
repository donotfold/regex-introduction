/**
 *
 * ICONS
 *
 */



// get the Config
var config = require('../tdna.config.json');



// if task is not activated
if(!config.tasks.icons || (config.tasks.icons && !config.tasks.icons.active)) { return; }



// the Imports
var gulp = require('gulp'),
	gulpif = require('gulp-if'),
	browser = require('./browser'),
	notify = require('gulp-notify'),
	plumber = require('gulp-plumber'),
	flatten = require('gulp-flatten'),
	env = require('gulp-environments'),
	svgSprite = require('gulp-svg-sprite');



// the Variables
var dev = env.development,
	prod = env.production,
	theCwd = config.tasks.icons.cwd,
	theSource = config.tasks.icons.src,
	theDest = config.tasks.icons.dest,
	watchIt = config.tasks.icons.watchIt,
	watcher = null,
	theOptions = {
		svg: {
			xmlDeclaration: false,
			doctypeDeclaration: false,
			namespaceClassnames: false,
			dimensionAttributes: false,
			rootAttributes: {
				class: 'theSprite'
			},
			transform: [
				function(svg) {

					return svg.replace(/fill=\"(?!currentColor)(.*?)\"/ig, 'fill="currentColor"');

				}
			]
		},
		shape: {
			id: {
				generator: function(name) {

					var dirs = name.split('/');
					var fileName = dirs[dirs.length - 1];

					return 'symbol--' + fileName.split('.')[0];

				}
			},
			dimension: {
				maxWidth: 32,
				maxHeight: 32
			},
			spacing: {
				padding: 0,
				box: 'content'
			}
		},
		mode: {
			symbol: {
				dest: '',
				prefix: '.%s',
				sprite: '',
				inline: false,
				dimensions: false
			}
		}
	};



// the Function
function icons(cb) {

	// get browser reload function ... or not
	var reloadIt = !!browser.stream ? browser.stream({once: true}) : function() { return true; };

	// the Watcher
	if(!watcher && !prod() && watchIt) {

		watcher = gulp.watch(theSource, {cwd: theCwd}, icons);
		watcher.on('all', function(event, path, stats) { console.log(path + ' : ' + event); });

	}

	return gulp.src(theSource, {cwd: theCwd})
		.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
		.pipe(svgSprite(theOptions))
		.pipe(gulp.dest(theDest))
		.pipe(gulpif(!!browser.stream, dev(reloadIt)));

}



// the Task
gulp.task(icons);