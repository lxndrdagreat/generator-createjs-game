'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

var CreatejsGameGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the Createjs Game generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'projectName',
      message: "Your game's name",
      default: this.appname
    }];

    this.prompt(prompts, function (props) {
      this.projectName = props.projectName;

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      // this.dest.mkdir('app');
      // this.dest.mkdir('app/templates');

      var fixedName = this.projectName.toLowerCase().replace(/\s/g, '-');

      // this.src.copy('_package.json', 'package.json');
      this.template(
        '_package.json',
        'package.json',
        { projectName: fixedName });
      this.src.copy('_gulpfile.js', 'gulpfile.js');
      this.src.copy('_bower.json', 'bower.json');
    },

    projectfiles: function () {
      this.src.copy('editorconfig', '.editorconfig');
      this.src.copy('jshintrc', '.jshintrc');
      this.src.copy('bowerrc', '.bowerrc');
      this.src.copy('gitignore', '.gitignore');

      this.directory('src', 'src');
      this.template(
        'src/html/index.html',
        'src/html/index.html',
        { projectName: this.projectName});
    }
  },

  end: function () {
    this.installDependencies();
  }
});

module.exports = CreatejsGameGenerator;
