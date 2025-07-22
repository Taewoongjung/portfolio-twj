const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { InlineChunkHtmlPlugin } = require('react-dev-utils/InlineChunkHtmlPlugin');

module.exports = {
    mode: 'production',
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.[contenthash].js',
        clean: true,
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'], // CSS를 JS로 포함
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'public/index.html',
            inject: 'body',
        }),
        new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/main/]), // JS 번들을 인라인으로 삽입
    ],
};
