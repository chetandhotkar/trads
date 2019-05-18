'use strict'

var host = "localhost";
var user = "root";
var password = "root";
var database ="";   

if(Environment == 'prod'){
    var host = host;
    var user = user;
    var password = password;
    var database =database;
 }   

const DATABASE_CONFIG = {
    "default": {
        host: host,
        user: user,
        password: password,
        database: database,
        multipleStatements: true
    }
  
};


DATABASE_CONFIG.MONGODB_URL =  "mongodb://chetand:abc_123@ds155916.mlab.com:55916/new_db";   
DATABASE_CONFIG.COLLECTION_NAME = 'trads';


module.exports = DATABASE_CONFIG;


