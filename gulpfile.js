"use strict";

let gulp       = require("gulp"),
    typescript = require("typescript"),
    ts         = require("gulp-typescript"),
    browserify = require("browserify"),
    source     = require("vinyl-source-stream"),
    del        = require("del"),
    sass       = require("gulp-sass");

let project = ts.createProject("tsconfig.json", {typescript: typescript});

gulp.task("scss", function () {
    return gulp.src("./assets/scss/**/*.scss")
               .pipe(sass().on("error", sass.logError))
               .pipe(gulp.dest("./web/css"));
});

gulp.task("images", function () {
    gulp.src("./assets/images/**/*")
        //        .pipe(imagemin())
        .pipe(gulp.dest("./web/images"))
});

gulp.task("fonts", function () {
    gulp.src("./assets/fonts/**/*")
        .pipe(gulp.dest("./web/fonts"))
});

gulp.task("html", function () {
    return gulp
    .src(["assets/index.html"])
    .pipe(gulp.dest("web"));
});

gulp.task("compile", function () {
    let result = gulp.src("src/**/*.{ts,tsx}")
                     .pipe(ts(project));
    return result.js.pipe(gulp.dest(".tmp"));
});

gulp.task("bundle", ["compile"], function () {
    let b = browserify(".tmp/client/index.js");
    return b.bundle()
            .pipe(source("bundle.js"))
            .pipe(gulp.dest("web"));
});

gulp.task("build", ["html", "bundle", "scss", "images", "fonts"], function () {
});

gulp.task("clean", function (done) {
    del([".tmp"], done.bind(this));
});

gulp.task("watch", ["build"], function () {
    gulp.watch("./src/**/*", ["bundle"]);
    gulp.watch("./assets/*.html", ["html"]);
    gulp.watch("./assets/scss/*", ["scss"]);
    gulp.watch("./assets/images/*", ["images"]);
});

//'use strict';
//let gulp       = require('gulp');
//let uglify     = require('gulp-uglify');
//let concat     = require('gulp-concat');
//let ts         = require('gulp-typescript');
//let htmlmin    = require('gulp-htmlmin');
//let browserify = require('browserify');
//let source     = require('vinyl-source-stream');
//let tsify      = require('tsify');
//let sass       = require('gulp-sass');
//
//gulp.task('sass', function () {
//    return gulp.src('./assets/sass/**/*.scss')
//        .pipe(sass().on('error', sass.logError))
//        .pipe(gulp.dest('./web/css'));
//});
//
//gulp.task('images', function () {
////    gulp.src('./images/**/*')
////        .pipe(imagemin())
////        .pipe(gulp.dest('./public/images'))
//
//});
//
//gulp.task('html', function () {
//    return gulp.src('assets/*.html')
//        .pipe(htmlmin({collapseWhitespace: true}))
//        .pipe(gulp.dest('web'));
//});
//
//let serverProject = ts.createProject('tsconfig.json', { noImplicitAny: false });
//
//gulp.task('client', function () {
//    return browserify({
//        basedir     : '.',
//        debug       : true,
//        entries     : ['src/client.tsx'],
//        cache       : {},
//        packageCache: {}
//    })
//        .plugin(tsify)
//        .bundle()
//        .pipe(source('index.js'))
//        .pipe(gulp.dest('web'));
//});
//
//gulp.task('server', function () {
////    return gulp.src('src/**/*.ts')
////        .pipe(ts({
//////        noImplicitAny: true,
////            module          : 'commonjs',
////            target          : 'ES6',
////            moduleResolution: 'node',
////            outFile         : 'index.js'
////        }))
////        .pipe(gulp.dest('dist'));
//
//    let tsResult = gulp.src("src/**/*.ts") // or tsProject.src()
//        .pipe(serverProject());
//
//    return tsResult.js.pipe(gulp.dest('dist'));
//});
//
//gulp.task('compile', ['client', 'server'], () => true);
//
//gulp.task('build', ['compile', 'sass', 'images', 'html'], function () {
//
//});
//
//gulp.task('watch', ['build'], function () {
//    gulp.watch('./src/*', ['compile']);
//    gulp.watch('./assets/*.html', ['html']);
//    gulp.watch('./assets/sass/*', ['sass']);
//    gulp.watch('./assets/images/*', ['images']);
//});
