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

/**
 * gulp-cache 缓存
 * gulp-imagemin 压缩图片
 * optimizationLevel(Number) 默认：3  取值范围：0-7（优化等级）
 * progressive(Boolean)  默认：false 无损压缩jpg图片
 * interlaced(Boolean)  默认：false 隔行扫描gif进行渲染
 * multipass(Boolean)  默认：false 多次优化svg直到完全优化
 * verbose(Boolean) 是否输出详细信息
 */
task('imagemin', function () {
    return src('origin_images/**/*.*')
        .pipe(plugins.cache(plugins.imagemin(
            [plugins.imagemin.optipng({ optimizationLevel: 7 })],
            { verbose: false }
        )))
        .pipe(dest(publishDir + '/images'))
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
                },
                "fancybox": {
                    main: [
                        'dist/*.min.*'
                    ]
                },
                "masonry-layout": {
                    main: [
                        'dist/*.min.*'
                    ]
                },
                "imagesloaded": {
                    main: [
                        '*.min.*'
                    ]
                },
                "searchable-list": {
                    main: [
                        '*.css',
                        '*.js'
                    ]
                }
            }
        }))
        .pipe(dest(publishDir + '/bower'))
})

task('default',
    series(
        parallel('less', 'scripts', 'imagemin'),
        function watcher() {
            watch('compile/script/**/*.js', parallel('scripts'));
            watch('compile/less/**/*.less', parallel('less'));
            watch('origin_images/**/*.*', parallel('imagemin'));
        }
    )
)

task('bower', series('clean-bower-files', parallel('bower-files')))