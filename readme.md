# GoToDir

A command line app for fast directory switch.

## Installation

### Install gotodir package

```bash
$ npm install -g gotodir
# or
$ yarn global install gotodir
```

### **Important!** Create an alias

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
$ cd /sample/long/and/complicated/path
$ to add project1
#=> Added project1 with path /sample/long/and/complicated/path

# or

$ to add project1 /sample/long/and/complicated/path
#=> Added project1 with path /sample/long/and/complicated/path
```

#### Show all added folders

```bash
to
```

#### Remove folder from gotodir

```bash
to rm project1
#=> Folder "project1" removed.
```
