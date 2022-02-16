const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

const srcPath = path.resolve(__dirname, './src');
const distPath = path.resolve(__dirname, './dist');

module.exports = {
    context: srcPath,
    resolve: {
        alias: {
            components: path.resolve(srcPath, './components'),
            images: path.resolve(distPath, './images'),
            api: path.resolve(srcPath, './api'),
            states: path.resolve(srcPath, './states')
        }
    },
    entry: {
        index: ['./index.jsx'],
        // vendor: ['react', 'react-dom']
    },
    output: {
        path: distPath,
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: [/node_modules/],
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [[
                                '@babel/preset-env', {
                                    modules: false
                                }],
                                '@babel/preset-react'
                            ],
                            plugins: [
                                '@babel/plugin-transform-runtime'
                            ]
                        }
                    }
                ]
            }, {
                test: /\.css$/,
                use: ['style-loader', {
                    loader: 'css-loader',
                    options : {
                        url: false
                    }
                }]
            }
        ]
    },
    optimization: {
        splitChunks: {
            minSize: 0,
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendor",
                    chunks: "all",
                },
            },
        },
        minimizer: [
            new TerserPlugin({
                extractComments: false,
        })],
    },
    devServer: {
        contentBase: distPath,
        compress: true,
        port: 8080,
        historyApiFallback: true,
    },
    mode: 'development',
};
