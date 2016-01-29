# Ever & Ever React.js Boilerplate


## System Requirements

- Node.js (<http://nodejs.org/>)


## Local Setup

Set up **local.example.com** to point to **/build** in MAMP or similar

Get the latest version of the code:

```console
$ git clone git@bitbucket.org:everandever/react-boilerplate.git
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