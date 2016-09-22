import gulp from "gulp";
import watch from "gulp-watch";
import batch from "gulp-batch";
import {join} from "path";

gulp.task("rollup-watch", ["rollup-dev"], () => {
    watch([
        join(__dirname, "..", "src", "**", "*")
    ], batch((events, done) => {
        gulp.start("rollup-dev", done);
    }));
});
