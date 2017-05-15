var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var autoprefixer = require('gulp-autoprefixer');
var clean = require('gulp-clean');

//src folder/directory
var SOURCEPATHS = {

  sassSource : 'src/scss/*.scss',
  htmlSource : 'src/*.html',
  jsSource   : 'src/js/**'

}

//app folder/directory
var APPPATH = {

  root: 'app/',
  css : 'app/css',
  js : 'app/js'

}

//clean - delete file if not in src directory
gulp.task('clean-html', function(){
  return gulp.src(APPPATH.root + '/*.html',
    {read : false, force : true})
  .pipe(clean());
});

//clean - delete file if not in src directory
gulp.task('clean-scripts', function(){
  return gulp.src(APPPATH.js + '/*.js',
    {read : false, force : true})
  .pipe(clean());
});

//sass/scss task
gulp.task('sass', function(){
  return gulp.src(SOURCEPATHS.sassSource)
    .pipe(autoprefixer())
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(gulp.dest(APPPATH.css))
});

//copy scripts
gulp.task('scripts', ['clean-scripts'], function(){
  gulp.src(SOURCEPATHS.jsSource)
  .pipe(gulp.dest(APPPATH.js))
})

//copy files and paste them into another directory(app/)
gulp.task('copy', ['clean-html'], function(){
  gulp.src(SOURCEPATHS.htmlSource)
      .pipe(gulp.dest(APPPATH.root))
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
gulp.task('watch', ['serve', 'sass', 'copy', 'clean-html', 'clean-scripts', 'scripts'], function(){
  gulp.watch([SOURCEPATHS.sassSource], ['sass']);
  gulp.watch([SOURCEPATHS.htmlSource], ['copy']);
  gulp.watch([SOURCEPATHS.jsSource], ['scripts']);
})


//default task - make it run our sass and serve - call watch
gulp.task('default', ['watch']);
