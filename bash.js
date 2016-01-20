var commands = require('./commands');

process.stdout.write('prompt > ');

process.stdin.on('data', function(data) {
  var input = data.toString().trim();
  var cmd = input.split(" ")[0];

  if (input.indexOf(" ") > -1) {
    var args = input.split(" ").slice(1).join(" ");
  }

  if (input.indexOf('|') > -1) {
    var cmdList = args.split(/\s*\|\s*/g);
    var otherCmds = cmdList.slice(1);
    args = cmdList[0];
    // console.log("otherCmds: ", otherCmds, "args: ", args);
  }

  if (args[0] === "$") {
    args = process.env[args.slice(1)];
  }

  commands.otherCmds = otherCmds;




  try {
    commands[cmd](args, null, otherCmds);
  } catch(e) {
    commands.done("ERROR: Invalid Command");
  }

});
