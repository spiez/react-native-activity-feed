// @noflow
/* globals __dirname */
/* eslint-env commonjs*/

const path = require('path');
const webpack = require('webpack');
const notBabeledDeps = [
  'react-native-safe-area-view',
  'react-native-sticky-keyboard-accessory',
  'react-native-keyboard-spacer',
];

module.exports = {
  title: 'React native activity feeds - Docs',
  require: ['babel-polyfill'],
  styleguideDir: 'docs',
  sortProps: (props) => props,
  styleguideComponents: {
    PathlineRenderer: path.join(
      __dirname,
      'src/styleguideComponents/PathlineRenderer.js',
    ),
  },

  sections: [
    {
      name: 'Introduction',
      content: 'docs/setup.md',
    },
    {
      name: 'Top Level Components',
      content: 'docs/top-level-components.md',
      components: [
        'src/Context/StreamApp.js',
        'src/components/FlatFeed.js',
        'src/components/NotificationFeed.js',
        'src/components/SinglePost.js',
      ],
      exampleMode: 'collapse',
      usageMode: 'expand',
    },
    {
      name: 'UI Components',
      content: 'docs/other-components.md',
      components: 'src/components/[A-Z]*.js',
      ignore: [
        '**/FlatFeed.js',
        '**/NotificationFeed.js',
        '**/SinglePost.js',
        '**/CommentsContainer.js',
      ],
      exampleMode: 'collapse',
      usageMode: 'expand',
    },
    {
      name: 'Cookbook',
      content: 'docs/cookbook.md',
    },
    {
      name: 'Internationalisation (i18n)',
      content: 'docs/Streami18n.md',
    },
    {
      name: 'Styles',
      content: 'docs/styles.md',
    },
  ],
  template: {
    favicon: 'https://getstream.imgix.net/images/favicons/favicon-96x96.png',
  },
  webpackConfig: {
    resolve: {
      // auto resolves any react-native import as react-native-web
      alias: { 'react-native': 'react-native-web' },
      extensions: ['.web.js', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          include: [
            path.join(__dirname, 'src'),
            ...notBabeledDeps.map((dep) =>
              path.join(__dirname, 'node_modules', dep),
            ),
          ],
          options: {
            plugins: [
              'macros',
              '@babel/plugin-transform-runtime',
              '@babel/proposal-class-properties',
              '@babel/proposal-object-rest-spread',
              'react-native-web',
            ],
            presets: ['@babel/env', 'module:metro-react-native-babel-preset'],
            babelrc: false,
          },
        },
        {
          test: /\.(jpe?g|png|gif|ttf)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                hash: 'sha512',
                digest: 'hex',
                name: '[hash].[ext]',
                outputPath: 'build/images',
              },
            },
          ],
        },
      ],
    },
    // Most react native projects will need some extra plugin configuration.
    plugins: [
      // Add __DEV__ flag to browser example.
      new webpack.DefinePlugin({
        __DEV__: process.env,
      }),
    ],
  },
};
