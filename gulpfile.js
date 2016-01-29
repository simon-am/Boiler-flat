require('es6-promise').polyfill();

var gulp = require('gulp'),
    mainBowerFiles = require('main-bower-files'),
    gutil = require('gulp-util'),
    del = require('del'),
    concat = require('gulp-concat'),
    bourbon = require('node-bourbon')

   
// plugins that loads all the dependecies that start with 'gulp- or gulp_' in package.json to plugins.PLUGINNAME(), like gulp-autoprefixer to plugins.autoprefixer()
var plugins = require('gulp-load-plugins')({ 
    pattern: ['gulp-*', 'gulp.*'],
    replaceString: /\bgulp[\-.]/
});

var env = {
    dev: 'dev',
    build: 'build'
};

var changeEvent = function(evt) {
    gutil.log('File', gutil.colors.cyan(evt.path.replace(new RegExp('/.*(?=/' + env.dev.src + ')/'), '')), 'was', gutil.colors.magenta(evt.type));
};

// compile sass to css and add prefixer
var sass = function () {
  gulp.src(env.dev+'/styles/main.scss')
    
    .pipe(plugins.sass({
        includePaths: bourbon.includePaths
    }))
    .pipe(plugins.autoprefixer('last 2 versions'))
    .pipe(gulp.dest(env.build+'/styles'));
};

gulp.task('sass', ['clean'], sass);
gulp.task('sass-watch', sass);



// delete build subfolders
gulp.task('clean', function () {
    return del([
        env.build+'/fonts',
        env.build+'/images',
        env.build+'/scripts',
        env.build+'/styles',
        env.build+'/videos'
    ]);
});

var copy = function() {
    gulp.src('fonts/**/*.*', {cwd: env.dev})
    .pipe(gulp.dest(env.build+'/fonts'));
    
    gulp.src('images/**/*.*', {cwd: env.dev})
    .pipe(gulp.dest(env.build+'/images'));
    
    gulp.src('videos/**/*.*', {cwd: env.dev})
    .pipe(gulp.dest(env.build+'/videos'));
    
    gulp.src('scripts/**/*.*', {cwd: env.dev})
    .pipe(gulp.dest(env.build+'/scripts'));
};
gulp.task('copy', ['clean'], copy);
gulp.task('copy-watch', copy);

// minify image
gulp.task('imagemin', ['clean'], function() {
 gulp.src('images/**/*.*', {cwd: env.build})
 .pipe(plugins.imagemin())
 .pipe(gulp.dest(env.build + 'images/'));
});

// minify css
gulp.task('minify-css', function() {
  return gulp.src([env.build+'/styles/*.css', '!'+env.build+'/styles/*.min.css'])
    .pipe(plugins.minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest(env.build));
});

// find plugin.js in bower_component and compile them all in one file called 'libs'
var libs = function() {
    return gulp.src(mainBowerFiles())
        .pipe(plugins.filter('*.js'))
        .pipe(plugins.concatSourcemap('libs.js'))
        .pipe(gulp.dest(env.build+'/scripts'));
};
gulp.task('libs', ['clean'], libs);
gulp.task('libs-watch', libs);

 


// watch changes in assigned folders, and trigger actions accordingly
gulp.task('watch', ['clean', 'sass', 'copy', 'libs'], function() {
    gulp.watch(env.dev+'/styles/**/*.{scss,sass}', ['sass-watch']);
    gulp.watch(env.dev+'/images/**/*.*', ['copy-watch']);
    gulp.watch(env.dev+'/fonts/**/*.*', ['copy-watch']);
    gulp.watch(env.dev+'/videos/**/*.*', ['copy-watch']);
    gulp.watch(env.dev+'/scripts/**/*.js', ['copy-watch', 'libs-watch']);
});

gulp.task('serve', ['clean',  'sass', 'copy', 'libs', 'watch']);
gulp.task('build', ['clean',  'sass', 'copy', 'libs', 'minify-css', 'compress']);