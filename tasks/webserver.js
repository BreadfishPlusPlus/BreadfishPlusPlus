import gulp from "gulp";
import {join} from "path";
import connect from "gulp-connect";

gulp.task("webserver", () => {
    const buildDir = join(__dirname, "..", "dist");
    connect.server({
        root: buildDir,
        https: true,
        debug: true,
        port: 8000
    });
});
