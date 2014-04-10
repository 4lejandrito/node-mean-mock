var rekuire = require('rekuire');
var expect = rekuire('chai').expect;
var rest = rekuire('src/util/rest');
var express = rekuire('express');
var db = rekuire('src/db');
var MongoClient = require('mongodb').MongoClient

describe("DB", function () {   

    before(function(done) {
        MongoClient.connect('mongodb://localhost/node-mean-test', done);
    });

    it("should do something", function (done) {
        var data = {
            collection: [{}, {}]
        }
        db.start(data, function() {
            mapper.stop(done);
        });           
    });
});    
