# generator-createjs-game

> [Yeoman](http://yeoman.io) generator

This is a Yeoman generator for making HTML5 Canvas games using the [CreateJS Suite](http://www.createjs.com/).

It uses [Gulp](http://gulpjs.com/) for task management and [Bower](https://bower.io/)
for library dependencies.

## Getting Started

### Install Yeoman

```bash
npm install -g yo
```

### Install the Generator

To install generator-createjs-game from npm, run:

```bash
npm install -g generator-createjs-game
```

### Use the Generator

Finally, initiate the generator. Navigate to your project directory, and run:

```bash
yo createjs-game
```

It will ask you for your project's name. This will be used for the 
`package.json` file's "`name`" property as well as to prefil the title for the
`index.html` file.

## Developing with the Generator

### Develop Gulp Task

The default Gulp task is the "dev" task. This task outputs to the
`.dev-temp` directory which is included in by the `.gitignore`.

It also turns on watchers for the JS, CSS, HTML and resources.

The output JavaScript and CSS is not minified in order to make
development and finding bugs easier.

### Distributing

You can create a release build of your project using "release",
"dist" or "build".

This will output to the `dist/` folder. The vender files will be
concatinated into one file called "vender.min.js". The other 
JavaScript files will be concatinated, minified and uglified into
"main.min.js".

## License

MIT
