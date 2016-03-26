var fs = require('fs'); // file system
var outputData =
    fs.readFile('output.json', 'utf8', function(err, data){
      if (err) throw err;
      data = JSON.parse(data);

      var bracket = data[1].bracketName,
          percent = data[1].percent;
      return data;
      // res.send("<h1>First place is " + bracket + " at " + percent + "%</h1>");
    });
    // return;
    // console.log(returnData());
    // return returnData();
module.exports = outputData;