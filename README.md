# Ever & Ever Flat Boilerplate

Replicates development folder structure for dynamic products. <br>

## Features
**Gulp** <br>
**Styles** - SASS with Bourbon <br>
**Scripts** - Need copy it manually in build for now <br>


## System Requirements

- Node.js (<http://nodejs.org/>)


## Local Setup

Set up **local.example.com** to point to **/build** in MAMP or similar<br>
Manually create a bower_compontents folder in root.<br>

Get the latest version of the code:

```console
$ git clone git@bitbucket.org:everandever/flat-boilerplate.git
$ cd react-boilerplate/
```

Install packages:

```console
$ bower install
$ npm install
```

**Watch** for changes and build continuously with Gulp. Will use React development version:

```console
$ npm run serve
```

For release, **build** a single minified production package. Will use React production version and minify code:

```console
$ npm run build
```

On OSX 10.10 and older, if you receive error "Error: EMFILE, open". Run this code in your console:

```console
$ ulimit -n 10000
```