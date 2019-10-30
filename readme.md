# GoToDir 🏃

A command line app for fast directory switching ⚡️

![GoToDir gif](https://raw.githubusercontent.com/Wowu/gotodir/master/.github/gotodir.gif)

## Installation

### Install gotodir package

```bash
$ npm install -g gotodir
# or
$ yarn global add gotodir
```

### ❗ Important! Create an alias

Add this line to .bashrc or .zshrc.

```bash
alias to=". gotodir"
```

Restart your shell.

Without this alias you have to type `. gotodir` each time you use this app.

### Setup shell autocompletion

```bash
$ to --setup
```

Restart your shell.

## Usage

#### Adding current folder to gotodir

```bash
$ cd /sample/long/and/complicated/path/to/project
$ to add
#=> Added "project" with path /sample/long/and/complicated/path/to/project


# or pass custom name name

$ to add super_project
#=> Added "super_project" with path /sample/long/and/complicated/path/to/project


# or pass custom name and path

$ to add another_project /different/path/to/project
#=> Added "another_project" with path /different/path/to/project
```

#### Showing all added folders

```bash
to

#=>
#
#          Available folders:
#          project1  (/sample/long/and/complicated/path)
#   another_project  (/different/path/to/project)
#
```

#### Changing current folder

```bash
$ pwd
#=> /home/user
$ to project1
$ pwd
#=> /sample/long/and/complicated/path
```



#### Removing folder from gotodir

```bash
to rm project1
#=> Folder "project1" removed.
```

#### Changing folder name inside gotodir

```bash
to mv project1 project2
#=> Renamed "project1" to "project2".
```
