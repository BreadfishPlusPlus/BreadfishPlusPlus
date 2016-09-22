import gulp from "gulp";
import {rollup} from "rollup";
import commonjs from "rollup-plugin-commonjs";
import nodeResolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import filesize from "rollup-plugin-filesize";
import uglify from "rollup-plugin-uglify";
import multiEntry from "rollup-plugin-multi-entry";
import {join} from "path";

let cache;
gulp.task("rollup-prod", ["rollup-clean"], () => {
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
                runtimeHelpers: true,
                externalHelpers: true,
                sourceMaps: true,
                presets: [[
                    "es2015", {
                        "modules": false
                    }
                ]],
                plugins: [
                    "external-helpers",
                    "transform-async-to-generator",
                    "transform-runtime"
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
            uglify(),
            filesize(),
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
