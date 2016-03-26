var mongodb = require('mongodb');
var getData = require('../modules/getdata.js');
var refreshme = true; // caching
// Create seed data
var cacheData = function(calling){
// !! Important !! Replace URI with your database URI
var uri = "mongodb://<dbuser>:<dbpassword>@ds021289.mlab.com:21289/heroku_nhtx2gzx";

mongodb.MongoClient.connect(uri, function(err, db) {
  if(err) throw err;
  var brackets = db.collection('brackets'); // Create if it doesn't exist

  var allData;

  function testDate(callbacks){
    brackets.find().sort('rank').toArray(function (err, docs) {
     if(err) throw err;
     allData = docs;
     if (allData.length < 1){
      new getData(logData); // Go get em when we're done, logData

      function logData(data, callback){
        allData = data;
        callbacks(allData);
      };
    } else {
       var modDate = new Date(allData[1].timestamp),
           now     = new Date(),
           timeout = 60*10*1000; // every ten min

        if ((now - modDate) > timeout && refreshme){ // If we need to refresh things
          console.log('Fetching New Data');
          new getData(logData); // Go get em when we're done, logData

          function logData(data, callback){
            allData = JSON.parse(data);
            // callback(data);
            typeof allData;
            callbacks(allData);
          };
        } else {
          console.log('Bypassed Fetch');
          calling(allData);
        }
      }
    });
  }
  testDate(updateIt);

  function updateIt(allData){
    function pushData(allData, callbackin){
      var parsed = allData;
      for (var i=0; i < parsed.length; i++){
        brackets.save(parsed[i], {w:1}, function(err, result) {
          if(err){
            console.log('Save response: ' + err);
          }
        });
      }
      callbackin(parsed);
    }
    pushData(allData, closerOut);
    function closerOut(parsed){
      db.close(function (err) {
        if(err) throw err;
      });
      calling(parsed);
    }
  }
  });
};
module.exports = cacheData;