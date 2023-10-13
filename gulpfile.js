
const { src, dest, watch, series, parallel} = require('gulp');




const sass =  require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');


//imagenes minificadas
// const  imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

function css( done){

    src('src/scss/app.scss')
        .pipe(sass())
        .pipe(postcss([autoprefixer()]))
        .pipe(dest('build/css'))

        done();


}

function imagenes(done){

     src('src/img/**/*')
    .pipe( dest('build/img'));
      // .pipe(imagemin({ optimizationLevel: 3 }))

    done();

    

}

function versionwebp(){

    return src('src/img/**/*.{png,jpg}')
    .pipe( webp())
    .pipe(dest('build/img') )

}

function versionAvif(){
    return src('src/img/**/*.{png,jpg}')
    .pipe( avif())
    .pipe(dest('build/img'));
}



function dev(){
    watch('src/scss/**/*.scss', css);
    watch('src/img/**/*', imagenes);
    
    

}



exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.versionwebp = versionwebp;
exports.versionAvif = versionAvif;
exports.default = series(imagenes, versionwebp, versionAvif,  css, dev);