// 设置路径
const SRC_RIR = "./src/";
const DIST_DIR = "./dist/";

// 默认项
const Config = {
    src: SRC_RIR,
    dist: DIST_DIR,
    sass: {
        page: SRC_RIR + "sass/page.scss",
        components: SRC_RIR + "components/components.scss",
        dist: SRC_RIR + "css",
        watch: SRC_RIR + "{sass,components}/**/*.scss"
    },
    css: {
        src: SRC_RIR + "css/*.css",
        dist: DIST_DIR + "css"
    },
    html: {
        src: SRC_RIR + "pages/**/*.html",
        watch: SRC_RIR + "{pages,components,modules}/**/*.html"
    },
    assets: {
        src: SRC_RIR + "assets/**/*.*",
        dist: DIST_DIR + "assets"
    },
    img: {
        src: SRC_RIR + "img/**/*.*",
        dist: DIST_DIR + "img"
    },
    js: {
        src: SRC_RIR + "js/**/*.js",
        components: SRC_RIR + "components/**/*.js",
        dist: DIST_DIR + "js"
    },
    font: {
      src: SRC_RIR + "font/*",
      dist: DIST_DIR + "font"
    }
};

module.exports = Config;
