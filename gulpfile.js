var gulp = require("gulp");
var nodemon = require("gulp-nodemon");

var babel = require("gulp-babel");
var concat = require("gulp-concat");

var browserify = require('browserify');
var fs = require('fs');

var allComponents = "public/components/*.js"; 
var jsPath = "public/js/";

gulp.task("compile",function(){
  gulp.src(allComponents)
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(concat("components-compiled.js"))
    .pipe(gulp.dest(jsPath));
});

gulp.task("browserify",function(){
    var b = browserify({
        entries: [jsPath + 'components-compiled.js']
    });
    b.bundle().pipe(fs.createWriteStream(jsPath + 'main.js'));
});

gulp.task("run",function(){
   nodemon({
       script: "app.js",
       ext: "html js"
   })
});

gulp.task('watch',function(){
	gulp.watch(allComponents,["compile","browserify"]);
});

gulp.task("default",["compile","browserify","run","watch"]);
