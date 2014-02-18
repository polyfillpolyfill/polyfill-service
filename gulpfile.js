var
gulp = require('gulp'),
gutil = require('gulp-util'),
rename = require('gulp-rename'),
uglify = require('gulp-uglify');

gulp.task('default', function () {
	gulp.src('source/**/polyfill.js')
		.pipe(rename({ suffix: '.min' }))
		.pipe(uglify({ outSourceMap: true }))
		.pipe(gulp.dest('source'));
});
