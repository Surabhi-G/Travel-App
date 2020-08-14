const path = require('path') 
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
    entry: './src/client/index.js',
    mode: 'development',
    devtool: 'source-map',
    output:{
        libraryTarget: 'var',
        library: 'Client',    
    },
    module:{
        rules: [
            {
            test: '/\.js$/',
            exclude: /node_modules/,
            loader: "babel-loader"
            },
            {
                test: /\.scss$/,
                use: [ 'style-loader', 'css-loader', 'sass-loader' ]
            }
        ]
    },
    devServer: {
        port: 9090
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
        }),
        new WorkboxPlugin.GenerateSW({
            clientsClaim: true,
            skipWaiting: true
        }), 
        new BundleAnalyzerPlugin()
    ]
}
