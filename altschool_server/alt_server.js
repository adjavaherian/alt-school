//alt_server.js

'use strict';

var http            = require('http'),
    restify         = require('restify'),
    config          = require('./config'),
    services        = require('./services'),
    fs              = require('fs');


//ReST
var port = process.env.PORT || 3000;
var restify = require('restify');

function respond(req, res, next) {
    res.send('hello ' + req.params.name);
    next();
}

var server = restify.createServer({
    name: 'alt-rulz',
    version: '0.0.1'
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.jsonp());
server.use(restify.bodyParser({ mapParams: true }));

server.get('/', restify.serveStatic({
    directory: './public/',
    default: 'index.html'
}));

server.get('/update', services.update);

server.listen(port, function() {
    console.log('%s listening at %s', server.name, server.url);
});