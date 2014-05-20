var rekuire = require('rekuire');
var MongoClient = require('mongodb').MongoClient
var async = require('async');


module.exports = {

    apply: function(db, collections, cb) {
        var functions = [];
        for (var name in collections) {
            (function(name) {
                functions.push(function(cb) {
                    db.collection(name, function(err, collection) {
                        collection.remove({}, function() {
                            collection.insert(collections[name], cb);
                        });
                    });
                });
            })(name);
        }
        async.parallel(functions, cb);
    },

    start: function(uri, collections, cb) {
        var self = this;
        MongoClient.connect(uri, function(err, db) {
            self.apply(db, collections, cb);
        });
    },

    stop: function(cb) {
        cb();
    }
};