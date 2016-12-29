const path = require('path');

module.exports = {
    entry: {
        index: './index.ts',
        particles: './particles.ts',
        vmdemo: './vmdemo.ts'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].bundle.js',
        publicPath: ''
    },
    resolve: {
        extensions: ['', '.ts', '.js']
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel?presets[]=es2015,presets[]=stage-0',
            exclude: /node_modules/
        },{
            test: /\.ts$/,
            loader: 'ts',
            exclude: /node_modules/
        }]
    }
};
