var gulp = require("gulp");
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var watchify = require('watchify');

gulp.task("default", function () {
    var args = watchify.args;
    args.extensions = ['.js', '.jsx'];
    var bundler = watchify(browserify('./src/application.jsx', args));
    bundler.transform('babelify');
    function bundle() {
        return bundler.bundle()
            .pipe(source('compiled.js'))
            .pipe(gulp.dest('./'));
    }
    bundler.on('update', bundle); // on any dep update, runs the bundler
    bundle();
});
