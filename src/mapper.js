var express = require('express');

module.exports = {

    start: function(port, mappings, cb) {
        var mapper = express();

        for (var key in mappings) {
            (function(path) {
                mapper.get(path, function(req, res) {
                    for (var header in mappings[path].headers) {
                        res.setHeader(header, mappings[path].headers[header]);
                    }
                    res.send(mappings[path].data);
                });
            })(key);
        }

        mapper.all('*', function(req, res) {
            res.send(404, 'unknown mapping');
        });

        this.server = mapper.listen(port);

        this.server.on('listening', cb);
    },

    stop: function(cb) {
        this.server.close(cb);
    }
};