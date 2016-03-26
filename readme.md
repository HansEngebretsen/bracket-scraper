## Basic Node scraper
Uses node.js and phantomjs to scrape ESPN's Bracket Tournament website, cache and reformat the results to display them within a custom UI.Depends on having a mongo DB to hook up to for caching.
Check out the live [demo](https://den-madness.herokuapp.com/) on Heroku.

#### Getting Started
Assuming you've got node installed, you'll need to run `npm install` and `grunt` to startup the node server, and generate the appropriate files.

There are two files that you'll want to change right of the bat.
  + If the app is scraping anything besides the ESPN bracket challenge you'll want to do some heavy work on 'getdata.js', which scrapes and structures the Data. Otherwise, you'll still want to change the URL of which bracket you're scraping.
  + In cachedata.js you'll want to set the URI variable to the MONGOLAB_URI of your database more on that [here](https://devcenter.heroku.com/articles/mongolab#getting-your-connection-uri)

#### App Structure
+ App.js   - this is our main application javascript, it starts the party
+ Procfile - this is what tells heroku what to run
+ src/     - our client side source sass & js
+ views/   - jade files & template that generates our HTML and integrates data
+ routes/  - since we're a single page, our main route file, passes data into templates
+ public/  - all of our generated css/js and static files
+ modules/ - functions/modules used in the node app.
