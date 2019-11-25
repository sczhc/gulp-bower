'use strict';

var { task, src, dest, series, parallel, watch } = require('gulp'),
    es2015 = require('babel-preset-es2015'),
    plugins = require('gulp-load-plugins')();

var publishDir = 'web/dist';

task('less', function () {
    return src('compile/less/common.less')
        .pipe(plugins.less()) // 把less转成css
        .pipe(plugins.concat('main.min.css')) // 把所有css文件合成一个 main.min.css文件
        .pipe(plugins.autoprefixer()) // 自动添加浏览器前缀
        .pipe(plugins.cssnano()) // 对css文件压缩
        .pipe(dest(publishDir + '/css'))
})

task('scripts', function () {
    return src('compile/script/**/*.js')
        .pipe(plugins.babel({ presets: [es2015] })) // 把es6 => es5
        .pipe(plugins.concat('main.min.js')) // 把所有js文件合成一个 main.min.js文件
        .pipe(plugins.uglify().on('error', plugins.util.log)) // 对js文件压缩
        .pipe(dest(publishDir + '/js'))
})

task('clean-bower-files', function () {
    return src(publishDir + '/bower/*', { read: false })
        .pipe(plugins.clean({ force: true }))
})

task('bower-files', function () {
    return src('bower.json')
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
        .pipe(dest(publishDir + '/bower'))
})

task('default',
    series(
        parallel('less', 'scripts'),
        function watcher() {
            watch('compile/script/**/*.js', parallel('scripts'));
            watch('compile/less/**/*.less', parallel('less'));
        }
    )
)

task('bower', series('clean-bower-files', parallel('bower-files')))