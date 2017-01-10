var gulp        = require('gulp');
var sass        = require('gulp-sass');
var prefix      = require('gulp-autoprefixer');
var cssFiles    = '';
var sassFiles   = ['*.scss'];

var displayError = function(error) {
    var errorString = '[' + error.plugin + ']';
    errorString += ' ' + error.message.replace("\n",'');
    if(error.fileName)
        errorString += ' in ' + error.fileName;

    if(error.lineNumber)
        errorString += ' on line ' + error.lineNumber;

    console.error(errorString);
}

gulp.task('serve', ['sass'], function() {
    gulp.watch(sassFiles, ['sass']);
});

gulp.task('sass', function() {
    gulp.src(sassFiles)
    .pipe(sass({
        outputStyle: 'compressed',
        includePaths : sassFiles
    }))
    .on('error', function(err){
        displayError(err);
    })
    .pipe(prefix(
        'last 2 version', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'
    ))
    .pipe(gulp.dest(cssFiles))
});


gulp.task('default', ['serve'], function() {
    gulp.watch(sassFiles)
    .on('change', function(evt) {
        console.log('[watcher] File ' + evt.path.replace(/.*(?=sass)/,'') + ' was ' + evt.type + ', compiling...');
    });
});