base_url = __dirname;
BASEPATH = __dirname + '/';
uploaded_excel_path = __dirname + '/uploaded_excel';
tmp_folder = __dirname + '/tmp';
log_folder = __dirname + '/log';
LOG_ENABLE = true;
compression = require('compression');
express = require('express');
app = express();
env = process.argv[2];
Environment = env;
c = '';
k = '';
CUSTOM_CONFIG = {};
CUSTOM_CONFIG.LOG_PATH=global.BASEPATH + 'log/';
/*System Global Constants End*/
/* Include Modules */
_ = require('underscore')._;
fs = require('fs');
mongoose = require('mongoose');
request = require('request');
requestPromise = require('request-promise');
http = require('http');
https = require('https');
querystring = require('querystring');
mysql = require('mysql');
json2xls = require('json2xls');
Fingerprint = require('express-fingerprint');
nodemailer = require('nodemailer');
smtpTransport = require('nodemailer-smtp-transport');
excel = require('exceljs');
monk = require('monk');
bodyParser = require('body-parser');
Cookies = require("cookies");
mustache = require('mustache');
async = require('async');
syncSql = require('sync-sql');
fileUpload = require('express-fileupload');
app.use(fileUpload());
alasql = require('alasql');
upload_excelfile_path = 'uploaded_excel/';
SYS_CONFIG_PATH = BASEPATH + 'config/';
DB_CONFIG = require(SYS_CONFIG_PATH + 'database_config.js');

LOGME = require(BASEPATH + 'lib/logs.js');
temp_path = BASEPATH + 'tmp/';
categories = require('./lib/categories.js');

if (!fs.existsSync(log_folder)){
    fs.mkdirSync(log_folder);
}
if (!fs.existsSync(tmp_folder)){
    fs.mkdirSync(tmp_folder);
}
mongo = require('mongodb');
MongoClient = require('mongodb').MongoClient;
connection = mysql.createConnection(DB_CONFIG.default);
connection.connect(function (err) {
    if (err) {
        console.log('Database connection failed !'  );        
        SYS_LOGGER.error('Database connection failed  -------!'+DB_CONFIG.default);
        return;
    }

    SYS_LOGGER.info('Database Connected at Host:' + DB_CONFIG.default.host + ' DB:' + DB_CONFIG.default.database + ' Id:' + connection.threadId);
});

/* Include Middleware*/
middleware = require(BASEPATH + 'lib/middleware.js');

if (env == 'prod') {

tmp_port = 8085;
httpServer = http.createServer(app);
httpServer.listen(tmp_port);
SYS_LOGGER.info('Node http Servers Runs on port:' + tmp_port);


} else {
    tmp_port = 8085;
    httpServer = http.createServer(app);
    httpServer.listen(tmp_port);
    SYS_LOGGER.info('Node http Servers Runs on port:' + tmp_port);
}
io = require('socket.io').listen(httpServer);
api = require('./lib/api');
route = require('./lib/route');

String.prototype.replaceBetween = function (start, end, what) {
    return this.substring(0, start) + what + this.substring(end);
};


if (!fs.existsSync(uploaded_excel_path)){
    fs.mkdirSync(uploaded_excel_path);
}

console.error = function (msg) {
    try {
        call_from = arguments.callee.caller.toString();
    } catch (error) {
        
    }
    LOGME.addLogFile('Error', msg, 'error');
   message = "Error ON " + common_helper.getSystemIp()+"::[]==>"+msg;
    message+="\n";    
    common_helper.sendErrorEmail(msg);
    process.stderr.write(msg);
};



