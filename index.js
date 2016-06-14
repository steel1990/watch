#!/usr/bin/env node

const gaze = require('gaze');
const program = require('commander');
const debug = require('debug')('index');
const pkg = require('./package.json');
const exec = require('child_process').exec;

program
    .version(pkg.version)
    .option('-f, --files [value]', 'glob files pattern，多个使用;分隔')
    .option('-r, --run [value]', 'run command white file changed')
    .parse(process.argv);

if (!program.files || !program.run) {
    console.log('files and run cmd can not be null');
    process.exit();
}

debug('files', program.files);
debug('run', program.run);

gaze(program.files.split(';'), (err, watcher) => {
    debug('start success', watcher.relative());
    watcher.on('all', (evt, filepath) => {
        debug('file changed', filepath);
        exec(program.run, (err, stdout, stderr) => {
            if (err) {
                debug('cmd run error');
                console.error(`exec error: ${err}`);
                return;
            }
            debug('cmd run done');
            process.stdout.write(stdout);
            process.stderr.write(stderr);
        });
    });
});