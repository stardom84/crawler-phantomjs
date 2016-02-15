var gulp = require('gulp'),
	plugins = require('gulp-load-plugins')();

var path = require('path');

var pathExists = require('path-exists');

process.env.NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
process.env.PORT = process.env.PORT ? process.env.PORT : '8080';
var env = {
	NODE_ENV: process.env.NODE_ENV,
	PORT: process.env.PORT,
	get isDev() {
		return this.NODE_ENV === 'development';
	},
	get isProd() {
		return this.NODE_ENV === 'production';
	},
	get paths() {
		return this.isDev ? paths.dev : paths.prod;
	}
};


/**
 * Definitions
 */

function ts(filesRoot, filesDest, project) {
	var title = arguments.callee.caller.name;
	var result = project.src()
		.pipe(plugins.tslint())
		.pipe(plugins.tslint.report('verbose'))
		.pipe(plugins.sourcemaps.init())
		.pipe(plugins.typescript(project));
	return result.js
		.pipe(plugins.if(env.isProd, plugins.uglify()))
		.pipe(plugins.if(env.isDev, plugins.sourcemaps.write({
			sourceRoot: path.join(__dirname, '/', filesRoot)
		})))
		.pipe(gulp.dest(filesDest))
}

function tsSrc() {
	var filesRoot = 'src';
	var filesDest = "build";

	var tsProject = plugins.typescript.createProject(filesRoot + '/tsconfig.json', {
		typescript: require('typescript'),
		outFile: 'server.js'
	});

	return ts(filesRoot, filesDest, tsProject);
}

function casperjs(){
	return plugins.run('casperjs ./build/server.js').exec();
}

function watch() {
	gulp.watch('src/*.{ts,css,html}', gulp.series(tsSrc));
}

/**
 * Public Tasks
 */

gulp.task('build', gulp.series(
	tsSrc, watch
));
gulp.task('casper', gulp.series(casperjs));
/**
 * Watches
 */


