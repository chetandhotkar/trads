"use strict";

var methodOverride = require('method-override');


global.app.use(global.compression());
global.app.use(global.express.static(global.BASEPATH + '/public/assets'));
global.app.use(global.bodyParser.json()); // support json encoded bodies
global.app.use(global.bodyParser.urlencoded({extended: true})); // support encoded bodies

global.authentication = require(global.BASEPATH + 'lib/authentication.js');

global.app.use(global.authentication.validateLogin);
global.app.use(global.Fingerprint({
    parameters: [
        global.Fingerprint.useragent,
        global.Fingerprint.geoip,
        global.Fingerprint.acceptHeaders
    ]

}));


function logErrors(err, req, res, next) {
    console.error(err.stack);
    next(err);
}

function clientErrorHandler(err, req, res, next) {
    if (req.xhr) {
        res.status(500).send({error: 'Something failed!'});
    } else {
        next(err);
    }
}

function errorHandler(err, req, res, next) {
    res.status(500);
    res.render('error', {error: err});
}

global.app.use(methodOverride());
global.app.use(logErrors);
global.app.use(clientErrorHandler);
global.app.use(errorHandler);

global.app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
