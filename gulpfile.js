'use strict';

var gulp = require('gulp'),
    es2015 = require('babel-preset-es2015'),
    plugins = require('gulp-load-plugins')();

var publishDir = 'web/dist';

gulp.task('less', function() {
    return gulp.src('compile/less/common.less')
        .pipe(plugins.less()) // 把less转成css
        .pipe(plugins.concatCss('main.min.css')) // 把所有css文件合成一个 main.min.css文件
        .pipe(plugins.cssnano()) // 对css文件压缩
        .pipe(plugins.autoprefixer()) // 自动添加浏览器前缀
        .pipe(gulp.dest(publishDir + '/css'))
})

gulp.task('scripts', function() {
    return gulp.src('compile/script/**/*.js')
        .pipe(plugins.babel({ presets: [es2015] })) // 把es6 => es5
        .pipe(plugins.concat('main.min.js')) // 把所有js文件合成一个 main.min.js文件
        // .pipe(plugins.jshint()) // 检查js文件
        // .pipe(plugins.jshint.reporter('default')) // 对代码进行报错提示
        .pipe(plugins.uglify().on('error', plugins.util.log)) // 对js文件压缩
        .pipe(gulp.dest(publishDir + '/js'))
})

gulp.task('clean-bower-files', function() {
    return gulp.src(publishDir + '/bower/*', { read: false })
        .pipe(plugins.clean({ force: true }))
})

gulp.task('bower-files', function() {
    return gulp.src('bower.json')
        .pipe(plugins.mainBowerFiles({
            overrides: {
                "bootstrap": {
                    main: [
                        'dist/**/*.min.*'
                    ]
                },
                "jquery": {
                    main: [
                        'dist/*.min.js'
                    ]
                }
            }
        }))
        .pipe(gulp.dest(publishDir + '/bower'))
})

gulp.task('default',
    gulp.series(
        gulp.parallel('less', 'scripts'),
        function watcher() {
            gulp.watch('compile/script/**/*.js', gulp.parallel('scripts'));
            gulp.watch('compile/less/**/*.less', gulp.parallel('less'));
        }
    )
)

gulp.task('bower', gulp.series('clean-bower-files', gulp.parallel('bower-files')))