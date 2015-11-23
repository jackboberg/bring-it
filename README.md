# instagit

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


