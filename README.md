cli-watch is a cmd tool to run shell while files changed.

## Install

`npm i -g cli-watch`

## Usage

`watch -f a.js -r 'uglifyjs a.js -o b.js'`

This command will watch `a.js`, and run `uglifyjs a.js -o b.js` when it changed. 

You can use glob patterns for the files param, such as:

`watch -f '*.js' -r 'uglifyjs ${p} -o ${n}.min.js'`


### Options

    -h, --help               output usage information
    -V, --version            output the version number
    -f, --files [value]      glob files pattern, use ; to separate multiple path
    -r, --run [value]        run command while files changed, you can use ${p} to instead of the changed file path, and use ${n} to instead of the name of changed file path without ext
    -n, --dontRunWhileStart  dont run the command while start watch