const gulp = require("gulp");
const nib = require("nib");
const stylus = require("gulp-stylus");
const cssmin = require("gulp-cssmin");
const rename = require("gulp-rename");
const plumber = require("gulp-plumber");
const bootstrap = require("bootstrap-styl");
const source = require('vinyl-source-stream');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const browserify = require('browserify');

gulp.task("default", ["copyStaticFiles", "image", "fonts", "js", "stylus", "watch"]);

//Static_task

gulp.task("copyStaticFiles", function () {
    return gulp.src("./src/*.html")
        .pipe(gulp.dest("./public"))
});


//Styles_task

gulp.task("stylus", function () {
    return gulp
        .src("./src/styl/index.styl")
        .pipe(plumber())
        .pipe( stylus({
            compress: true,
            use: [nib(), bootstrap()]
        }))
        .pipe(cssmin())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest('./public/css/'));
});

//Image_compress_task

gulp.task("image", function () {
    gulp.src('./src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./public/img/'));
});


gulp.task("fonts", function () {
    gulp.src('./src/fonts/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./public/fonts/'));
});

//Compiling_JS_task

gulp.task('js', function() {
    gulp.src('./src/scripts/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./public/js/'))
});

//Watch_task

gulp.task("watch", function () {
    gulp.watch('./src/**/*.styl', ['stylus']);
    gulp.watch(['src/scripts/*.js'], ['js']);
    gulp.watch('src/*.html', ['copyStaticFiles']);
});

