var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './src/game-time-accumulator.js',
    output: {
        library: 'GameTimeAccumulator',
        libraryTarget: 'umd',
        path: __dirname,
        filename: 'dist/game-time-accumulator.js'
    },
    module: {
        loaders: [{
            test: path.join(__dirname, 'src'),
            loader: 'babel-loader'
        }]
    },
    plugins: [
        // Avoid publishing files when compilation failed
        new webpack.NoErrorsPlugin()
    ],
    stats: {
        // Nice colored output
        colors: true
    },
    // Create Sourcemaps for the bundle
    devtool: 'source-map',
    cache: true
}
