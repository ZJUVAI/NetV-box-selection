const path = require('path');

module.exports = {
    entry: './netv-box-selection.js',
    devtool: 'inline-source-map',
    mode: 'development',
    output: {
        filename: 'netv-box-selection.js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'umd',
    },
};