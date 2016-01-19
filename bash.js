var commands = require('./commands');

process.stdout.write('prompt > ');

process.stdin.on('data', function(data) {
  var input = data.toString().trim();
	var cmd = input.split(" ")[0];

  if (input.indexOf(" ") > -1) {
    var args = input.split(" ").slice(1).join(" ");
  }

  try {
    commands[cmd](args);
  } catch(e) {
    commands.done("ERROR: Invalid Command");
  }

});
