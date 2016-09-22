import del from "del";
import gulp from "gulp";
import {join} from "path";

gulp.task("rollup-clean", (callback) => {
    return del([
        join(__dirname, "..", "dist", "breadfishplusplus.js"),
        join(__dirname, "..", "dist", "breadfishplusplus.js.map")
    ], callback);
});
