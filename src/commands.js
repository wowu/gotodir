const path = require('path');
const db = require('./database');
const chalk = require('chalk');
const leftPad = require('left-pad');

exports.addFolder = (name, folderPath = './') => {
  const absolutePath = path.resolve(folderPath);

  console.log(`\nAdded ${chalk.green(name)} with path ${chalk.yellow(absolutePath)}\n`);

  db
    .get('folders')
    .push({
      name,
      path: absolutePath,
      lastAccess: +new Date(),
    })
    .value();
};

exports.deleteFolder = name => {
  if (
    db
      .get('folders')
      .filter({ name })
      .size()
      .value()
  ) {
    db
      .get('folders')
      .remove({ name })
      .value();

    console.log(chalk.green.bold(`\nFolder "${name}" removed.\n`));
  } else {
    console.log(chalk.bold.red(`\nFolder "${name}" not found.\n`));
  }
};

exports.getPath = name => {
  if (!name) return;

  if (
    db
      .get('folders')
      .filter({ name })
      .size()
      .value()
  ) {
    const folder = db.get('folders').find({ name });
    folder.assign({ lastAccess: +new Date() }).value();
    const folderPath = folder.value().path;

    console.log(folderPath);
  } else {
    console.log();
  }
};

exports.findFolder = name => {
  if (
    db
      .get('folders')
      .filter({ name })
      .size()
      .value()
  ) {
    const folder = db.get('folders').find({ name });
    folder.assign({ lastAccess: +new Date() }).value();
    const folderPath = folder.value().path;

    console.log(folderPath);
  } else {
    console.log(chalk.bold.red(`\nFolder "${name}" not found.\n`));
  }
};

exports.getFolders = () => db.get('folders').value();

exports.showAllFolders = callback => {
  const folders = db.get('folders').value();

  // Sort folders by lastAccess
  folders.sort((a, b) => b.lastAccess - a.lastAccess);

  let maxLength = 0;

  // If there is any folder
  if (folders.length) {
    folders.forEach(folder => {
      if (folder.name.length > maxLength) {
        maxLength = folder.name.length;
      }
    });

    console.log();
    console.log(chalk.bold(leftPad('Available folders:', maxLength + 12)));

    folders.forEach(folder => {
      const name = leftPad(folder.name, maxLength + 2);
      console.log(`${chalk.green(name)}  (${chalk.yellow(folder.path)})`);
    });

    console.log();
  } else {
    callback();
  }
};
