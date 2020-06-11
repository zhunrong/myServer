"use strict";
exports.__esModule = true;
var child_process_1 = require("child_process");
var app = null;
function restart() {
    if (app) {
        app.once('close', function () {
            runServer();
        });
        app.kill('SIGTERM');
    }
    else {
        runServer();
    }
}
function runServer() {
    app = child_process_1.spawn('node', ['dist/app.js']);
    if (app.stdout) {
        app.stdout.pipe(process.stdout);
    }
    if (app.stderr) {
        app.stderr.pipe(process.stderr);
    }
}
var compileProcess = child_process_1.spawn('tsc', [], {
    shell: true
});
compileProcess.stdout.on('data', function (chunk) {
    var feedback = chunk.toString();
    process.stdout.write(feedback);
    if ( /* 编译完成 */feedback.includes('Watching for file changes')) {
        restart();
    }
});
compileProcess.stderr.on('data', function (chunk) {
    process.stderr.write(chunk.toString());
});
