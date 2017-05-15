var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var autoprefixer = require('gulp-autoprefixer');

var SOURCEPATHS = {

  sassSource : 'src/scss/*.scss',
  htmlSource : 'src/*.html'

}

var APPPATH = {

  root: 'app/',
  css : 'app/css',
  js : 'app/js'

}

//sass/scss task
gulp.task('sass', function(){
  return gulp.src(SOURCEPATHS.sassSource)
    .pipe(autoprefixer())
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(gulp.dest(APPPATH.css))
});

//faster html processing on the fly
gulp.task('serve', ['sass'], function(){
  browserSync.init([APPPATH.css + '/*.css', APPPATH.root + '/*.html', APPPATH.js + '/*.js'], {
    server : {
      baseDir : APPPATH.root
    }
  })
});

gulp.task('copy', function(){
  gulp.src(SOURCEPATHS.htmlSource)
      .pipe(gulp.dest(APPPATH.root))
})

//faster sass processing on the fly with - watch
gulp.task('watch', ['serve', 'sass', 'copy'], function(){
  gulp.watch([SOURCEPATHS.sassSource], ['sass']);
  gulp.watch([SOURCEPATHS.htmlSource], ['copy']);
})


//default task - make it run our sass and serve - call watch
gulp.task('default', ['watch']);
