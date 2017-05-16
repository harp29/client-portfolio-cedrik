var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var browserify = require('gulp-browserify');
var autoprefixer = require('gulp-autoprefixer');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var merge = require('merge-stream');
var newer = require('gulp-newer');
var imagemin = require('gulp-imagemin');
var injectPartials = require('gulp-inject-partials');
var minify = require('gulp-minify');
var rename = require('gulp-rename');
var cssMin = require('gulp-cssmin');

//src folder/directory
var SOURCEPATHS = {

  sassSource : 'src/scss/*.scss',
  htmlSource : 'src/*.html',
  htmlPartialSource : 'src/partial/*.html',
  jsSource   : 'src/js/**',
  imageSource  : 'src/img/**'

}

//app folder/directory
var APPPATH = {

  root: 'app/',
  css : 'app/css',
  js : 'app/js',
  fonts : 'app/fonts',
  img : 'app/img'

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

//copy new image into directory/folder, auto minify images
gulp.task('images', function(){
  return gulp.src(SOURCEPATHS.imageSource)
    .pipe(newer(APPPATH.img))
    .pipe(imagemin())
    .pipe(gulp.dest(APPPATH.img));
})

//move fonts - glyphicons
gulp.task('moveFonts', function(){
  gulp.src('./node_modules/bootstrap/dist/fonts/*.{eot,svg,ttf,woff,woff2}')
      .pipe(gulp.dest(APPPATH.fonts))
})

//copy scripts
gulp.task('scripts', ['clean-scripts'], function(){
  gulp.src(SOURCEPATHS.jsSource)
  .pipe(concat('main.js'))
  .pipe(browserify())
  .pipe(gulp.dest(APPPATH.js))
})

/** Production Tasks **/
//minify scripts
gulp.task('compress', function(){
  gulp.src(SOURCEPATHS.jsSource)
  .pipe(concat('main.js'))
  .pipe(browserify())
    .pipe(minify())
  .pipe(gulp.dest(APPPATH.js))
});

//sass/scss task
gulp.task('compresscss', function(){
  var bootstrapCSS = gulp.src('./node_modules/bootstrap/dist/css/bootstrap.css');
  var sassFiles;


  sassFiles =  gulp.src(SOURCEPATHS.sassSource)
    .pipe(autoprefixer())
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    return merge(sassFiles, bootstrapCSS)
      .pipe(concat('app.css'))
      .pipe(cssMin())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest(APPPATH.css));
});

/** End of Production Tasks **/

//injectPartials Html
gulp.task('html', function(){
  return gulp.src(SOURCEPATHS.htmlSource)
  .pipe(injectPartials())
  .pipe(gulp.dest(APPPATH.root))
})

//copy files and paste them into another directory(app/)
// gulp.task('copy', ['clean-html'], function(){
//   gulp.src(SOURCEPATHS.htmlSource)
//       .pipe(gulp.dest(APPPATH.root))
// });


//faster html processing on the fly
gulp.task('serve', ['sass'], function(){
  browserSync.init([APPPATH.css + '/*.css', APPPATH.root + '/*.html', APPPATH.js + '/*.js'], {
    server : {
      baseDir : APPPATH.root
    }
  })
});


//faster sass processing on the fly with - watch
gulp.task('watch', ['serve', 'sass', 'clean-html', 'clean-scripts',
'scripts', 'moveFonts', 'images', 'html'], function(){
  gulp.watch([SOURCEPATHS.sassSource], ['sass']);
  // gulp.watch([SOURCEPATHS.htmlSource], ['copy']);
  gulp.watch([SOURCEPATHS.jsSource], ['scripts']);
  gulp.watch([SOURCEPATHS.htmlSource, SOURCEPATHS.htmlPartialSource], ['html']);
})


//default task - make it run our sass and serve - call watch
gulp.task('default', ['watch']);
