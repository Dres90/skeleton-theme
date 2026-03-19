import resolve from '@rollup/plugin-node-resolve';
// eslint-disable-next-line import/no-extraneous-dependencies
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

export default {
  input: 'src/js/main.js',
  output: {
    file: 'assets/bundle.js',
    format: 'iife',
    sourcemap: true,
  },
  plugins: [
    commonjs({
      transformMixedEsModules: true,
    }),
    resolve({
      transformMixedEsModules: true,
    }), // Resolves node_modules imports
    process.env.NODE_ENV === 'production' && terser(), // Minify for production
  ],
};
