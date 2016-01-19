var fs = require('fs');

function prompt () {
  process.stdout.write('\nprompt > ');
}

function fileOper (fileName, func) {
  fs.readFile(fileName, function(err, data) {
    if (err) {
      console.error("ERROR: Invalid File Name");
    } else {
      func(data);
    }
    prompt();
  })
}

function cat (fileName) {
  var catFunc = function (data) {
    process.stdout.write(data.toString());
  }
  fileOper(fileName, catFunc);
}

function date () {
  var date = new Date();
  var dateStr = date.toString();
  process.stdout.write(dateStr);
  prompt();
}

function echo (str) {
  try {
    process.stdout.write(str);
  } catch(e) {
    console.error("ERROR: echo takes 1 argument; none provided");
  }
  prompt();
}

function head (fileName) {
  var printHead = function(data) {
    var lines = data.toString().split("\n");
    var firstTenLines;
      
    if (lines.length < 10) {
      firstTenLines = data.toString()
    } else {
      firstTenLines = lines.slice(0,10).join("\n");
    }
    process.stdout.write(firstTenLines);
  }

  fileOper(fileName, printHead);
}

function ls () {
  fs.readdir('.', function(err, files) {
    if (err) throw err;
    files.forEach(function(file) {
      process.stdout.write(file.toString() + "\n");
    })
    prompt();
  })
}

function pwd () {
  process.stdout.write(process.cwd());
  prompt();
}

function sort (fileName) {
  var sortByLine = function(data) {
    var lines = data.toString().split("\n");
    lines.sort();
    process.stdout.write(lines.join("\n"));
  }

  fileOper(fileName, sortByLine);
}

function tail (fileName) {
  var printTail = function(data) {
    var lines = data.toString().split("\n");
    var lastTenLines;

    if (lines.length < 10) {
      lastTenLines = data.toString()
    } else {
      lastTenLines = lines.slice(-10).join("\n");
    }

    process.stdout.write(lastTenLines);
  }
  fileOper(fileName, printTail);
}

  function uniq (fileName) {
    var makeUnique = function (data) {
      var lines = data.toString().split("\n");
      var output = [];
      for (var i = 0; i < lines.length - 1; i++) {
        if (lines[i] !== lines[i+1]) {
          output.push(lines[i]);
        }
      };
      process.stdout.write(output.join("\n"));
    }
    fileOper(fileName, makeUnique);
  }

function wc (fileName) {
  var countLines = function(data) {
    var lines = data.toString().split("\n");
    process.stdout.write(lines.length.toString());
  }
  fileOper(fileName, countLines);
}

module.exports = {
  prompt: prompt,
  cat: cat,
  date: date,
  echo: echo,
  head: head,
  ls: ls,
  pwd: pwd,
  sort: sort,
  tail: tail,
  uniq: uniq,
  wc: wc
};