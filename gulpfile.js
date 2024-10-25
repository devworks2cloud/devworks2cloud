const gulp = require('gulp');
const pug = require('gulp-pug');
const concat = require('gulp-concat');
const rimraf = require('rimraf');
const sass = require('sass');
const gulpSass = require('gulp-sass')(sass);
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const perfectionist = require('perfectionist');
const rename = require('gulp-rename');
const minify = require('gulp-clean-css');
const notify = require('gulp-notify');
const server = require('browser-sync').create();

// Paths
var Paths = {
    DIST: 'dist',
    PUG: 'app/*.pug',
    JS: 'app/assets/js/custom/',
    B_JS: 'app/assets/js/bootstrap/',
    CSS: 'app/assets/css/',
    PHP: 'app/assets/php/',
    IMG: 'app/assets/images/',
    FONTS: 'app/assets/fonts/**/*.*',
    VIDEO: 'app/assets/video/**/*.*'
};

gulp.task('compile:pug', function () {
    return gulp.src('app/*.pug')
        .pipe(pug())
        .pipe(gulp.dest('dist'));
});

gulp.task('compile:sass', function () {
    var processors = [
        autoprefixer(),
        perfectionist({
            maxAtRuleLength: false,
            maxSelectorLength: 1
        })
    ];

    return gulp.src('app/assets/scss/template.scss')
        .pipe(gulpSass().on('error', gulpSass.logError))
        .pipe(postcss(processors))
        .pipe(gulp.dest('dist/assets/css/'))
        .pipe(minify({ keepBreaks: false }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist/assets/css/'));
});

gulp.task('copy:jquery', function () {
    return gulp.src([
        Paths.JS + 'jquery.min.js',
        Paths.JS + 'popper.min.js',
    ])
        .pipe(gulp.dest(Paths.DIST + '/assets/js/custom/'));
});

gulp.task('copy:plugins', function () {
    return gulp.src([
        Paths.JS + 'appear.js',
        Paths.JS + 'gmap3.js',
        Paths.JS + 'imagesloaded.pkgd.js',
        Paths.JS + 'isotope.pkgd.js',
        Paths.JS + 'jqBootstrapValidation.js',
        Paths.JS + 'jquery.superslides.js',
        Paths.JS + 'jquery.fitvids.js',
        Paths.JS + 'jquery.magnific-popup.js',
        Paths.JS + 'jquery.easypiechart.js',
        Paths.JS + 'owl.carousel.js',
        Paths.JS + 'twitterFetcher.js',
        Paths.JS + 'jquery.countTo.js',
        Paths.JS + 'jquery.sticky-kit.js',
        Paths.JS + 'jquery.singlePageNav.js',
        Paths.JS + 'jarallax.js',
        Paths.JS + 'jarallax-video.js',
        Paths.JS + 'submenu-fix.js',
        Paths.JS + 'prism.js',
    ])
        .pipe(gulp.dest(Paths.DIST + '/assets/js/custom/'))
        .pipe(concat('plugins.js'))
        .pipe(gulp.dest(Paths.DIST + '/assets/js/custom/'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(Paths.DIST + '/assets/js/custom/'));
});

gulp.task('copy:bootstrap', function () {
    return gulp.src([Paths.B_JS + '*.js', Paths.B_JS + '*.map'])
        .pipe(gulp.dest(Paths.DIST + '/assets/js/bootstrap/').on('error', notify.onError()));
});

gulp.task('copy:js-core', function () {
    return gulp.src(Paths.JS + 'custom.js')
        .pipe(gulp.dest(Paths.DIST + '/assets/js/custom/').on('error', notify.onError()))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(Paths.DIST + '/assets/js/custom/'));
});

gulp.task('copy:mainJS', function () {
    return gulp.src(Paths.JS + 'main.js')
        .pipe(gulp.dest(Paths.DIST + '/assets/js/custom').on('error', notify.onError()))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(Paths.DIST + '/assets/js/custom'));
});

gulp.task('copy:css', function () {
    return gulp.src(Paths.CSS + '*.css')
        .pipe(gulp.dest(Paths.DIST + '/assets/css/'))
        .pipe(concat('plugins.css'))
        .pipe(minify({ keepBreaks: false }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(Paths.DIST + '/assets/css/'));
});

gulp.task('copy:images', function () {
    return gulp.src(Paths.IMG + '**/*.*')
        .pipe(gulp.dest(Paths.DIST + '/assets/images/'));
});

gulp.task('copy:fonts', function () {
    return gulp.src(Paths.FONTS)
        .pipe(gulp.dest(Paths.DIST + '/assets/fonts/'));
});

gulp.task('copy:video', function () {
    return gulp.src(Paths.VIDEO)
        .pipe(gulp.dest(Paths.DIST + '/assets/video/'));
});

gulp.task('copy:php', function () {
    return gulp.src(Paths.PHP + '*.php')
        .pipe(gulp.dest(Paths.DIST + '/assets/php/'));
});

function reload(done) {
    server.reload();
    done();
}

function serve(done) {
    if (process.env.NODE_ENV === 'development') {
        server.init({
            server: {
                baseDir: 'dist/'
            }
        });
    }
    done();
}

gulp.task('watch', function () {
    gulp.watch('app/**/*.pug', gulp.series('compile:pug', reload));
    gulp.watch('app/assets/scss/**/*.scss', gulp.series('compile:sass', reload));
    gulp.watch(Paths.JS + '*.js', gulp.series('copy:jquery', reload));
    gulp.watch(Paths.B_JS + '*.js', gulp.series('copy:bootstrap', reload));
    gulp.watch(Paths.JS + '*.js', gulp.series('copy:plugins', reload));
    gulp.watch(Paths.JS + 'custom.js', gulp.series('copy:js-core', reload));
    gulp.watch(Paths.JS + 'main.js', gulp.series('copy:mainJS', reload));
    gulp.watch(Paths.CSS + '*.css', gulp.series('copy:css', reload));
    gulp.watch(Paths.IMG + '**/*.*', gulp.series('copy:images', reload));
    gulp.watch(Paths.VIDEO + '*.*', gulp.series('copy:video', reload));
    gulp.watch(Paths.FONTS, gulp.series('copy:fonts', reload));
    gulp.watch(Paths.PHP + '*.php', gulp.series('copy:php', reload));
});

const dev = gulp.series(
    'compile:pug',
    'compile:sass',
    'copy:jquery',
    'copy:bootstrap',
    'copy:plugins',
    'copy:js-core',
    'copy:mainJS',
    'copy:css',
    'copy:images',
    'copy:fonts',
    'copy:video',
    'copy:php',
    serve,
    reload,
    'watch'
);

exports.default = dev;

gulp.task('clean', function (cb) {
    rimraf(Paths.DIST + '/*', cb);
});