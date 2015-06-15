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
    gulp.src('public/*.html')
        .pipe(connect.reload());
});

gulp.task('css', function () {
    gulp.src('public/css/*.css')
        .pipe(connect.reload());
});

gulp.task('js', function () {
    gulp.src('public/js/*.js')
        .pipe(connect.reload());
});

gulp.task('watch', function () {
    gulp.watch('public/*.html', ['html']);
    gulp.watch('public/style/*.css', ['css']);
    gulp.watch('public/js/*.js', ['js'])
});

gulp.task('default', ['html', 'css', 'js', 'connect', 'watch']);