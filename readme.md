
# Notal
[![Build Status](https://img.shields.io/travis/setherizor/sp.svg)](https://travis-ci.org/Setherizor/sp.svg?branch=master)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)
![](https://img.shields.io/npm/l/express.svg)
> Package for memorizing and aliasing commands 💖💻💻💖

## Install
```
$ npm install notal
```

## Usage
```bash
user@host:~/home/$ notal --help
```

## API
```bash

  Usage: notal [command name] OR [options]

  Options:

    -V, --version   output the version number
    -h, --help      output usage information

  Commands:

    list|l          List all the commands entered
    new|n [cmd]     Add new command entry
    edit|e [cmd]    Edit existing entry
    delete|d [cmd]  Delete existing entry
    clear|c         Clear all entries
    *               Execute the passed in command
```

## License
MIT © [Seth Parrish](https://setherizor.github.io)