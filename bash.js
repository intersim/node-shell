//console.log(Object.keys(process));

process.stdout.write('prompt > ');

process.stdin.on('data', function(data) {
	var cmd = data.toString().trim();

  if (cmd === 'date') {
    var date = new Date();
    var dateStr = date.toString();
    process.stdout.write(dateStr);
  };

  if (cmd === 'pwd') {
    process.stdout.write(process.cwd());
  };

	process.stdout.write('\nprompt > ');

});
