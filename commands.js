'use strict';

var fs = require('fs');
var request = require('request');

function done (output, otherCmds) {
    if (otherCmds.length > 0) {
      var nextCmd = otherCmds.shift();
      functions[nextCmd](null, output, otherCmds);
    } else {
      process.stdout.write(output);
      process.stdout.write('\nprompt > ');
    }
}

function fileOper (fileName, func, otherCmds) {
  fs.readFile(fileName, (err, data) => {
    if (err) {
      done("ERROR: Invalid File Name");
    } else {
      var output = func(data);
      done(output, otherCmds);
    }
  });
}

function cat (fileName, stdin, otherCmds) {
  if (stdin) {
    done(stdin, otherCmds);
  } else {
    var catFunc = function (data) {
      return data.toString();
    };
    fileOper(fileName, catFunc, otherCmds);
  }
}

function curl (url, stdin, otherCmds) {
  request(url, function (error, response, body) {
    if (error) {
      done("ERROR: " + error.message);
    } else if (response.statusCode != 200) {
      done("STATUS CODE: " + response.statusCode);
    } else {
      done(body, otherCmds);
    }
  });
}

function date (args, stdin, otherCmds) {
  var date = new Date();
  var dateStr = date.toString();
  done(dateStr, otherCmds);
}

function echo (str, stdin, otherCmds) {
  try {
    done(str, otherCmds);
  } catch(e) {
    done("ERROR: echo takes 1 argument; none provided");
  }
}

function head (fileName, stdin, otherCmds) {
  var getTenLines = function(str) {
    var lines = str.split("\n");
    var firstTenLines;
      
    if (lines.length < 10) {
      firstTenLines = data.toString();
    } else {
      firstTenLines = lines.slice(0,10).join("\n");
    }
    return firstTenLines;
  }

  if (stdin) {
    done(getTenLines(stdin), otherCmds);
  } else {
    var printHead = function(data) {
      var str = data.toString();
      return getTenLines(str);
    };
    fileOper(fileName, printHead, otherCmds);
  } 
}

function ls (args, stdin, otherCmds) {
  fs.readdir('.', function(err, files) {
    var output = "";
    if (err) throw err;
    files.forEach(function(file) {
      output += file.toString() + "\n";
    });
    done(output, otherCmds);
  });
}

function pwd (args, stdin, otherCmds) {
  done(process.cwd(), otherCmds);
}

function sort (fileName, stdin, otherCmds) {
  var getSortedLines = function(str) {
    var lines = str.split("\n");
    lines.sort();
    return lines.join("\n");
  }

  if (stdin) {
    done(getSortedLines(stdin), otherCmds);
  } else {
    var sortByLine = function(data) {
      var str = data.toString();
      return getSortedLines(str);
    };
    fileOper(fileName, sortByLine, otherCmds);
  }
}

function tail (fileName, stdin, otherCmds) {
  var getTail = function(str) {
      var lines = str.split("\n");
      var lastTenLines;

      if (lines.length < 10) {
        lastTenLines = str;
      } else {
        lastTenLines = lines.slice(-10).join("\n");
      }
      return lastTenLines;
  }

  if (stdin) {
    done(getTail(stdin), otherCmds);
  } else {
    var printTail = function(data) {
      var str = data.toString();
      return getTail(str);
    };
    fileOper(fileName, printTail, otherCmds);
  }
}

function uniq (fileName, stdin, otherCmds) {

  var getUniq = function(str) {
    var lines = str.split("\n");
    var output = [];
    for (var i = 0; i < lines.length - 1; i++) {
      if (lines[i] !== lines[i+1]) {
        output.push(lines[i]);
      }
    }
    return output.join("\n");
  }

  if (stdin) {
    done(getUniq(stdin), otherCmds);
  } else {
    var makeUnique = function (data) {
      var str = data.toString();
      return getUniq(str);
    };
    fileOper(fileName, makeUnique, otherCmds);
  }
}

function wc (fileName, stdin, otherCmds) {

  var getCount = function(str) {
    var lines = str.split("\n");
    return lines.length.toString();
  }

  if (stdin) {
    done(getCount(stdin), otherCmds)
  } else {
    var countLines = function(data) {
      var lines = data.toString()
    };
    fileOper(fileName, countLines, otherCmds);
  }
}

var functions = {
  done: done,
  cat: cat,
  curl: curl,
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

module.exports = functions;