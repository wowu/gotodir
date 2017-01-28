'use strict';

var path = require('path');
var db = require('./database');
var chalk = require('chalk');
var leftPad = require('left-pad');

exports.addFolder = function (name) {
  var folderPath = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : './';

  var absolutePath = path.resolve(folderPath);

  console.log('\nAdded ' + chalk.green(name) + ' with path ' + chalk.yellow(absolutePath) + '\n');

  db.get('folders').push({
    name: name,
    path: absolutePath,
    lastAccess: +new Date()
  }).value();
};

exports.deleteFolder = function (name) {
  if (db.get('folders').filter({ name: name }).size().value()) {
    db.get('folders').remove({ name: name }).value();

    console.log(chalk.green.bold('\nFolder "' + name + '" removed.\n'));
  } else {
    console.log(chalk.bold.red('\nFolder "' + name + '" not found.\n'));
  }
};

exports.getPath = function (name) {
  if (!name) return;

  if (db.get('folders').filter({ name: name }).size().value()) {
    var folder = db.get('folders').find({ name: name });
    folder.assign({ lastAccess: +new Date() }).value();
    var folderPath = folder.value().path;

    console.log(folderPath);
  } else {
    console.log();
  }
};

exports.findFolder = function (name) {
  if (db.get('folders').filter({ name: name }).size().value()) {
    var folder = db.get('folders').find({ name: name });
    folder.assign({ lastAccess: +new Date() }).value();
    var folderPath = folder.value().path;

    console.log(folderPath);
  } else {
    console.log(chalk.bold.red('\nFolder "' + name + '" not found.\n'));
  }
};

exports.getFolders = function () {
  return db.get('folders').value();
};

exports.showAllFolders = function (callback) {
  var folders = db.get('folders').value();

  // Sort folders by lastAccess
  folders.sort(function (a, b) {
    return b.lastAccess - a.lastAccess;
  });

  var maxLength = 0;

  // If there is any folder
  if (folders.length) {
    folders.forEach(function (folder) {
      if (folder.name.length > maxLength) {
        maxLength = folder.name.length;
      }
    });

    console.log();
    console.log(chalk.bold(leftPad('Available folders:', maxLength + 12)));

    folders.forEach(function (folder) {
      var name = leftPad(folder.name, maxLength + 2);
      console.log(chalk.green(name) + '  (' + chalk.yellow(folder.path) + ')');
    });

    console.log();
  } else {
    callback();
  }
};