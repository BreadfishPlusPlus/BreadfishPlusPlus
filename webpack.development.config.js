"use strict";

const Path = require("path");
const Webpack = require("webpack");
module.exports = {
    entry: "./src/index.js",
    output: {
        path: Path.join(__dirname, ".public"),
        filename: "breadfishplusplus.js",
        chunkFilename: "[id].js",
        pathinfo: true,
        publicPath: "/"
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: "babel"
        },{
            test: /\.less$/,
            exclude: /node_modules/,
            loader: "style!css!less"
        },{
            test: /\.hbs$/,
            exclude: /node_modules/,
            loader: "handlebars-loader"
        },{
            test: /\.json$/,
            exclude: /node_modules/,
            loader: "json-loader"
        }]
    },
    plugins: [
        new Webpack.IgnorePlugin(/^\.\/locale$/, /moment$/), // Don't load all moment locales
        new Webpack.ProvidePlugin({
            _: "lodash"
        })
    ],
    devtool: "eval",
    watch: true,
    debug: true,
    resolve: {
        root: Path.join(__dirname, "src"),
        extensions: ["", ".js", ".less", ".hbs", ".json"]
    }
};
