var phantom = require('phantom'), // getting the html
     cheerio = require('cheerio'), // jquery for node
     express = require('express');


var getData = function(callback){

  // Replace the URL with the bracke that you want to scrape
  url = 'http://games.espn.go.com/tournament-challenge-bracket/2016/en/group?groupID=1316419';
  phantom.create().then(function(ph) {
    ph.createPage().then(function(page) {
      page.open(url).then(function(status) {
        console.log(status);
           setTimeout(function() { // give it some time to load
            page.property('content').then(function(content) {
              var $ = cheerio.load(content),
                      data = content,
                      json = [];

              $('.type_entries').filter(function(){
                var row = $(this).children('tbody').children('tr');
                    row.each(function(i){
                      var self = $(this),
                          rank = self.children('.rank').text().replace('*', ''),
                          bracket = self.find('.entry').text(),
                          person = self.find('.profileLink').text(),
                          percent = self.find('.percentile').text(),
                          timestamp = new Date(),
                          image;
                          if(!i == 0){
                            percent = Math.round(parseInt(percent));
                          }

                      json.push({
                        bracketName: bracket,
                        rank: rank,
                        _id: bracket,
                        timestamp: timestamp,
                        person: person,
                        percent: percent
                      })
                    });
              });
              page.close();
              ph.exit();
              var bracketData = JSON.stringify(json, null, 4);
              callback(bracketData);
            });
           }, 2000);
      });
    });
  });
};

module.exports = getData;
