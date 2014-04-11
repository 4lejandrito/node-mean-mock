var rekuire = require('rekuire');
var MongoClient = require('mongodb').MongoClient
var async = require('async');

module.exports = {

    start: function(uri, collections, cb) {
        MongoClient.connect(uri, function(err, db) {
            var functions = [];
            for (var name in collections) {
                functions.push(function(cb) {
                   db.collection(name, function(err, collection) {
                        collection.remove({}, function() {
                            collection.insert(collections[name], cb);
                        });
                    });
                });
            }
            async.parallel(functions, cb);
        });
    },

    stop: function(cb) {
        cb();
    }
};