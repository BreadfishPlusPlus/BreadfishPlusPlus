import gulp from "gulp";
import {rollup} from "rollup";
import commonjs from "rollup-plugin-commonjs";
import nodeResolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import filesize from "rollup-plugin-filesize";
import multiEntry from "rollup-plugin-multi-entry";
import {join} from "path";

let cache;
gulp.task("rollup-dev", ["rollup-clean"], () => {
    return rollup({
        entry: [
            join(__dirname, "..", "src", "main.js"),
            join(__dirname, "..", "src", "modules", "**", "*.js")
        ],
        plugins: [
            multiEntry({
                exports: false
            }),
            babel({
                babelrc: false,
                exclude: "node_modules/**",
                runtimeHelpers: false,
                externalHelpers: false,
                sourceMaps: true,
                plugins: [
                    "transform-es2015-destructuring",
                    "transform-es2015-parameters"
                ]
            }),
            nodeResolve({
                module: true,
                jsnext: true,
                main: true,
                skip: ["jquery", "breadfish"],
                browser: true,
                extensions: [".js"],
                preferBuiltins: false
            }),
            commonjs({
                include: "node_modules/**",
                exclude: ["node_modules/lodash-es/**"],
                extensions: [".js"],
                ignoreGlobal: false,
                sourceMaps: true,
                namedExports: undefined
            }),
            filesize()
        ],
        cache,
        external: ["jquery"]
    }).then(function (bundle) {
        cache = bundle;
        return bundle.write({
            format: "iife",
            exports: "none",
            globals: {
                jquery: "jQuery"
            },
            dest: join(__dirname, "..", "dist", "breadfishplusplus.js"),
            sourceMap: true
        });
    });
});
