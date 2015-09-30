/*eslint-env node*/
"use strict";

const Path = require("path");
const Webpack = require("webpack");
const Package = require("./package.json");
const Fs = require("fs");
const Template = require("lodash").template;

const BANNER =  Template(Fs.readFileSync(Path.join(__dirname, "src", "meta.txt"), {
    encoding: "utf8"
}));

module.exports = {
    entry: Path.join(__dirname, "src", "index.js"),
    output: {
        path: Path.join(__dirname, "release"),
        filename: "BreadfishPlusPlus.user.js",
        chunkFilename: "[id].js",
        pathinfo: false,
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
        }]
    },
    plugins: [
        new Webpack.IgnorePlugin(/^\.\/locale$/, /moment$/), // Don't load all moment locales
        new Webpack.ProvidePlugin({
            _: "lodash"
        }),
        new Webpack.DefinePlugin({
            "process.env": {
                "NODE_ENV": JSON.stringify("")
            }
        }),
        new Webpack.optimize.DedupePlugin(),
        new Webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false
            },
            compress: {
                warnings: true
            },
            sourceMap: false
        }),
        new Webpack.DefinePlugin({
            BPP_VERSION: JSON.stringify(Package.version),
            BPP_DOMAIN: JSON.stringify(Package.domain.main),
            BPP_CDN_DOMAIN: JSON.stringify(Package.domain.cdn),
            BPP_TS_DOMAIN: JSON.stringify(Package.domain.teamspeak),
            DEBUG_MOE: false
        }),
        new Webpack.BannerPlugin(BANNER({package: Package}), {
            raw: true,
            entryOnly: true
        })
    ],
    resolve: {
        root: Path.join(__dirname, "src"),
        extensions: ["", ".js", ".jsx", ".json"]
    }
};
