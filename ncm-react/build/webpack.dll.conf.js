const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        vendor: ['react', 'react-dom', 'react-router-dom', 'react-router-redux', 'redux', 'react-redux', 'redux-thunk', 'classnames', 'axios']
    },
    output: {
        path: path.join(__dirname, '../static/js'),
        filename: '[name].dll.js',
        library: '[name]_library'
    },
    plugins: [
        new webpack.DllPlugin({
            context: __dirname,
            path: path.join(__dirname, '.', '[name]-manifest.json'),
            name: '[name]_library'
        }),

    ]
};
if (process.env.NODE_ENV === 'production') {

    module.exports.plugins.concat([
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]);
}