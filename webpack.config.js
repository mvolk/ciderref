var path = require('path');
var webpack = require('webpack');
var uglifyJs = new webpack.optimize.UglifyJsPlugin({sourceMap: false, mangle: false, compress: {warnings: true}});
var dedupe = new webpack.optimize.DedupePlugin();
var occurrenceOrder = new webpack.optimize.OccurrenceOrderPlugin();

module.exports = {
    entry: './prototype/app/main.js',
    output: { path: 'prototype/app', filename: 'bundle.min.js' },
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ],
        plugins: [
            // http://dev.topheman.com/make-your-react-production-minified-version-with-webpack
            // https://github.com/topheman/react-es6-redux/blob/master/webpack.config.js
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('production')
                }
            }),
            uglifyJs,
            dedupe,
            occurrenceOrder
        ]
    }
};