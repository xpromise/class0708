/*
  1. 新建gulp的配置文件 gulpfile.js(当后面运行gulp指令时，会读取配置文件的配置，从而执行)
  2. 下载包
    npm init -y
    npm i gulp-cli -g
    npm i gulp -D
  3. 使用
    - 去gulp插件网找插件 gulp-babel  https://gulpjs.com/plugins/
    - 下载插件 npm i xxx -D
    - 引入插件 （所有构建工具都是基于nodejs平台，所有构建工具使用的模块化是commonjs）
     const babel = require('gulp-babel');
    - 配置插件任务
      gulp.task('任务名称', function () {})
    - 运行任务 gulp 任务名称
 */

const gulp = require('gulp');
const babel = require('gulp-babel');
const browserify = require('gulp-browserify');
const rename = require('gulp-rename');
const less = require('gulp-less');
const concat = require('gulp-concat');
const connect = require('gulp-connect');

// 配置插件任务
gulp.task('babel', () => {
  // 必须加上return
  return gulp.src('src/js/*.js')   // 将指定文件以nodejs流的方式读取
    .pipe(babel({presets: ['@babel/preset-env']})) // 使用babel插件将导入的文件进行语法装换（将ES6模块化语法装换成commonjs模块化语法, 将ES6其他语法装换成ES5一下的低级语法）
    .pipe(gulp.dest('build/js')) // 将流中文件输出/写入到另外文件夹里面去
});

gulp.task('browserify', function() {
  return gulp.src('build/js/index.js')
    .pipe(browserify()) // 将commonjs模块化装换浏览器能识别的js语法
    .pipe(rename('built.js')) // 重命名
    .pipe(gulp.dest('./build/js'))
});

gulp.task('less', function () {
  return gulp.src('src/less/*.less')
    .pipe(less()) // 将less编译成css
    .pipe(concat('built.css')) // 合并文件
    .pipe(gulp.dest('build/css'));
});

gulp.task('html', function () {
  return gulp.src('src/index.html')
    .pipe(gulp.dest('build'))
});

gulp.task('watch', function () {

  // 开启服务器
  connect.server({
    port: 3000,
    root: ['build']
  });

  // 自动编译： 当修改了源代码自动运行任务编译到build中
  // 监视 src/js/*.js 文件，一旦文件发生变化，就会执行后面的任务
  gulp.watch('src/js/*.js', gulp.series(['js']));
  gulp.watch('src/less/*.less', gulp.series(['less']));
  gulp.watch('src/index.html', gulp.series(['html']));

});

// 配置默认任务， 实际执行的任务是babel和browserify
gulp.task('js', gulp.series(['babel', 'browserify'])); // 同步：顺序执行

gulp.task('js-dev', gulp.parallel(['js', 'less', 'html'])); // 异步：并行执行

gulp.task('default', gulp.series(['js-dev', 'watch'])); // 异步：并行执行

