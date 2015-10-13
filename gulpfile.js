var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

gulp.task('build', function() {
  browserify({
    entries: './app.js',
    extensions: ['.js'],
    debug: true
  })
  .bundle()
  .pipe(source('build.js'))
  .pipe(gulp.dest('./'))
})
