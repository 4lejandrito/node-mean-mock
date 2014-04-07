var express = require('express');

module.exports = {

    apply: function(app, mappings) {
        for (var key in mappings) {
            (function(path) {
                app.get(path, function(req, res) {
                    for (var header in mappings[path].headers) {
                        res.setHeader(header, mappings[path].headers[header]);
                    }
                    res.send(mappings[path].data);
                });
            })(key);
        }

        app.all('*', function(req, res) {
            res.send(404, 'unknown mapping');
        });        
    },

    start: function(port, mappings, cb) {
        var app = express();
        
        this.apply(app, mappings);

        this.server = app.listen(port);

        this.server.on('listening', cb);
    },

    stop: function(cb) {
        this.server.close(cb);
    }
};