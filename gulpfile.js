'use strict';

var gulp = require('gulp'),
  prefixer = require('gulp-autoprefixer'),
  uglify = require('gulp-uglify'),
  sass = require('gulp-sass'),
  concatCss = require('gulp-concat-css'),
  concatJs = require('gulp-concat'),
  sourcemaps = require('gulp-sourcemaps'),
  rigger = require('gulp-rigger'),
  cleanCSS = require('gulp-clean-css'),
  replace = require('gulp-string-replace'),
  imagemin = require('gulp-imagemin'),
  rimraf = require('rimraf'),
  browserSync = require("browser-sync"),
  reload = browserSync.reload;

var path = {
  build: {
    html: 'build/',
    js: 'build/js/',
    css: 'build/css/',
    img: 'build/img/',
    fonts: 'build/fonts/'
  },
  src: {
    html: 'src/*.html',
    js: 'src/js/*.js',
    style: 'src/style/*.scss',
    img: 'src/img/**/*.*',
    fonts: 'src/fonts/**/*.*',
    css: 'build/css/*.css'
  },
  clean: './build'
};

var config = {
  server: {
    baseDir: "./build"
  },
  tunnel: true,
  host: 'localhost',
  port: 9013,
  logPrefix: "Logotype test web page"
};

gulp.task('html:build', function () {
  gulp.src(path.src.html)
    .pipe(rigger())
    .pipe(gulp.dest(path.build.html))
    .pipe(reload({stream: true}));
});

gulp.task('js:build', function () {
  return gulp.src([path.src.js,
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/popper.js/dist/umd/popper.min.js',
    'node_modules/bootstrap/dist/js/bootstrap.min.js'])
    .pipe(rigger())
    .pipe(sourcemaps.init())
    // .pipe(uglify())
    .pipe(sourcemaps.write())
    // .pipe(concatJs('scripts.js'))
    .pipe(gulp.dest(path.build.js))
    .pipe(reload({stream: true}));
});

gulp.task('style:build', function () {
  return gulp.src([
    'node_modules/bootstrap/dist/css/bootstrap.css',
    path.src.style])
    .pipe(sourcemaps.init())
    .pipe(sass({compress: true}))
    .pipe(prefixer())
    .pipe(cleanCSS())
    .pipe(sourcemaps.write())
    .pipe(concatCss("style.css"))
    .pipe(gulp.dest(path.build.css))
    .pipe(reload({stream: true}));
});

gulp.task('css:replace', function () {
  gulp.src(path.src.css)
    .pipe(replace('"/fonts/Acrom/Acrom.otf"', '"../fonts/Acrom/Acrom.otf"'))
    .pipe(replace('"/fonts/HelveticaNeueCyr/HelveticaNeueMedium.otf"', '"../fonts/HelveticaNeueCyr/HelveticaNeueMedium.otf"'))
    .pipe(gulp.dest(path.build.css))
    .pipe(reload({stream: true}));
});

gulp.task('image:build', function () {
  gulp.src(path.src.img)
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      interlaced: true
    }))
    .pipe(gulp.dest(path.build.img))
    .pipe(reload({stream: true}));
});

gulp.task('fonts:build', function () {
  gulp.src(path.src.fonts)
    .pipe(gulp.dest(path.build.fonts))
});

gulp.task('build', [
  'html:build',
  'js:build',
  'style:build',
  'fonts:build',
  'image:build'
]);

gulp.task('webserver', function () {
  browserSync(config);
});

gulp.task('clean', function (cb) {
  rimraf(path.clean, cb);
});

gulp.task('default', ['build']);
