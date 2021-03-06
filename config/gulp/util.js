
'use strict';

/**
 * Module dependencies
 */
var _    = require('lodash'),
  fs     = require('fs'),
  path   = require('path'),
  config = require('./config');

_.mixin({

  runCallback: function (done) {
    return function (err) {
      if (!err) {
        done();
      }
    };
  },

  getJsHintOptions: function (asPlatoOptions) {
    var filepath = path.join(config.base, '.jshintrc');
    var json = JSON.parse(fs.readFileSync(filepath, 'utf8'));
    if (json && asPlatoOptions) {
      json = {
        options: json,
        globals: json.globals
      };
      delete json.options.globals;
    }
    return json;
  },

  loadJson: function (filepath) {
    return JSON.parse(fs.readFileSync(filepath, 'utf8'));
  },

  saveJson: function (filepath, json) {
    fs.writeFileSync(filepath, JSON.stringify(json, null, '  '));
  },

  updateJson: function (path, callback) {
    var json = _.loadJson(path);
    json = callback(json);
    _.saveJson(path, json);
  },

  getPackage: function () {
    // using fs to prevent caching
    return this.loadJson(path.join(config.base, 'package.json'));
  }

});

module.exports = _;
