var gulp = require('gulp'),
	plugins = require('gulp-load-plugins')();

var path = require('path'),
	fork = require('child_process').fork;

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

var app = {
	instance: {},

	path: 'build/server.js',

	env: env,

	start: function (callback) {
		process.execArgv.push('--harmony');

		app.instance = fork(app.path, {silent: true, env: app.env});
		app.instance.stdout.pipe(process.stdout);
		app.instance.stderr.pipe(process.stderr);

		plugins.util.log(plugins.util.colors.cyan('Starting'), 'express server ( PID:', app.instance.pid, ')');

		if (callback) callback();
	},

	stop: function (callback) {
		if (app.instance.connected) {
			app.instance.on('exit', function () {
				plugins.util.log(plugins.util.colors.red('Stopping'), 'express server ( PID:', app.instance.pid, ')');
				if (callback) callback();
			});
			return app.instance.kill('SIGINT');
		}
		if (callback) callback();
	},

	restart: function restart(event) {
		gulp.series(
			app.stop,
			app.start
		);
	}
};

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
		typescript: require('typescript')
	});

	return ts(filesRoot, filesDest, tsProject);
}

function casper() {
	return gulp.src('build/server.js', {read: false})
		.pipe(plugins.shell([
			'node <%= file.path %>'
		]));
}

function mongodb() {
	return gulp.src(['D:/workspace/mongodb'])
		.pipe(plugins.shell(['mongod --dbpath <%= file.path %>']));
}

function watch() {
	gulp.watch('src/**/*.{ts}', gulp.series(tsSrc));
}

/**
 * Public Tasks
 */

gulp.task('build', gulp.series(
	tsSrc, watch
));
gulp.task('casper', gulp.series(casper));

gulp.task('mongodb', gulp.series(mongodb));
/**
 * Watches
 */


