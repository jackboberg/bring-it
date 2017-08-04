# instagit

[![Greenkeeper badge](https://badges.greenkeeper.io/jackboberg/instagit.svg)](https://greenkeeper.io/)

[![version](https://img.shields.io/npm/v/instagit.svg?style=flat-square)][version]
[![build](https://img.shields.io/travis/jackboberg/instagit.svg?style=flat-square)][build]
[![coverage](https://img.shields.io/codeclimate/coverage/github/jackboberg/instagit.svg?style=flat-square)][coverage]
[![code climate](https://img.shields.io/codeclimate/github/jackboberg/instagit.svg?style=flat-square)][climate]
[![license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)][license]

Simplifies installing and adding multiple npm modules to your git repository.

## Usage

`instagit lab code standard -D`

## Why

I love a pretty git log, but I got tired of typing stuff like this:

```sh
> npm install lab --save-dev
> git add package.json
> git commit -m "Add lab@6.2.0 to devDependencies"
> npm install code --save-dev
> git add package.json
> git commit -m "Add code@1.4.1 to devDependencies"
> npm install standard --save-dev
> git add package.json
> git commit -m "Add standard@5.3.1 to devDependencies"

```

## Install

`npm install instagit --global`


## Node API

```
const Instagit = require('instagit')
Instagit(modules, options, done)
```

#### Parameters

- `modules` modules to install (String || Array)
- `options` command line options [Optional] (String || Array)
- `done` yields Error and Boolean (Function)


[version]: https://www.npmjs.com/package/instagit
[build]: https://travis-ci.org/jackboberg/instagit
[coverage]: https://codeclimate.com/github/jackboberg/instagit/coverage
[climate]: https://codeclimate.com/github/jackboberg/instagit/code
[license]: https://raw.githubusercontent.com/jackboberg/instagit/master/LICENSE
