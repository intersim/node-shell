#node-shell

Workshop exercise completed by [Emily Intersimone](http://www.github.com/intersim) and [Alexandra Polubiec](http://www.github.com/paloobi) for Grace Hopper Academy.

A Node shell that mimics the basic functionality of a unix-style shell.

To run the shell:

  1. Run `node bash.js` in your terminal
  2. Enter commands and enjoy!


##Setup

This project requires:

  * npm
  * node.js

To install dependencies:

  1. Clone the repo
  2. Run `npm install`

##Features

It has the following features:

  * `cat` - prints a file or stdin
  * `curl` - prints response to HTTP request
  * `date` - prints current date (no formatting arguments provided)
  * `echo` - prints a string
  * `head` - prints first 10 lines of a file or stdin
  * `ls` - lists files in current working directory
  * `pwd` - prints the current working directory
  * `sort` - prints file or stdin, sorted alphabetically by line
  * `tail` - prints last 10 lines of a file or stdin
  * `uniq` - prints lines in file or stdin that are not repeated twice
  * `wc` - prints amount of lines in a file or stdin

Commands that take stdin can be run on stdin of another command using: `|`.

For example, the following command would print the first 10 lines of file.txt:

```
cat file.txt | head

```

##Contribute

- Issue Tracker: https://github.com/intersim/node-shell/issues
- Source Code: https://github.com/intersim/node-shell

##Support

If you are having issues, please let us know!

Send feedback/concerns to Alex at: alexandra.polubiec@gmail.com
