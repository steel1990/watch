#!/usr/bin/env node

const gaze = require('gaze');
const program = require('commander');
const pkg = require('./package.json');
const exec = require('child_process').exec;

program
    .version(pkg.version)
    .option('-f, --files [value]', 'glob files pattern')
    .option('-r, --run [value]', 'run command white file changed')
    .parse(process.argv);

if (!program.files || !program.run) {
    console.log('files and run cmd can not be null');
    process.exit();
}

gaze(program.files, (err, watcher) => {
    watcher.on('all', (evt, filepath) => {
        exec(program.run, (err, stdout, stderr) => {
            if (err) {
                console.error(`exec error: ${err}`);
                return;
            }
            process.stdout.write(stdout);
            process.stderr.write(stderr);
        });
    });
});