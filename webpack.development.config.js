var Path = require("path");
var Webpack = require("webpack");
console.log(Path.join(__dirname, "src", "index.js"));
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
            test: /\.js$/,
            loader: "babel"
        },{
            test: /\.less$/,
            loader: "style!css!less"
        },{
            test: /\.hbs$/,
            loader: "handlebars-loader"
        },{
            test: /\.json$/,
            loader: "json-loader"
        }]
    },
    plugins: [
        new Webpack.IgnorePlugin(/^\.\/locale$/, /moment$/), // Don't load all moment locales
        new Webpack.ProvidePlugin({
            _: "lodash"
        })
    ],
    devtool: "cheap-eval-source-map",
    watch: true,
    debug: true,
    resolve: {
        root: Path.join(__dirname, "src"),
        extensions: ["", ".js", ".less", ".hbs", ".json"]
    }
};
