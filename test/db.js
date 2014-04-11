var rekuire = require('rekuire');
var expect = rekuire('chai').expect;
var mockdb = rekuire('src/mock').db;
var MongoClient = require('mongodb').MongoClient;

describe("DB", function () {

    var uri = 'mongodb://localhost/node-mean-test';

    it("should insert a collection when started", function (done) {
        var data = {
            collection: [{test: 1}, {test: 2}]
        }
        mockdb.start(uri, data, function() {
            MongoClient.connect(uri, function(err, db) {
                db.collection('collection').find().toArray(function(err, items) {
                    expect(items).to.have.length(2);
                    expect(items[0]).to.have.property('test').and.equal(1);
                    expect(items[1]).to.have.property('test').and.equal(2);
                    mockdb.stop(done);
                });
            });
        });
    });

    it("should also work when passed an existing mongo db object", function (done) {
        var data = {
            collection: [{test: 1}, {test: 2}]
        }
        MongoClient.connect(uri, function(err, db) {
            mockdb.start(db, data, function() {
                db.collection('collection').find().toArray(function(err, items) {
                    expect(items).to.have.length(2);
                    expect(items[0]).to.have.property('test').and.equal(1);
                    expect(items[1]).to.have.property('test').and.equal(2);
                    mockdb.stop(done);
                });
            });
        });
    });
});
