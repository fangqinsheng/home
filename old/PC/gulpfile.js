/**
 * @description: welshine商城前台配置文件
 * @author: 钦昇
 * @create: 2019-06-15
 * @update: 2019-08-21
 */
"use strict";

const gulp = require("gulp"),                      // gulp4.0+
    Config = require("./build/Config"),            // 路径
    htmlptl = require("gulp-html-tpl"),            // html模板
    artTemplate = require("art-template"),         // ???
    sass = require("gulp-sass"),                   // sass预处理器
    csso = require("gulp-csso"),                   // css压缩
    auto = require("gulp-autoprefixer"),           // css自动补齐
    imagemin = require("gulp-imagemin"),           // 图片压缩
    concat = require("gulp-concat"),               // 合并
    watch = require("gulp-watch"),                 // 监听
    cache = require("gulp-cache"),                 // ???
    del = require("del"),                          // 清楚文件
    browser = require("browser-sync").create(),    // 声场服务器
    reload = browser.reload,                       // 重新加载
    babel = require("gulp-babel");                 // es6转换es5

// 清空输出文件夹
gulp.task("clean", function() {
    return del(Config.dist);
});

// 开启服务器
gulp.task("browser", function() {
    browser.init({
        server: "dist",
        port: 4040
        // proxy: "你的域名或IP"
    });
});

// font字体处理
gulp.task("font", function () {
  return gulp
    .src(Config.font.src)
    .pipe(reload({ stream: true }))
    .pipe(gulp.dest(Config.font.dist))
});

// html模板处理
gulp.task("html", function() {
    return gulp
        .src(Config.html.src)
        .pipe(
            htmlptl({
                tag: "template",
                paths: ["src/components", "src/modules"],
                engine: function(template, data) {
                    return template && artTemplate.compile(template)(data);
                },
                data: {
                    header: false,
                    g2: false
                }
            })
        )
        .pipe(reload({ stream: true }))
        .pipe(gulp.dest(Config.dist));
});

// 页面样式
gulp.task("page:sass", function() {
    return gulp
        .src(Config.sass.page)
        .pipe(sass())
        .pipe(
            auto()
        )
        .pipe(reload({ stream: true }))
        .pipe(gulp.dest(Config.sass.dist));
});

// 组件UI
gulp.task("components:sass", function() {
    return gulp
        .src(Config.sass.components)
        .pipe(sass())
        .pipe(
            auto()
        )
        .pipe(reload({ stream: true }))
        .pipe(gulp.dest(Config.sass.dist));
});

// 处理css
gulp.task("css", function() {
    return gulp
        .src(Config.css.src)
        .pipe(csso())
        .pipe(concat("style.min.css"))
        .pipe(reload({ stream: true }))
        .pipe(gulp.dest(Config.css.dist));
});

// 处理images
gulp.task("images", function() {
    return gulp
        .src(Config.img.src)
        .pipe(
            cache(
                imagemin({
                    optimizationLevel: 5, // 取值范围：0-7（优化等级），默认：3
                    progressive: true, // 无损压缩jpg图片，默认：false
                    interlaced: true, // 隔行扫描gif进行渲染，默认：false
                    multipass: true // 多次优化svg直到完全优化，默认：false
                })
            )
        )
        .pipe(reload({ stream: true }))
        .pipe(gulp.dest(Config.img.dist));
});

// 处理assets
gulp.task("assets", function() {
    return gulp
        .src(Config.assets.src)
        .pipe(reload({ stream: true }))
        .pipe(gulp.dest(Config.assets.dist));
});

// 合并JS
gulp.task("components:js", function() {
    return gulp
        .src(Config.js.components)
        .pipe(babel())
        .pipe(concat("main.js"))
        .pipe(reload({ stream: true }))
        .pipe(gulp.dest(Config.js.dist));
});

// 处理JS
gulp.task("js", function() {
    return gulp
        .src(Config.js.src)
        .pipe(babel())
        .pipe(reload({ stream: true }))
        .pipe(gulp.dest(Config.js.dist));
});

// 监听
gulp.task("watch", function() {
    watch(Config.sass.watch, gulp.series("page:sass","components:sass"));
    watch(Config.css.src, gulp.series("css"));
    watch(Config.assets.src, gulp.series("assets"));
    watch(Config.js.src, gulp.series("js"));
    watch(Config.js.components, gulp.series("components:js"));
    watch(Config.html.watch, gulp.series("html"));
    watch(Config.font.src, gulp.series("font"));
});

// dev任务
gulp.task(
    "dev",
    gulp.series(
        "clean",
        gulp.parallel(
            "browser",
            "images",
            "components:sass",
            "page:sass",
            "css",
            "components:js",
            "js",
            "html",
            "assets",
            "font",
            "watch"
        )
    )
);
