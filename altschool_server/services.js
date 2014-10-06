//services.js
'use strict';
console.log('services loaded');

var config          = require('./config');

//DB setup
var MongoClient = require('mongodb').MongoClient,
    Server      = require('mongodb').Server,
    Cruds       = require('./cruds').Cruds,
    prod        = false,
    mongoHost   = 'localhost',
    mongoPort   = 27017,
    cruds;

var mongoClient = new MongoClient(new Server(mongoHost, mongoPort));

mongoClient.open(function(err, mongoClient) {
    if (!mongoClient) {
        console.error("Error! Exiting... Must start MongoDB first");
        process.exit(1);
    }
    var db = mongoClient.db('altdb01');
    cruds = new Cruds(db);
});


exports.update = function(req, res, next){
    console.log('update request', content);

//    cruds.save('users', fb_obj, function(err, docs) {
//        if (err) {
//            console.log(err);
//        } else {
//            console.log('callback result', docs);
//        }
//    });

    res.jsonp({update: 'okay'});
    next();
};


