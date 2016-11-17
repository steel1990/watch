#!/usr/bin/env node

const gaze = require('gaze');
const program = require('commander');
const shell = require('shelljs');
const path = require('path');
const debug = require('debug')('cli-watch');
const pkg = require('./package.json');

program
    .version(pkg.version)
    .option('-f, --files [value]', 'glob files pattern, use ; to separate multiple path')
    .option('-r, --run [value]', 'run command while files changed, you can use ${p} to instead of the changed file path, and use ${n} to instead of the name without extension')
    .option('-n, --dontRunWhileStart', 'dont run the command while start watch')
    .parse(process.argv);

if (!program.files || !program.run) {
    console.log('files and run cmd can not be null');
    process.exit();
}

debug('files', program.files);
debug('run', program.run);

function run(changedPath) {
    debug('run', changedPath);
    var cmd = program.run;
    if (changedPath) {
        cmd = cmd.replace(/\$\{p\}/g, `"${changedPath}"`);
        var name = path.basename(changedPath, path.extname(changedPath));
        cmd = cmd.replace(/\$\{n\}/g, `${name}`);
    } else if (/\$\{p\}/.test(cmd)) {
        debug('run', 'Dont run the cmd because of it need changed file path');
        return;
    }
    console.log('Running:', cmd);
    shell.exec(cmd);
    debug('run', 'end');
}

if (!program.dontRunWhileStart) {
    run();
}

gaze(program.files.split(';'), (err, watcher) => {
    debug('start success', watcher.relative());
    watcher.on('all', (evt, filepath) => {
        debug('file changed', filepath);
        run(filepath);
    });
});