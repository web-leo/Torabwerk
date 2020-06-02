let projectFolder = "dist";
let sourceFolder = "app";

let path = {
   build: {
      html: projectFolder + "/",
      css: projectFolder + "/css/",
      js: projectFolder + "/js/",
      img: projectFolder + "/img/",
      fonts: projectFolder + "/fonts/",
   },
   src: {
      html: [sourceFolder + "/*.html", "!" + sourceFolder + "/_*.html"],
      js: [sourceFolder + "/js/**/*.js", "!" + sourceFolder + "/js/_*.js"],
      scss: sourceFolder + "/scss/*.scss",
      css: sourceFolder + "/css/**/*.css",
      img: sourceFolder + "/img/**/**/*.*",
      fonts: sourceFolder + "/fonts/**/*.*",
      php: sourceFolder + "/**/*.php",
   },
   watch: {
      html: sourceFolder + "/**/*.html",
      js: sourceFolder + "/js/**/*.js",
      scss: sourceFolder + "/scss/**/*.scss",
      css: sourceFolder + "/css/**/*.css",
      img: sourceFolder + "/img/**/**/*.*",
      fonts: sourceFolder + "/fonts/**/*.*",
      php: sourceFolder + "/**/*.php",
   },
   clean: "./" + projectFolder + "/",
};

let { src, dest } = require("gulp"),
   gulp = require("gulp"),
   browserSync = require("browser-sync").create(),
   fileinclude = require("gulp-file-include"),
   del = require("del"),
   scss = require("gulp-sass"),
   autoprefixer = require("gulp-autoprefixer"),
   group_media = require("gulp-group-css-media-queries"),
   clean_css = require("gulp-clean-css"),
   rename = require("gulp-rename"),
   uglify = require("gulp-uglify-es").default,
   imagemin = require("gulp-imagemin");

function BrowserSync(params) {
   browserSync.init({
      server: {
         baseDir: "./" + projectFolder + "/",
      },
      port: 8081,
      notify: false,
   });
}

function html(params) {
   return src(path.src.html)
      .pipe(fileinclude())
      .pipe(dest(path.build.html))
      .pipe(browserSync.stream());
}

function images(params) {
   return src(path.src.img)
      .pipe(
         imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            optimizationLevel: 3, // 0 to 7
         })
      )
      .pipe(dest(path.build.img))
      .pipe(browserSync.stream());
}

function js(params) {
   return src(path.src.js)
      .pipe(fileinclude())
      .pipe(dest(path.build.js))
      .pipe(uglify())
      .pipe(
         rename({
            extname: ".min.js",
         })
      )
      .pipe(dest(path.build.js))
      .pipe(browserSync.stream());
}

function fonts() {
   src(path.src.fonts).pipe(dest(path.build.fonts));
}

function css(params) {
   return src(path.src.css)
      .pipe(
         autoprefixer({
            overrideBrowserslist: ["last 6 version"],
         })
      )
      .pipe(dest(path.build.css))
      .pipe(browserSync.stream());
}

function sass(params) {
   return src(path.src.scss)
      .pipe(
         scss({
            outputStyle: "expanded",
         })
      )
      .pipe(group_media())
      .pipe(
         autoprefixer({
            overrideBrowserslist: ["last 6 version"],
            cascade: true,
         })
      )
      .pipe(dest(path.build.css))
      .pipe(clean_css())
      .pipe(
         rename({
            extname: ".min.css",
         })
      )
      .pipe(dest(path.build.css))
      .pipe(browserSync.stream());
}

function watchFiles(params) {
   gulp.watch([path.watch.html], html);
   gulp.watch([path.watch.css], css);
   gulp.watch([path.watch.scss], sass);
   gulp.watch([path.watch.js], js);
   gulp.watch([path.watch.img], images);
}

function clean(params) {
   return del(path.clean);
}

let build = gulp.series(
   clean,
   gulp.parallel(html, sass, css, js, images, fonts)
);
let watch = gulp.parallel(build, watchFiles, BrowserSync);

exports.fonts = fonts;
exports.images = images;
exports.js = js;
exports.sass = sass;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;
