var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var del = require('del');
var runSequence = require('run-sequence');
var cleanCSS = require('gulp-clean-css');
var htmlreplace = require('gulp-html-replace');
var imagemin = require('gulp-imagemin');

var dirs = {
    src: './src',
    dist: './dist',
    dev: './.dev_temp'
};

var buildType = 'dev';

gulp.task('clean', function(){
    if (buildType === 'dev'){
        return del([
            dirs.dev
        ]);    
    }
    else if (buildType === 'dist'){
        return del([
            dirs.dist
        ]);
    }
});

gulp.task('js', function(){
    if (buildType === 'dev'){
        return gulp.src(dirs.src+'/js/**/*.js')
        .pipe(gulp.dest(dirs.dev+'/js/'));
    }
    else if (buildType === 'dist'){
        return gulp.src(dirs.src+'/js/**/*.js')
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(dirs.dist+'/js/'));
    }
});

// concat 3rd part libraries
gulp.task('js:vender', function(){
    if (buildType === 'dist'){
        return gulp.src([
          dirs.src+'/vender/jquery/dist/jquery.min.js',
          dirs.src+'/vender/EaselJS/lib/easeljs-0.8.2.min.js',
          dirs.src+'/vender/TweenJS/lib/tweenjs-0.6.2.min.js',
          dirs.src+'/vender/SoundJS/lib/soundjs-0.6.2.min.js'
        ])
        .pipe(concat('vender.min.js'))
        .pipe(gulp.dest(dirs.dist+'/js/'));
    }
    else if (buildType === 'dev'){
        return gulp.src([
          dirs.src+'/vender/jquery/dist/jquery.min.js',
          dirs.src+'/vender/EaselJS/lib/easeljs-0.8.2.min.js',
          dirs.src+'/vender/TweenJS/lib/tweenjs-0.6.2.min.js',
          dirs.src+'/vender/SoundJS/lib/soundjs-0.6.2.min.js'
        ])
        .pipe(gulp.dest(dirs.dev+'/vender/'));
    }
});

// stylesheets
gulp.task('css', function(){
    if (buildType === 'dist'){
        return gulp.src(dirs.src+'/css/**/*.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest(dirs.dist+'/css/'));
    }
    else if (buildType === 'dev'){
        return gulp.src(dirs.src+'/css/**/*.css')        
        .pipe(gulp.dest(dirs.dev+'/css/'));
    }
});

// sound resources
gulp.task('sound', function(){
    var d = (buildType === 'dev' ? dirs.dev : dirs.dist) + '/sound/';
    return gulp.src(dirs.src+'/sound/**/*')
    .pipe(gulp.dest(d));
});

// image resources
gulp.task('images', function(){
    var d = (buildType === 'dev' ? dirs.dev : dirs.dist) + '/img/';
    return gulp.src(dirs.src+'/img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest(d));
});

// HTML files
gulp.task('html', function(){
    if (buildType === 'dev'){
        return gulp.src(dirs.src+'/html/**/*.html')
        .pipe(gulp.dest(dirs.dev+'/'));
    }
    else if (buildType === 'dist'){
        return gulp.src(dirs.src+'/html/**/*.html')
        .pipe(htmlreplace({
            main: 'js/main.min.js',
            vender: 'js/vender.min.js'
        }))
        .pipe(gulp.dest(dirs.dist+'/'));
    }

});

// dev watcher tasks
gulp.task('dev:watch', function(){
    gulp.watch(dirs.src+'/html/**/*.html', ['html']);
    gulp.watch(dirs.src+'/js/**/*.js', ['js']);
    gulp.watch(dirs.src+'/css/**/*.css', ['css']);
    gulp.watch(dirs.src+'/img/**/*.*', ['images']);
    gulp.watch(dirs.src+'/sound/**/*.*', ['sound']);
});

// primary development task
gulp.task('dev', function(callback){
    runSequence(
        'clean',
        ['js', 'css', 'sound', 'images', 'js:vender'],
        'html',
        'dev:watch',
        callback
        );
});

// distribution task
gulp.task('dist', function(callback){
    buildType = 'dist';

    runSequence(
        'clean',
        ['js', 'css', 'sound', 'images', 'js:vender'],
        'html',
        callback
        );
});

// alias for distribute
gulp.task('release', function(callback) {
  runSequence(
    'dist',
    callback
    );
});

// alias for distribute
gulp.task('build', function(callback) {
  runSequence(
    'dist',
    callback
    );
});

// default task is "dev"
gulp.task('default', function(callback) {
  runSequence(
    'dev',
    callback
    );
});