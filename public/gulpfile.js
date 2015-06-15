var gulp = require('gulp');
var connect = require('gulp-connect');
var livereload = require('gulp-livereload');

gulp.task('connect', function () {
    connect.server({
        port: 3000,
        livereload: true
    });
});

gulp.task('html', function () {
    gulp.src('*.html')
        .pipe(connect.reload());
});

gulp.task('style', function () {
    gulp.src('style/*.css')
        .pipe(connect.reload());
});

gulp.task('js', function () {
    gulp.src('js/*.js')
        .pipe(connect.reload());
});

gulp.task('watch', function () {
    gulp.watch('*.html', ['html']);
    gulp.watch('style/*.css', ['style']);
    gulp.watch('js/*.js', ['js'])
});

gulp.task('default', ['html', 'style', 'js', 'connect', 'watch']);