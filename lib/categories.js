
var d = new Date();
var year = d.getFullYear();
var curr_date = d.getDate();
var curr_date = ('0' + curr_date).slice(-2);
var month = d.getMonth()+1;
var curr_month = ('0' + month).slice(-2);
var curr_year = d.getFullYear();
var submitted_date = curr_date+""+curr_month+""+year;
todays_date = year + "_" + curr_month + "_" + curr_date;
db_date = year + "" + curr_month + "" + curr_date;
db_yearmonth = year + "" + curr_month;
db_created = d = Math.ceil(new Date().getTime()/1000);
var d = new Date();
var hour = d.getHours();
var min = d.getMinutes();
var sec = d.getSeconds();
var insert_date = year+'-'+month+'-'+curr_date+' '+hour+':'+min+':'+sec;

function trades(get_data, response){

MongoClient.connect(DB_CONFIG.MONGODB_URL, function(err, db) { 

  db.collection(DB_CONFIG.COLLECTION_NAME).find({"Active" : "1" }).toArray(function(err, result) {	                                     
      if (err){
          console.log("err")
          var result_data = {};         
           result_data.result ="error";             
           result_data.HTTPresponse =400;   
           result_data.reportData = result;          
           response.json(result_data);
       
      } else{       

          if(_.size(result) == 0){
            var result_data = {};     
            result_data.result ="sucess but with 0 data"; 
            result_data.HTTPresponse =200; 
            result_data.reportData = result;              
            response.json(result_data);
          }else{
            var result_data = {};     
            result_data.result ="sucess"; 
            result_data.HTTPresponse =200; 
            result_data.reportData = result;              
            response.json(result_data);
          }
          
  
      } 
    }); 
  })
}


function erase_selected(get_data, response){
  console.log(get_data.selected_data, " get_data");
  var id = 0;
 _.each(get_data.selected_data, function (elm, index) {  
    MongoClient.connect(DB_CONFIG.MONGODB_URL, function(err, db){ 
      if (err) throw err;      
      var o_id = new mongo.ObjectID(elm._id);
      db.collection(DB_CONFIG.COLLECTION_NAME).findAndModify(
        {"_id":o_id},
        [['_id','asc']],
          {"$set":{
            "Active":0,        
            
          }},
        {new: true, upsert: true},
        function(err, doc){ 
          if (err) {
            var result_data = {};     
            result_data.result ="error"; 
            result_data.HTTPresponse =400;             
            response.json(result_data);
          }else{
            var result_data = {};     
            result_data.result ="sucess"; 
            result_data.HTTPresponse =200;             
            response.json(result_data);
          }              
        }
      );  
    }) 
  });
}


function insert_trads(get_data, response){




  if((get_data.shares < '10' || get_data.shares > '31') || get_data.shares == ''  ){
    var result_data = {};     
    result_data.result ="Share Shoud be between 10 to 30"; 
    result_data.HTTPresponse =400;             
    response.json(result_data);
    return false;
  }



  if((get_data.price <  '130.42'  || get_data.price > '195.65'  ) || get_data.price == ''){
    var result_data = {};     
    result_data.result ="Price Shoud be between 130.42 to  195.65"; 
    result_data.HTTPresponse =400;             
    response.json(result_data);
    return false;
  }
  MongoClient.connect(DB_CONFIG.MONGODB_URL, function(err, db){ 
  db.collection("trads").find({"user":get_data.user}).toArray(function(err, result) {	                                     
    if (err){
      var result_data = {};     
      result_data.result ="error"; 
      result_data.HTTPresponse =400;             
      response.json(result_data);
      return false;
           
       //  response.json(result_data);
     
    } else{       
     if(_.size(result) == 0){

      get_data.timestamp = insert_date;
      get_data.Active = "1";
      db.collection(DB_CONFIG.COLLECTION_NAME).insert(get_data, function(err, res) {
        if (err) {
          var result_data = {};     
          result_data.result ="error"; 
          result_data.HTTPresponse =400;             
          response.json(result_data);
        }else{
          var result_data = {};     
          result_data.result ="success"; 
          result_data.HTTPresponse =200;  
          result_data.error = _.size(result);          
          response.json(result_data);
        }
      }); 



      
     }else{
      var result_data = {};     
      result_data.result ="User Already Exist"; 
      result_data.HTTPresponse =400;             
      response.json(result_data);
      return false;
     }


    } 
  }); 
})


}


function get_user_by_user_id(get_data, response){
    console.log( get_data.userid, "===============");
    var data = _.has(get_data,"userid");

    if(data ==  false){
      var result_data = {};     
      result_data.result ="http://localhost:8085/trades/users?userid=chetandhotkar"; 
      result_data.HTTPresponse =400;     
      result_data.message ="GET Prams ERROR";             
      response.json(result_data);
      return false;
    }else{
      MongoClient.connect(DB_CONFIG.MONGODB_URL, function(err, db) { 
      
        db.collection(DB_CONFIG.COLLECTION_NAME).find({"user" : get_data.userid }).toArray(function(err, result) {	                                     
          if (err){
              console.log("err")
              var result_data = {};         
              result_data.result ="error";             
              result_data.HTTPresponse =400;   
                  
              response.json(result_data);
          
          } else{     
            if(_.size(result) == 0){
              console.log("err")
              var result_data = {};         
              result_data.result ="User Not FOUND";             
              result_data.HTTPresponse =404;                    
              response.json(result_data);
            }else{
              var result_data = {};     
              result_data.result ="sucess"; 
              result_data.HTTPresponse =200; 
              result_data.reportData = result;    
              // console.log(result, " RSULST");         
            response.json(result_data);
            }  

      
          } 
        }); 
      })
    }
  }


  function filter_trades(get_data, response){
    console.log( get_data.type, "===============");
    var type = _.has(get_data,"type");

    if(type ==  false){
      var result_data = {};     
      result_data.result ="http://localhost:8085/trades/users?type={tradeType}"; 
      result_data.HTTPresponse =400;     
      result_data.message ="GET Prams ERROR";             
      response.json(result_data);
      return false;
    }
    var start = _.has(get_data,"start");

    if(start ==  false){
      var result_data = {};     
      result_data.result ="http://localhost:8085/trades/users?start={startDate}"; 
      result_data.HTTPresponse =400;     
      result_data.message ="GET Prams ERROR";             
      response.json(result_data);
      return false;
    }

    var end = _.has(get_data,"end");

    if(end ==  false){
      var result_data = {};     
      result_data.result ="http://localhost:8085/trades/users?end={endDate}"; 
      result_data.HTTPresponse =400;     
      result_data.message ="GET Prams ERROR";             
      response.json(result_data);
      return false;
    }

    if(type ==  false || start ==  false || end ==  false){
      var result_data = {};     
      result_data.result ="http://localhost:8085/trades/users?end={endDate}"; 
      result_data.HTTPresponse =400;     
      result_data.message ="GET Prams ERROR";             
      response.json(result_data);
      return false;
    }else{

      MongoClient.connect(DB_CONFIG.MONGODB_URL, function(err, db) { 
        
        console.log(get_data.end, " END");
        console.log(get_data.start, " ENstartD");
        end = get_data.end;
        start = get_data.start;




        //({type:"Sell", timestamp: { $gte:ISODate("2013-11-19 14:00:00"), $lt: ISODate("2013-11-19 20:00:00") } })
      
        db.collection(DB_CONFIG.COLLECTION_NAME).find({ "type": get_data.type ,  "timestamp":  { $gte: start, $lt: end } }).toArray(function(err, result) {	                                     
          if (err){
              console.log("err")
              var result_data = {};         
              result_data.result ="error";             
              result_data.HTTPresponse =400;   
                  
              response.json(result_data);
          
          } else{     
            if(_.size(result) == 0){
              console.log("err")
              var result_data = {};         
              result_data.result ="There are no trades in the given date range";             
              result_data.HTTPresponse =404;                    
              response.json(result_data);
            }else{
              var result_data = {};     
              result_data.result ="sucess"; 
              result_data.HTTPresponse =200; 
              result_data.reportData = result;    
              // console.log(result, " RSULST");         
            response.json(result_data);
            }  

      
          } 
        }); 
      })

    }
  }



  function erase(response){
    MongoClient.connect(DB_CONFIG.MONGODB_URL, function(err, db){ 
      //query store the search condition
        var query = {"_id" : {"$exists" : true, "$ne" : ""}};
        //data stores the updated value
        var data = { $set : {Active : "0" } }
        //CREATING A COLLECTION IN MONGODB USING NODE.JS
        db.collection(DB_CONFIG.COLLECTION_NAME).updateMany(query , data, (err , collection) => {
            if(err){
              var result_data = {};     
              result_data.result ="error "; 
              result_data.HTTPresponse =400;               
              
              response.json(result_data);
            }else{
              if(collection.message.documents[0].nModified == 0){
                var result_data = {};     
                result_data.result ="All are alreday Erase "; 
                result_data.HTTPresponse =400;  
                response.json(result_data);
                return false;
              }else{
                var result_data = {};     
                result_data.result ="Success "; 
                result_data.HTTPresponse =200;   
                response.json(result_data);
              }

            } 
            //console.log(collection.result.nModified + " Record(s) updated successfully");	//It will console the number of rows updated
            
      
        });
     }) 
    
  }
  




module.exports = {
  trades:trades,
  erase:erase,
  erase_selected:erase_selected,
  insert_trads:insert_trads,
  get_user_by_user_id:get_user_by_user_id,
  filter_trades:filter_trades

};

