/**
 * @description: gulp配置文件
 * @author: fang
 * @date: 2019-06-15
 */
"use strict";

const gulp = require("gulp"),
    Config = require("./build/Config"), // 配置文件
    htmlptl = require("gulp-html-tpl"), // html模板
    artTemplate = require("art-template"),
    rename = require("gulp-rename"),
    sass = require("gulp-sass"),
    csso = require("gulp-csso"),
    auto = require("gulp-autoprefixer"),
    htmlmin = require("gulp-htmlmin"),
    imagemin = require("gulp-imagemin"),
    concat = require("gulp-concat"),
    gulpif = require("gulp-if"),
    watch = require("gulp-watch"),
    cache = require("gulp-cache"),
    del = require("del"),
    browser = require("browser-sync").create(),
    reload = browser.reload,
    spriteSmith = require("gulp.spritesmith"),
    buffer = require("vinyl-buffer"),
    merge = require("merge-stream"),
    sync = require("gulp-sync"),
    babel = require("gulp-babel");

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

// 页面css
gulp.task("page:sass", function() {
    return gulp
        .src(Config.sass.page)
        .pipe(sass())
        .pipe(
            auto({
                browsers: ["last 2 versions"],
                cascade: false
            })
        )
        .pipe(reload({ stream: true }))
        .pipe(gulp.dest(Config.sass.dist));
});

// 组件css
gulp.task("components:sass", function() {
    return gulp
        .src(Config.sass.components)
        .pipe(sass())
        .pipe(
            auto({
                browsers: ["last 2 versions"],
                cascade: false
            })
        )
        .pipe(reload({ stream: true }))
        .pipe(gulp.dest(Config.sass.dist));
});

// 合并雪碧图
gulp.task("sprite", function() {
    var spriteData = gulp.src(Config.sprite.src).pipe(
        spriteSmith({
            imgName: "sprite.png",
            cssName: "sprite.css",
            padding: 5,
            algorithm: "top-down",
            cssTemplate: function(data) {
                //函数，直接写到gulpfile.js文件即可。
                let arr = [];
                data.sprites.forEach(function(sprite) {
                    arr.push(
                        ".sprite-" +
                        sprite.name +
                        "{" +
                        "background-image: url('../img/" +
                        sprite.escaped_image +
                        "');" +
                        "background-position: " +
                        sprite.px.offset_x +
                        " " +
                        sprite.px.offset_y +
                        ";" +
                        "width:" +
                        sprite.px.width +
                        ";" +
                        "height:" +
                        sprite.px.height +
                        ";" +
                        "}\n"
                    );
                });
                return arr.join("");
            }
        })
    );

    var imgStream = spriteData.img
        .pipe(buffer())
        .pipe(imagemin())
        .pipe(gulp.dest(Config.sprite.dist));

    var cssStream = spriteData.css.pipe(csso()).pipe(gulp.dest(Config.sass.dist));

    return merge(imgStream, cssStream);
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
});

// dev任务
gulp.task(
    "dev",
    gulp.series(
        "clean",
        gulp.parallel(
            "browser",
            "sprite",
            "images",
            "components:sass",
            "page:sass",
            "css",
            "components:js",
            "js",
            "html",
            "assets",
            "watch"
        )
    )
);
