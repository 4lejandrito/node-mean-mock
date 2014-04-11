var rekuire = require('rekuire');
var MongoClient = require('mongodb').MongoClient
var async = require('async');

var apply = function(db, collections, cb) {
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
}

module.exports = {

    start: function(uri, collections, cb) {
        if (typeof uri == 'string') {
            MongoClient.connect(uri, function(err, db) {
                apply(db, collections, cb);
            });
        } else {
            apply(uri, collections, cb);
        }
    },

    stop: function(cb) {
        cb();
    }
};