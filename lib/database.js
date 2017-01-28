'use strict';

var low = require('lowdb');
var path = require('path');

function getUserHome() {
  return process.env.HOME || process.env.USERPROFILE;
}

var file = path.resolve(getUserHome(), '.goto.json');
var db = low(file);

db.defaults({ folders: [] }).value();

module.exports = db;