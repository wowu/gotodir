# Goto

A command line app for fast directory changing.

## Installation

### Install goto package

```bash
$ npm install -g goto
# or
$ yarn global install goto
```

### **Important!** Create an alias

Add this line to .bashrc or .zshrc.

```bash
alias to=". goto"
```

Restart your shell.

Without this alias you have to type `. goto` each time you use this app.

### Setup shell autocompletion

```bash
$ to --setup
```

Restart your shell.

## Usage

#### Adding current folder to goto

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

#### Remove folder from goto

```bash
to rm project1
#=> Folder "project1" removed.
```
