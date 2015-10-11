/*eslint-env node*/
"use strict";

const Path = require("path");
const Webpack = require("webpack");
const Package = require("./package.json");
const _ = require("lodash");


const devConfig = require(Path.join(__dirname, "webpack.development.config.js"));

module.exports = _.assign(devConfig, {
    output: {
        path: Path.join(__dirname, ".public"),
        filename: "breadfishplusplus.js",
        chunkFilename: "[id].js",
        pathinfo: false,
        publicPath: "/"
    },
    plugins: [
        new Webpack.PrefetchPlugin("react"),
        new Webpack.PrefetchPlugin("react/lib/ReactComponentBrowserEnvironment"),
        new Webpack.IgnorePlugin(/^\.\/locale$/, /moment$/), // Don't load all moment locales
        new Webpack.ProvidePlugin({
            _: "lodash"
        }),
        new Webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
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
            sourceMap: true
        }),
        new Webpack.DefinePlugin({
            BPP_VERSION: JSON.stringify(Package.version),
            BPP_CDN_DOMAIN: JSON.stringify(Package.domain.cdn),
            BPP_TS_DOMAIN: JSON.stringify(Package.domain.teamspeak),
            BPP_SCREENSHOT_DOMAIN: JSON.stringify(Package.domain.screenshot),
            DEBUG_MOE: false
        })
    ],
    devtool: null,
    watch: false,
    debug: false
});
