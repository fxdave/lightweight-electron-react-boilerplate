const path = require('path');

/*
 * @sucrase is like a better @babel
 * this will allow you to write ecmascript with experimental features like 'class variable'
 */
const loaders = {
  rules: [
    {
      test: /\.js$/,
      use: {
        loader: '@sucrase/webpack-loader',
        options: {
          transforms: ['jsx']
        }
      }
    }
  ]
}

/**
 * Here we tell webpack 2 configs, the first is for the main thread, the second is for the renderer.
 */
module.exports = [{
  mode: process.env.NODE_ENV || 'production' ,
  target: 'node', // node target excludes internal node packages like 'fs'
  entry: {
    main: './src/main.js'
  },
  // this will emit src/main.built.js
  output: {
    path: path.resolve(__dirname, 'src'),
    filename: '[name].built.js' 
  },
  module: loaders
}, {
  mode: process.env.NODE_ENV || 'production' ,
  target: 'web', // default
  entry: {
    renderer: './src/renderer.js',
  },
  // this will emit /src/renderer.built.js
  output: {
    path: path.resolve(__dirname, 'src'),
    filename: '[name].built.js'
  },
  module: loaders
}];
