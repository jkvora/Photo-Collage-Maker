
//Grab Package Manager
var gulp=require('gulp');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');  
var rename = require('gulp-rename');  
var uglify = require('gulp-uglify'); 
var minifyCSS = require('gulp-minify-css');
var replace = require('gulp-replace');

//File Directory for JS files
var jsFiles={
        custom:'public/js/*.js',
        vendor:'public/vendor/js/*.js',
        output:'public/dist/js'
}

//File Directory for CSS files
var cssFiles={
        custom:'public/css/*.css',
        vendor:'public/vendor/css/*.css',
        output:'public/dist/css'
}


//Index HTML
var pathHTML='public/index.html';
var pathImages='public/img/*.jpg';


//Gulp default task
gulp.task('default',['watch'],function(){
	console.log("Gulp Started...!!!");
});


//Gulp Watch Process
gulp.task('watch',function(){
	gulp.watch(jsFiles.custom,['jshint','scripts','vendor_scripts']);
        gulp.watch(cssFiles.custom,['styles','vendor_styles','replace_html']);
        gulp.watch(pathImages,['copy_images']);
});


//Configure jshint task
gulp.task('jshint',function () {
	return gulp.src('public/js/*.js')
		   .pipe(jshint())
		   .pipe(jshint.reporter('jshint-stylish'));
})

//Configure Concat and minify local js
gulp.task('scripts', function() {  
	 return gulp.src(jsFiles.custom)
        .pipe(concat('scripts.js'))
        .pipe(rename('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsFiles.output));
});


//Configure Concat and minify vendor js
gulp.task('vendor_scripts', function() {  
	 return gulp.src(jsFiles.vendor)
        .pipe(concat('vendor.js'))
        .pipe(rename('vendor.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsFiles.output  ));
});



//Configure Concat and minify local css
gulp.task('styles', function() {  
	 return gulp.src(cssFiles.custom)
        .pipe(concat('style.css'))
        .pipe(rename('style.min.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest(cssFiles.output));
});


//Configure Concat and minify vendor css
gulp.task('vendor_styles', function() {  
	 return gulp.src(cssFiles.vendor)
        .pipe(concat('vendor.css'))
        .pipe(rename('vendor.min.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest(cssFiles.output));
});


//Configure index.html on basis of production 
gulp.task('replace_html', function() {  
         return gulp.src(pathHTML)
      .pipe(replace('script.js', 'scripts.min.js'))
      .pipe(replace('vendor/js/fabric.js', 'js/vendor.min.js'))
      .pipe(replace('style.css', 'style.min.css'))
      .pipe(replace('vendor/css/bootstrap.css', 'css/vendor.min.css'))
      .pipe(gulp.dest('public/dist/'));
});

//Connfigure and copy images folder
gulp.task('copy_images', function() {  
         return gulp.src(pathImages)
         .pipe(gulp.dest('public/dist/img/'));
});

