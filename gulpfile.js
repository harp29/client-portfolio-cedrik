var gulp = require('gulp');
var sass = require('gulp-sass');


//sass/scss task
gulp.task('sass', function(){
  return gulp.src('src/scss/app.scss')
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(gulp.dest('app/css'))
});

//default task - make it run our sass
gulp.task('default', ['sass']);
