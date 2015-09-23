/*eslint-env node*/
"use strict";

const Path = require("path");
const Webpack = require("webpack");
module.exports = {
    entry: Path.join(__dirname, "src", "index.js"),
    output: {
        path: Path.join(__dirname, ".public"),
        filename: "breadfishplusplus.js",
        chunkFilename: "[id].js",
        pathinfo: true,
        publicPath: "/"
    },
    externals: {
        "jquery": "jQuery"
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            include: [
                Path.join(__dirname, "src")
            ],
            loader: "babel",
            query: {
                stage: 0,
                comments: false
            }
        }, {
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
        extensions: ["", ".js", ".jsx", ".json"]
    }
};
