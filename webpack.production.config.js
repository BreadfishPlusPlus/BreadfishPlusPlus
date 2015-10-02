/*eslint-env node*/
"use strict";

const Path = require("path");
const Webpack = require("webpack");
const Package = require("./package.json");
const Fs = require("fs");
const _ = require("lodash");


const BANNER =  _.template(Fs.readFileSync(Path.join(__dirname, "src", "meta.txt"), {
    encoding: "utf8"
}));

const devConfig = require(Path.join(__dirname, "webpack.development.config.js"));

module.exports = _.assign(devConfig, {
    output: {
        path: Path.join(__dirname, "release"),
        filename: "BreadfishPlusPlus.user.js",
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
    devtool: "source-map",
    watch: false,
    debug: false
});
