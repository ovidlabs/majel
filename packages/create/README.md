# Majel Create

A CLI tool for rapidly scaffolding a new Majel server application. Heavily inspired by [create-react-app](https://github.com/facebook/create-react-app).

## Usage

Majel Create requires [Node.js](https://nodejs.org/en/) v8.9.0+ to be installed.

To create a new project, you may choose one of the following methods:

### npx

```sh
npx @majel/create my-app
```

_[npx](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b) comes with npm 5.2+ and higher._

### npm

```sh
npm init @majel my-app
```

_`npm init <initializer>` is available in npm 6+_

### Yarn

```sh
yarn create @majel my-app
```

_`yarn create` is available in Yarn 0.25+_

It will create a directory called `my-app` inside the current folder.

## Options

### `--use-npm`

By default, Majel Create will detect whether a compatible version of Yarn is installed, and if so will display a prompt to select the preferred package manager.
You can override this and force it to use npm with the `--use-npm` flag.

### `--log-level`

You can control how much output is generated during the installation and setup with this flag. Valid options are `silent`, `info` and `verbose`. The default is `silent`

Example:

```sh
npx @majel/create my-app --log-level verbose
```
