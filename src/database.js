const low = require('lowdb');
const path = require('path');

function getUserHome() {
  return process.env.HOME || process.env.USERPROFILE;
}

const file = path.resolve(getUserHome(), '.gotodir.json');
const db = low(file);

db.defaults({ folders: [] }).value();

module.exports = db;
