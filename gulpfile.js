// 获取 gulp
var gulp = require('gulp');

// 获取 uglify 模块（用于压缩 JS）
var uglify = require('gulp-uglify');

// 获取 minify-css 模块（用于压缩 CSS）
var cleanCSS = require('gulp-clean-css');

//重新编译被修改的文件
var watchPath = require('gulp-watch-path');
var combiner = require('stream-combiner2');

var autoprefixer = require('gulp-autoprefixer');

var gutil = require('gulp-util');

// 用stream-combiner2 捕获错误信息
var handleError = function (err) {
    var colors = gutil.colors;
    console.log('\n')
    gutil.log(colors.red('Error!'))
    gutil.log('fileName: ' + colors.red(err.fileName))
    gutil.log('lineNumber: ' + colors.red(err.lineNumber))
    gutil.log('message: ' + err.message)
    gutil.log('plugin: ' + colors.yellow(err.plugin))
}

gulp.task('watchjs', function () {
    gulp.watch('js/*.js', function (event) {
        var paths = watchPath(event, 'js/', 'dist/js/')
        /*
        paths
            { srcPath: 'src/js/log.js',
              srcDir: 'src/js/',
              distPath: 'dist/js/log.js',
              distDir: 'dist/js/',
              srcFilename: 'log.js',
              distFilename: 'log.js' }
        */
        gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath)
        gutil.log('Dist ' + paths.distPath)

        var combined = combiner.obj([
            gulp.src(paths.srcPath),
            uglify(),
            gulp.dest(paths.distDir)
        ])

        combined.on('error', handleError)
    })
})

gulp.task('uglifyjs', function () {
    var combined = combiner.obj([
        gulp.src('js/*.js'),
        uglify(),
        gulp.dest('dist/js/')
    ])
    combined.on('error', handleError)
})


gulp.task('watchcss', function () {
    gulp.watch('css/*.css', function (event) {
        var paths = watchPath(event, 'css/', 'dist/css/')

        gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath)
        gutil.log('Dist ' + paths.distPath)

        gulp.src(paths.srcPath)
            .pipe(autoprefixer({
              browsers: 'last 2 versions'
            }))
            .pipe(cleanCSS())
            .pipe(gulp.dest(paths.distDir))
    })
})

gulp.task('cleanCSS', function () {
    gulp.src('css/*.css')
        .pipe(autoprefixer({
          browsers: 'last 2 versions'
        }))
        .pipe(cleanCSS({
            keepSpecialComments: '*'
        }))
        .pipe(gulp.dest('dist/css/'))
})

gulp.task('default', [
    // build
    'uglifyjs', 'cleanCSS',
    // watch
    'watchjs', 'watchcss'
    ]
)