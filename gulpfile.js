
//Grab Package Manager
var gulp=require('gulp');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');  
var rename = require('gulp-rename');  
var uglify = require('gulp-uglify'); 


//script paths
var jsFiles = 'public/js/*.js';
var jsDest = 'public/dist';
var jsvendorFiles='public/vendor/js/*.js';


//Gulp default task
gulp.task('default',['watch'],function(){
	console.log("Gulp Started...!!!")
});


//Gulp Watch Process
gulp.task('watch',function(){
	gulp.watch('public/js/*.js',['jshint','scripts','vendor_scripts'])
});


//Configure jshint task
gulp.task('jshint',function () {
	return gulp.src('public/js/*.js')
		   .pipe(jshint())
		   .pipe(jshint.reporter('jshint-stylish'));
})

//Configure Concat js
gulp.task('scripts', function() {  
	 return gulp.src(jsFiles)
        .pipe(concat('scripts.js'))
        .pipe(rename('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsDest));
});



//Configure Concat js
gulp.task('vendor_scripts', function() {  
	 return gulp.src(jsvendorFiles)
        .pipe(concat('bundle.js'))
        .pipe(rename('bundle.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsDest));
});

