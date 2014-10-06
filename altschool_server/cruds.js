//cruds.js
'use strict';

var ObjectID    = require('mongodb').ObjectID,
    merge       = require('merge'),
    schema      = require('./schema');

var Cruds = function(db) {
        this.db = db;
    };

Cruds.prototype.save = function(collectionName, obj, callback) {
    console.log('obj', obj);
    this.getCollection(collectionName, function(error, the_collection) { //A
        if( error ) callback(error);
        else {
            obj._id = ObjectID();
            obj.created_at = new Date(); //B
            var document = merge(schema.user, obj);
            the_collection.insert(document, {safe: true}, function(err, result) { //C
                callback(err, result);
            });
        }
    });
};

exports.Cruds = Cruds;