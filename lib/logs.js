"use strict";
const Logger = require('logplease');

if (global.LOG_ENABLE) {
    Logger.setLogLevel(Logger.LogLevels.DEBUG); // Show only ALL ERROR messages
} else {
    Logger.setLogLevel(Logger.LogLevels.NONE); // 
}
CUSTOM_CONFIG.LOG_PATH=global.BASEPATH + 'log/';

global.SYS_LOGGER = Logger.create(' [' + (typeof (Environment) != "undefined" ? Environment : 'Local') + '] Autorenewals', {
    useColors: true, // Enable colors
    color: Logger.Colors.White, // Set the color of the logger
    showTimestamp: true, // Display timestamp in the log message
    showLevel: true, // Display log level in the log message
    filename: CUSTOM_CONFIG.LOG_PATH + getDateWiseFileName('SYSTEM_LOG') + '.log', // Set file path to log to a file
    appendFile: true // Append logfile instead of overwriting
});


function getFileOption(file_path_name) {
    return {
        useColors: true, // Enable colors
        color: Logger.Colors.White, // Set the color of the logger
        showTimestamp: false, // Display timestamp in the log message
        showLevel: true, // Display log level in the log message
        filename: CUSTOM_CONFIG.LOG_PATH + file_path_name + '.log', // Set file path to log to a file
        appendFile: true // Append logfile instead of overwriting
    };
}

function getDateWiseFileName(filename) {
    var d = new Date();
    var year = d.getFullYear();
    var curr_date = d.getDate();
    var curr_date = ('0' + curr_date).slice(-2);

    var month = d.getMonth() + 1;
    var curr_month = ('0' + month).slice(-2);

    var curr_year = d.getFullYear();
    var todays_date = curr_date + "_" + curr_month + "_" + year;

    filename += "_" + todays_date;

    return filename;
}


function addLogFile(filename, logdata, logtype) {
    if (!global.LOG_ENABLE) {
        return false;
    }

    var org_name = filename;
    var filename = filename.replace(/[^a-zA-Z0-9]+/g, '_');

    filename = getDateWiseFileName(filename);

    var log_time = new Date().toLocaleString() + " ";

    logdata = '\n' + log_time + " " + logdata;

    var LOGFile = Logger.create(org_name, getFileOption(filename));

    switch (logtype) {
        case 'debug':
            LOGFile.debug(logdata);
            break;
        case 'log':
            LOGFile.log(logdata);
            break;
        case 'info':
            LOGFile.info(logdata);
            break;
        case 'warn':
            LOGFile.warn(logdata);
            break;
        case 'error':
            LOGFile.error(logdata);
            break;
        default:
            LOGFile.info(logdata);
            break;
    }
}

function logThisRequest(req, res) {

    var skip_request = ["/stylesheet/bootstrap.min.css.map", "/js/lib/pdfmake.min.js.map"];

    var skip_index = skip_request.indexOf(req.originalUrl);

    if (skip_index > -1) {
        return false;
    }

    var api_log_data = {};

    api_log_data.vHash = req.fingerprint.hash;

    api_log_data.iUserId = parseInt(req.k);

    api_log_data.vSessionKey = req.c;

    api_log_data.eXHRRequest = req.xhr;

    api_log_data.eRequestMethod = req.method;

    api_log_data.eSecure = req.secure;

    api_log_data.tRequestUrl = req.path;

    api_log_data.tUserAgent = req.fingerprint.components.useragent;

    api_log_data.tGeoIP = req.fingerprint.components.geoip;

    api_log_data.tAcceptHeaders = req.fingerprint.components.acceptHeaders;

    api_log_data.vHostName = req.hostname;

    api_log_data.vIP = req.ip;

    api_log_data.tAcceptHeaders = req.fingerprint.components.acceptHeaders;

    api_log_data.tParams = {};

    api_log_data.tParams.params = req.params;

    api_log_data.tParams.body = req.body;

    api_log_data.tParams.query = req.query;

    api_log_data.iRequestTime = Date.now();


    function afterResponse(api_log_data) {

        try {
            res.removeListener('finish', afterResponse);
            res.removeListener('close', afterResponse);

            var MongoClient = require('mongodb').MongoClient;

            api_log_data.iResponseTime = Date.now();



            // action after response
        } catch (e) {
          //  SYS_LOGGER.error('logThisRequest failed check following=>');
           // SYS_LOGGER.error(e.message);
        }

    }

    res.on('finish', function () {
        afterResponse(api_log_data);
    });
    res.on('close', function () {
        afterResponse(api_log_data);
    });

}

module.exports = {
    addLogFile: addLogFile,
    logThisRequest: logThisRequest
};