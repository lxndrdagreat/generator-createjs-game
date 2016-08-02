var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var del = require('del');
var runSequence = require('run-sequence');
var cleanCSS = require('gulp-clean-css');
var htmlreplace = require('gulp-html-replace');
var imagemin = require('gulp-imagemin');

gulp.task('clean', function(){
    return del([
        'build/'
    ]);
});

gulp.task('js', function(){
    return gulp.src('./src/js/**/*.js')
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./build/js/'));
});

gulp.task('js:vender', function(){
    return gulp.src([
      './src/vender/jquery/dist/jquery.min.js',
      './src/vender/EaselJS/lib/easeljs-0.8.2.min.js',
      './src/vender/TweenJS/lib/tweenjs-0.6.2.min.js',
      './src/vender/SoundJS/lib/soundjs-0.6.2.min.js'
    ])
    .pipe(concat('vender.min.js'))
    .pipe(gulp.dest('./build/js/'));
});

gulp.task('css', function(){
    return gulp.src('./src/css/**/*.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('./build/css/'));
});

gulp.task('sound', function(){
    return gulp.src('./src/sound/**/*')
    .pipe(gulp.dest('./build/sound/'));
});

gulp.task('images', function(){
    return gulp.src('./src/img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./build/img/'));
});

gulp.task('html', function(){
    return gulp.src('./src/html/**/*.html')
        .pipe(htmlreplace({
            main: 'js/main.min.js',
            vender: 'js/vender.min.js'
        }))
        .pipe(gulp.dest('./build/'));
});

gulp.task('default', function(callback) {
  // place code for your default task here
  runSequence(
    'clean',
    ['js', 'css', 'sound', 'images', 'js:vender'],
    'html',
    callback
    );
});