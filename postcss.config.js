/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');

module.exports = {
  plugins: [
    require('postcss-import')({
      skipDuplicates: true,
    }),
    require('@csstools/postcss-global-data')({
      files: ['./src/css/_media-queries.css'],
    }),
    require('postcss-simple-vars')({
      variables: require('./src/css/breakpoints'),
    }),
    require('postcss-at-rules-variables'),
    // Then process mixins after the @for loops have run
    require('postcss-mixins')({
      mixinsDir: path.join(__dirname, 'src/css/mixins'),
    }),
    require('postcss-functions')({
      functions: require('./src/css/functions'),
    }),

    // Add postcss-bem for BEM syntax
    require('postcss-bem')({
      style: 'bem',
    }),

    // Keep nested for other nesting
    require('postcss-nested'),
    require('postcss-preset-env')({ stage: 1 }),
    require('postcss-each'),
    require('postcss-hexrgba'),
    require('postcss-custom-properties')({
      preserve: true,
    }),
    require('postcss-calc'),
    require('postcss-custom-media')(),
    require('postcss-pxtorem')({
      rootValue: 16,
      unitPrecision: 5,
      propList: [
        'font',
        'font-size',
        'gap',
        'line-height',
        'letter-spacing',
        'word-spacing',
        'margin',
        'margin-*',
        'padding',
        'padding-*',
        'border',
        'border-radius',
        'border-*',
        'width',
        'height',
        'min-height',
        'max-height',
        'min-width',
        'max-width',
        'flex-basis',
        'flex-grow',
        'flex-shrink',
      ],
      selectorBlackList: [],
      replace: true,
      mediaQuery: false,
      minPixelValue: 4,
      exclude: /--.*/, // This regex excludes CSS custom properties
    }),
    require('autoprefixer'),
  ],
};
