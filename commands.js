'use strict';

var fs = require('fs');
var request = require('request');

function done (output) {
    process.stdout.write(output);
    process.stdout.write('\nprompt > ');
  }

function fileOper (fileName, func) {
  fs.readFile(fileName, function(err, data) {
    if (err) {
      done("ERROR: Invalid File Name");
    } else {
      var output = func(data);
      done(output);
    }
  });
}

function cat (fileName) {
  var catFunc = function (data) {
    return data.toString();
  };
  fileOper(fileName, catFunc);
}

function curl (url) {
  request(url, function (error, response, body) {
    if (error) {
      done("ERROR: " + error.message);
    } else if (response.statusCode != 200) {
      done("STATUS CODE: " + response.statusCode);
    } else {
      done(body);
    }
  });
}

function date () {
  var date = new Date();
  var dateStr = date.toString();
  done(dateStr);
}

function echo (str) {
  try {
    done(str);
  } catch(e) {
    done("ERROR: echo takes 1 argument; none provided");
  }
}

function head (fileName) {
  var printHead = function(data) {
    var lines = data.toString().split("\n");
    var firstTenLines;
      
    if (lines.length < 10) {
      firstTenLines = data.toString();
    } else {
      firstTenLines = lines.slice(0,10).join("\n");
    }
    return firstTenLines;
  };
  fileOper(fileName, printHead);
}

function ls () {
  fs.readdir('.', function(err, files) {
    var output = "";
    if (err) throw err;
    files.forEach(function(file) {
      output += file.toString() + "\n";
    });
    done(output);
  });
}

function pwd () {
  done(process.cwd());
}

function sort (fileName) {
  var sortByLine = function(data) {
    var lines = data.toString().split("\n");
    lines.sort();
    return lines.join("\n");
  };
  fileOper(fileName, sortByLine);
}

function tail (fileName) {
  var printTail = function(data) {
    var lines = data.toString().split("\n");
    var lastTenLines;

    if (lines.length < 10) {
      lastTenLines = data.toString();
    } else {
      lastTenLines = lines.slice(-10).join("\n");
    }

    return lastTenLines;
  };
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
    }
    return output.join("\n");
  };
  fileOper(fileName, makeUnique);
}

function wc (fileName) {
  var countLines = function(data) {
    var lines = data.toString().split("\n");
    return lines.length.toString();
  };
  fileOper(fileName, countLines);
}

module.exports = {
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