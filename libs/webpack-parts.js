/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2016 Michael Volk (michael@volksys.com)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackTemplate = require('html-webpack-template');
const NpmInstallPlugin = require('npm-install-webpack-plugin');

exports.indexTemplate = function indexTemplate (options) {
  return {
    plugins: [
      new HtmlWebpackPlugin({
        template: HtmlWebpackTemplate,
        title: options.title,
        appMountId: options.appMountId,
        inject: false
      })
    ]
  };
};

exports.loadImages = function loadImages (include) {
  return {
    module: {
      loaders: [
        // {
        //   test: /\.(png|jpg)$/,
        //   loader: 'url-loader?limit=8192', // inline base64 URLs for <=8k images, direct URLs for the rest
        //   include: include
        // },
        {
          test: /\.(jpg|png)$/,
          loader: 'file?name=[path][name].[hash].[ext]',
          include: include
        }
      ]
    }
  };
};

exports.loadJSX = function loadJSX (include) {
  return {
    module: {
      loaders: [
        {
          test: /\.(js|jsx)$/,
          // Enable caching for extra performance
          loaders: ['babel?cacheDirectory'],
          include: include
        }
      ]
    }
  };
};

exports.loadFonts = function loadFonts () {
  return {
    module: {
      loaders: [
        {
          test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'url-loader?limit=10000&mimetype=application/font-woff'
        },
        {
          test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'file-loader'
        }
      ]
    }
  };
};

exports.loadIsparta = function loadIsparta (include) {
  return {
    module: {
      preLoaders: [
        {
          test: /\.(js|jsx)$/,
          loaders: ['isparta-instrumenter'],
          include: include
        }
      ]
    }
  };
};

exports.lintJSX = function lintJSX (include) {
  return {
    module: {
      preLoaders: [
        {
          test: /\.(js|jsx)$/,
          loaders: ['eslint'],
          include: include
        }
      ]
    }
  };
};

exports.enableReactPerformanceTools = function enableReactPerformanceTools () {
  return {
    module: {
      loaders: [
        {
          test: require.resolve('react'),
          loader: 'expose?React'
        }
      ]
    }
  };
};

exports.devServer = function devServer (options) {
  const ret = {
    devServer: {
      // Enable history API fallback so HTML5 History API based
      // routing works. This is a good default that will come
      // in handy in more complicated setups.
      historyApiFallback: true,

      // Unlike the cli flag, this doesn't set
      // HotModuleReplacementPlugin!
      hot: true,
      inline: true,

      // Display only errors to reduce the amount of output.
      stats: 'errors-only',

      // Parse host and port from env to allow customization.
      //
      // If you use Vagrant or Cloud9, set
      // host: options.host || '0.0.0.0';
      //
      // 0.0.0.0 is available to all network devices
      // unlike default `localhost`.
      host: options.host, // Defaults to `localhost`
      port: options.port // Defaults to 8080
    },
    plugins: [
      // Enable multi-pass compilation for enhanced performance
      // in larger projects. Good default.
      new webpack.HotModuleReplacementPlugin({multiStep: true})
    ]
  };

  if (options.poll) {
    ret.watchOptions = {
      // Delay the rebuild after the first change
      aggregateTimeout: 300,
      // Poll using interval (in ms, accepts boolean too)
      poll: 1000
    };
  }

  return ret;
};

exports.setupCSS = function setupCSS (paths) {
  return {
    module: {
      loaders: [
        {
          test: /\.css$/,
          loaders: ['style', 'css'],
          include: paths
        }
      ]
    }
  };
};

exports.minify = function minify () {
  return {
    plugins: [
      new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}})
    ]
  };
};

exports.setFreeVariable = function setFreeVariable (key, value) {
  const env = {};
  env[key] = JSON.stringify(value);

  return {
    plugins: [
      new webpack.DefinePlugin(env)
    ]
  };
};

exports.extractBundle = function extractBundle (options) {
  const entry = {};
  entry[options.name] = options.entries;

  return {
    // Define an entry point needed for splitting.
    entry: entry,
    plugins: [
      // Extract bundle and manifest files. Manifest is
      // needed for reliable caching.
      new webpack.optimize.CommonsChunkPlugin({
        names: [options.name, 'manifest'],

        // options.name modules only
        minChunks: Infinity
      })
    ]
  };
};

exports.clean = function clean (path) {
  return {
    plugins: [
      new CleanWebpackPlugin([path], {root: process.cwd()})
    ]
  };
};

exports.extractCSS = function extractCSS (paths) {
  return {
    module: {
      loaders: [
        // Extract CSS during build
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract('style', 'css'),
          include: paths
        }
      ]
    },
    plugins: [
      // Output extracted CSS to a file
      new ExtractTextPlugin('[name].[chunkhash].css')
    ]
  };
};

exports.npmInstall = function npmInstall (options) {
  return {
    plugins: [
      new NpmInstallPlugin(options || {})
    ]
  };
};
