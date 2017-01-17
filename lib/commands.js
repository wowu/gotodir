const path = require('path');
const db = require('./database');
const chalk = require('chalk');
const leftPad = require('left-pad');

exports.addFolder = (name, folderPath = './') => {
  const absolutePath = path.resolve(folderPath);

  console.log(`\nAdded ${chalk.green(name)} with path ${chalk.yellow(absolutePath)}\n`);

  db.get('folders').push({
    name: name,
    path: absolutePath
  }).value();
}

exports.deleteFolder = (name) => {
  if (db.get('folders').filter({name: name}).size().value()) {
    db.get('folders').remove({name: name}).value();

    console.log(chalk.green.bold(`\nFolder "${name}" removed.\n`));
  } else {
    console.log(chalk.bold.red(`\nFolder "${name}" not found.\n`));
  }
}

exports.getPath = (name) => {
  if (!name) return;

  if (db.get('folders').filter({name: name}).size().value()) {
    const folder_path = db.get('folders').find({name: name}).value().path;
    console.log(folder_path);
  } else {
    console.log();
  }
}

exports.findFolder = (name) => {
  if (db.get('folders').filter({name: name}).size().value()) {
    const folder_path = db.get('folders').find({name: name}).value().path;

    console.log(folder_path);
  } else {
    console.log(chalk.bold.red(`\nFolder "${name}" not found.\n`));
  }
}

exports.getFolders = () => {
  return folders = db.get('folders').value();
}

exports.showAllFolders = (callback) => {
  const folders = db.get('folders').value();
  var maxLength = 0;

  // If there is any folder
  if (folders.length) {
    for (var folder of folders) {
      if (folder.name.length > maxLength) {
        maxLength = folder.name.length;
      }
    }

    console.log();
    console.log(chalk.bold(leftPad('Available folders:', maxLength + 12)));

    for (var folder of folders) {
      var name = leftPad(folder.name, maxLength + 2);
      console.log(`${chalk.green(name)}  (${chalk.yellow(folder.path)})`);
    }

    console.log();
  } else {
    callback();
  }
}
