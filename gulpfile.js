const {
  src, dest, watch, parallel,
} = require('gulp');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const flatten = require('gulp-flatten');
const touch = require('gulp-touch-fd');
const { rollup } = require('rollup');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const terser = require('@rollup/plugin-terser');
const path = require('path');
const fs = require('fs');

// File paths
const paths = {
  css: {
    src: 'src/css/**/*.css',
    exclude: '!src/css/**/_*.css',
    dest: 'assets',
  },
  js: {
    src: 'src/js/**/*.js',
    mainFile: 'src/js/main.js',
    dest: 'assets',
  },
};

// Error handler to prevent watch from dying
function errorHandler(err) {
  // eslint-disable-next-line no-console
  console.log(err.toString());
  this.emit('end');
}

// CSS task
function css() {
  return src([paths.css.src, paths.css.exclude])
    .pipe(plumber({ errorHandler }))
    .pipe(sourcemaps.init())
    .pipe(postcss())
    .pipe(sourcemaps.write('.'))
    .pipe(dest(paths.css.dest))
    .pipe(touch());
}

// Process all CSS files
function cssAll() {
  return src(paths.css.src)
    .pipe(plumber({ errorHandler }))
    .pipe(sourcemaps.init())
    .pipe(postcss())
    .pipe(sourcemaps.write('.'))
    .pipe(flatten())
    .pipe(dest(paths.css.dest))
    .pipe(touch());
}

// JavaScript task using modern Rollup API
async function js() {
  // Create the bundle
  const bundle = await rollup({
    input: paths.js.mainFile,
    plugins: [
      commonjs({
        transformMixedEsModules: true,
      }),
      nodeResolve({
        transformMixedEsModules: true,
      }),
      terser(),
    ],
  });

  // Write the bundle to disk
  await bundle.write({
    file: path.join(paths.js.dest, 'main.js'),
    format: 'iife',
    sourcemap: true,
  });

  // Touch the file to trigger any watchers
  fs.utimes(path.join(paths.js.dest, 'main.js'), new Date(), new Date(), () => {});
  return Promise.resolve();
}

// Watch files
function watchFiles() {
  watch(paths.css.src, css);
  watch(paths.js.src, js);
}

// Define tasks
exports.css = css;
exports.cssAll = cssAll;
exports.js = js;
exports.watch = watchFiles;
exports.build = parallel(css, js);
exports.default = parallel(css, js);
