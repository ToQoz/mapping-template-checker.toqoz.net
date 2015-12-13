var path = require('path');

var gulp = require('gulp');
var source = require('vinyl-source-stream');
var webserver = require('gulp-webserver');
var browserify = require('browserify');
var sass = require('gulp-sass');
var jade = require("gulp-jade");

gulp.task('javascripts', function() {
  var bundler = browserify({
      entries: ['./javascripts/app.js'],
  });
  bundler
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('public/javascripts/'));
});

gulp.task('images', function() {
  gulp.src("images/*")
    .pipe(gulp.dest("public/images"));
});

gulp.task('jade', function() {
  gulp.src("views/*.jade", {base: './views'})
    .pipe(jade())
    .pipe(gulp.dest("public"));
});

gulp.task('sass', function() {
  gulp.src('stylesheets/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('public/stylesheets'));
});

gulp.task('build', ['javascripts', 'images', 'jade', 'sass']);

gulp.task('serve', function() {
  setTimeout(function() {
    gulp.src('public')
    .pipe(webserver({
      livereload: false,
      directoryListing: false,
      open: true,
      middleware: function(req, res, next) {
        var basename = path.basename(req.url);
        var extname = path.extname(req.url);

        if (basename && basename !== "/" && !extname) {
          // like the github page
          req.url += ".html";
        }
        next();
      },
    }));
  }, 1000);
});
