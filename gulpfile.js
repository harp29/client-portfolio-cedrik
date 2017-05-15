var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var relod = browserSync.reload;

var SOURCEPATHS = {

  sassSource : 'src/scss/*.scss'
}

var APPPATH = {
  root: 'app/',
  css : 'app/css',
  js : 'app/js'
}

//sass/scss task
gulp.task('sass', function(){
  return gulp.src(SOURCEPATHS.sassSource)
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

//faster sass processing on the fly with - watch
gulp.task('watch', ['serve', 'sass'], function(){
  gulp.watch([SOURCEPATHS.sassSource], ['sass']);
})


//default task - make it run our sass and serve - call watch
gulp.task('default', ['watch']);
