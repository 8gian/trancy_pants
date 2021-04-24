const path = require('path');
module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: './src/game.ts',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: path.join('build', 'bun.js'),
    },
    resolve: { extensions: ['.ts', '.js'] },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: 8765,
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'awesome-typescript-loader',
            },
        ],
    },
};
