/*
 * Gulp commands for development
 * 
 *
 *
 *
 */

var gulp  = require('gulp'),
	compass = require('gulp-compass'),
  iconfont = require('gulp-iconfont'),
  iconfontCss = require('gulp-iconfont-css'),
  gutil   = require('gulp-util'),
  fs = require('fs'),
	config  = require('../config.json'),
  plumber = require('gulp-plumber'),
  fontName = 'iconfont',
  wrap = require('gulp-wrap-amd');

/*
 * Compile compass
 *
 */
gulp.task('compass', function() {

  console.log(' ---- run compass ---');
  var  cssPath = config.development.css.path,
	     formatStyle = 'expanded',
       sourcemap = true;
  
  // if for deployment
  if( gutil.env.d ){
    cssPath = config.deploy.css.path;
    formatStyle = "compressed";
    sourcemap = false;
  }

  gulp.src(config.src.sass.files)
    .pipe( plumber())
    .pipe(compass({
      config_file: 'config.rb',
      css: cssPath,
      sass: config.src.sass.folder,
      style : formatStyle,
      sourcemap : sourcemap
    }))
});

/*
 * Watch templates and compass/sass files.
 *
 */
gulp.task('watch', function() {
  gulp.watch(config.src.sass.files, ['compass']);

  gulp.watch(config.iconfont.srcSVG, ['iconfonts']);
});


/*
 * Icon Font generation
 * 
 */
gulp.task('iconfonts', function(){
  console.log('\n----- iconfonts ---- ');
    return gulp.src(config.iconfont.srcSVG)
      .pipe( plumber())
      .pipe(iconfontCss({
        fontName: fontName,
        path: config.iconfont.cssTempSrc,
        targetPath: config.iconfont.sassDest,
        fontPath: config.iconfont.fontPath
      }))
      .pipe(iconfont({
        fontName: fontName,
        normalize: true,
        appendCodepoints: true
       }))
      .pipe(gulp.dest(config.iconfont.destFontPath))
});

