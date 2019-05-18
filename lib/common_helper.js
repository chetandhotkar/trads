'use strict'

const crypto = require('crypto');
const moment = require('moment');

/**
 * @description This file contains all common helper function which can use over the project
 */

var getFormattedDateFromTS = function (timestamp) {
    var date = new Date(timestamp * 1000);
    var date_format = ('0' + date.getDate()).slice(-2) + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + date.getFullYear();
    return date_format;
};

var getTimeBaseFileName = function (filename){
    var date = new Date();
    var fileArr = filename.split('.');
    var ext = fileArr.pop();
    var date_format = ('0' + date.getDate()).slice(-2) + '_' + ('0' + (date.getMonth() + 1)).slice(-2) + '_' + date.getFullYear() + '_' + ('0' + (date.getHours())).slice(-2) + '_' + ('0' + (date.getMinutes())).slice(-2) + '_' + ('0' + (date.getSeconds())).slice(-2) + '_' + date.getTime();
    fileArr.push(date_format);
    filename = fileArr.join('_') + '.' + ext;
    return filename;
};

var getDateBaseFileName = function (filename) {
    var date = new Date();
    var fileArr = filename.split('.');
    var ext = fileArr.pop();
    var date_format = ('0' + date.getDate()).slice(-2) + '_' + ('0' + (date.getMonth() + 1)).slice(-2) + '_' + date.getFullYear();
    fileArr.push(date_format);
    filename = fileArr.join('_') + '.' + ext;
    return filename;
};

function encrypt(text) {
    var cipher = crypto.createCipher('aes-256-cbc', 'd6F3Efeq');
    var crypted = cipher.update(text, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}

function decrypt(text) {
    var decipher = crypto.createDecipher('aes-256-cbc', 'd6F3Efeq');
    var dec = decipher.update(text, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
}

function dateStringToTimestamp(dateString, dateFormat) {
    var timestamp = moment(dateString, dateFormat).unix();
    return timestamp;
}

function base64EnCode(text) {
    return new Buffer(text).toString('base64');
}

function base64deCode(text) {
    return new Buffer(text, 'base64').toString('ascii');
}

function getTodaysPriorityBucket() {
    var d = new Date();
    var year = d.getFullYear();
    var curr_date = d.getDate();
    var curr_date = ('0' + curr_date).slice(-2);
    var month = d.getMonth() + 1;
    var curr_month = ('0' + month).slice(-2);
    var todays_date = year + "_" + curr_month + "_" + curr_date;
    return "calling_list_" + todays_date;
}

function getTodaysPriorityBucket_Retention() {
    var d = new Date();
    var year = d.getFullYear();
    var curr_date = d.getDate();
    var curr_date = ('0' + curr_date).slice(-2);
    var month = d.getMonth() + 1;
    var curr_month = ('0' + month).slice(-2);
    var todays_date = year + "_" + curr_month;
    return "RetentionRenewal_calling_list_" + todays_date;
}


function getYear(dateObj) {
    var year = (dateObj.getFullYear()).toString();
    return year;
}

function getMonth(dateObj) {
    var month = (dateObj.getMonth() + 1).toString();
    if (month.length == 1) {
        month = '0' + month;
    }
    return month;
}

function getDay(dateObj) {
    var day = (dateObj.getDate()).toString();
    if (day.length == 1) {
        day = '0' + day;
    }
    return day;
}

function getCampaignTemplate(CampaignValue) {
    var tmp = '';
    if (typeof (CampaignValue) != "undefined" && CampaignValue != '') {
        CampaignValue = CampaignValue.split('$$$$').join('<hr/>');
        CampaignValue = CampaignValue.split('###').join('<br/>');
        tmp = CampaignValue;
    }
    return tmp;
}

function getSystemIp(){
    var os = require('os');
    var ifaces = os.networkInterfaces();
    var address = [];
    Object.keys(ifaces).forEach(function (ifname) {
        var alias = 0;
        ifaces[ifname].forEach(function (iface) {
            if ('IPv4' !== iface.family || iface.internal !== false) {
                return '';
            }
            if (alias >= 1) {
                address.push(iface.address);
            } else {
                address.push(iface.address);
            }
            ++alias;
        });
    });
    return JSON.stringify(address);
}

/**
 * @description This file contains all common helper function which can use over the project
 */

var getFullFormattedDateFromTS = function (timestamp) {
    var date = new Date(timestamp * 1000);
    return moment(date).format('DD-MMM-YYYY hh:mm A');
};

function sendEmail(toEmail,subject,message,attachmentPath){
    var mailEnv = ' - {Development}';
    if(Environment == 'prod'){
        mailEnv = '';
    }
    subject = subject + mailEnv;    
    // Create a SMTP transport object
     var transporter = nodemailer.createTransport(smtpTransport({
       host: 'mail.CeX WeBuy.net',
       port: 465,
       secure: true, // use TLS
       auth: {
           user: 'noreply@CeX WeBuy.net',
           pass: 'abcd1234abcd'
       },
       tls: {
           // do not fail on invalid certs
           rejectUnauthorized: false
       }
   }));

    //Set email options
    let mailOptions = {
        from : '"CeX WeBuy" <no-reply@CeX WeBuy.net',
        to : toEmail,
        subject : subject,
        html : message
    }

    if(attachmentPath != undefined && attachmentPath != ''){
        mailOptions['attachments'] = [{path: attachmentPath}]
    }    
    
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error, " Error");
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
                SYS_LOGGER.log('EOD Report Mail sent to '+toEmail);
    })

}

function sendErrorEmail(message, exit) {


    var mailTo = "chetan.dhotkar@gmail.com";
    var subject = "[ERROR] [AUTORENEW] [New Exception] Exception detected !";
    var email_template = fs.readFileSync(BASEPATH + 'public/templates/email/error.html', 'utf8');

    if(typeof(mailTo)=='undefined' || mailTo==null || mailTo==''){
       slack_notification('Mail sent failure as No recipients defined!'+message);
        SYS_LOGGER.error('Mail sent failure as No recipients defined!');
        return false;
    }

    message = email_template.replace('##ERROR_CODE##', message).replace('##IP##', getSystemIp());
    var transporter = nodemailer.createTransport(smtpTransport({
       host: 'mail.CeX WeBuy.net',
       port: 465,
       secure: true, // use TLS
       auth: {
           user: 'noreply@CeX WeBuy.net',
           pass: 'abcd1234abcd'
       },
       tls: {
           // do not fail on invalid certs
           rejectUnauthorized: false
       }
   }));

    let mailOptions = {
        from: '"CeX WeBuy" <no-reply@CeX WeBuy.net',
        to: mailTo,
        subject: subject,
        html: message
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        SYS_LOGGER.info('Error Email Sent');
        if (typeof (exit) != 'undefined') {
            process.exit(1);
        }
    });
    //[END] Code for email send

}

function slack_notification(msg,color){

     if(typeof(msg)!='undefined' && msg!=''){
        msg = "\n"+msg;  
     }else{
         return false;
     };
     
     if(typeof(color)=='undefined'){
         color = "danger";
     }

     var Slack = require('slack-node'); 
     var webhookUri = "https://hooks.slack.com/services/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"; 
     var slack = new Slack();
     slack.setWebhook(webhookUri); 
     slack.webhook({
     channel: "#autorenewal_errors",    
     username: "ErrorBot",
     text: "Autorenewal Notify",
     attachments: [
        {
            "title": "Error Occured",
            "color": color,
            "text": msg
        }
    ]
     }, function(err, response) {
 //    console.log(response);
     });
}


var getTotal_calls = function (process_name) {
    var d = new Date();
    var year = d.getFullYear();
    var curr_date = d.getDate();
    var curr_date = ('0' + curr_date).slice(-2);
    var month = d.getMonth() + 1;
    var curr_month = ('0' + month).slice(-2);
    var todays_date = year + "" + curr_month + "" + curr_date;
//    console.log("select count(*) as total_call from customer_meta_matrix where iDay = '"+ todays_date+"' and iCallStatusId NOT IN (8,14) AND iPriorityId IN (select iPriorityId from  master_priority where master_priority.iPriorityId = customer_meta_matrix.iPriorityId and eBucketType = '"+process_name+"')");

    var output = syncSql.mysql(DB_CONFIG.default,
            "select count(*) as total_call from customer_meta_matrix where iDay = '"+ todays_date+"' and iCallStatusId NOT IN (8,14) AND iPriorityId IN (select iPriorityId from  master_priority where master_priority.iPriorityId = customer_meta_matrix.iPriorityId and eBucketType = '"+process_name+"')   AND tClosureRemark != 'EOD report'"
            );

    var result = output['data']['rows'];
    if (result.length > 0) {    
     console.log("return result[0].total_call ", result[0].total_call )   
        return result[0].total_call;
    }

    return 0;
}


var getProcess_details = function (process_name) {
    // console.log("select * from voitekk_leadset_settings where eStatus = 'Active' AND eBucketType ='"+process_name+"'");
    var output = syncSql.mysql(DB_CONFIG.default,
       "select * from voitekk_leadset_settings where eStatus = 'Active' AND eBucketType ='"+process_name+"'"
       );

    var result = output['data']['rows'];
    if(result.length > 0) {       
        return result[0];
    }
    return 0;
}

module.exports = {
    getFormattedDateFromTS: getFormattedDateFromTS,
    getTimeBaseFileName: getTimeBaseFileName,
    encrypt: encrypt,
    decrypt: decrypt,
    dateStringToTimestamp: dateStringToTimestamp,
    base64EnCode: base64EnCode,
    base64deCode: base64deCode,
    getTodaysPriorityBucket: getTodaysPriorityBucket,
    getDay: getDay,
    getMonth: getMonth,
    getYear: getYear,
    getFullFormattedDateFromTS: getFullFormattedDateFromTS,
    getCampaignTemplate: getCampaignTemplate,
    sendErrorEmail: sendErrorEmail,
    getDateBaseFileName: getDateBaseFileName,
    getSystemIp: getSystemIp,
    slack_notification:slack_notification,
    getTodaysPriorityBucket_Retention:getTodaysPriorityBucket_Retention,
    getTotal_calls:getTotal_calls,
    getProcess_details:getProcess_details,
    sendEmail:sendEmail
};
