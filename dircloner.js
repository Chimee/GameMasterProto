var fs = require('fs');
var path = require('path');
var indat = {};
function readFiles(dirname, onFileContent, onError) {
  fs.readdir('./public/', function(err, filenames) {
    if (err) {
      onError(err);
      return;
    }
    filenames.forEach(function(filename) {
      fs.readFile(path.resolve('./public/' + filename), 'utf-8', function(err, content) {
        if (err) {
          onError(err);
          return;
        }
        onFileContent(filename);
		indat[filename] = filename
		console.log(indat);

      });
	  var filelist = fs.createWriteStream('dirfilesin.txt').write(filename);
    });
	
  });
}


var data = {};
var filelist = fs.createWriteStream('dirfiles.txt');
readFiles(path.resolve(__dirname, 'dirname/'), function(filename) {
  data[filename] = filename;
  console.log(data);
  filelist.write("['" + filename + "'" + ", " + "'" + filename + "'], ");
}, function(err) {
  throw err;
});

