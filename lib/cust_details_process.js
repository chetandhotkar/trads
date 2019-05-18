var d = new Date();
var year = d.getFullYear();
var curr_date = d.getDate();
var curr_date = ('0' + curr_date).slice(-2);
var month = d.getMonth()+1;
var curr_month = ('0' + month).slice(-2);
var curr_year = d.getFullYear();
var todays_date = year + "_" + curr_month + "_" + curr_date;
var db_date = year + "" + curr_month + "" + curr_date;
var db_yearmonth = year + "" + curr_month;
var db_created = d = Math.ceil(new Date().getTime()/1000);

function insert_sales_data_excel(get_data, response,file_name_namfile_pathe){	






  alasql('SELECT  ROW * FROM XLSX("'+file_path+'",{headers:false})',[],function(res){


            alasql(['SELECT * FROM XLS("'+file_path+'")'])
        .then(function(res){                 
            if(_.size(res[0]) == 0){   res[0]

              fs.unlinkSync(file_path);
              result.result = "Error";
              result.msg = 'In Provided File Is Empty';
              result.iBatchNo = iBatchNo;
              //response.status(400).send('Provided Excel File Is Empty');
              return false;
            }

            console.log(res, " RES")

          _.each(res[0], function(elem, key){
             console.log(elem, " elem"); 

                
              
           })
          common_helper.slack_notification('Eportxcel File Uploaded Sucessfully'); 
          //response.status(200).send('Sucessfully Updated');
          var result = {};
           result.result = "sucess";
           result.msg = 'Sucessfully Updated';
           response.json(result);

        }).catch(function(err){
             console.log('Does the file exist? There was an error:', err);
        });
    //}

   
});
}


function formatDate() {
  var d = new Date(),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-')+'T00:00:00';

}

function customer_details_list_db(get_data, response){

//console.log(get_data, "get_data");

  //var file_path =  upload_excelfile_path+'/JC_active_user_list_2.xlsx';
  //var file_path =  upload_excelfile_path+'/BB_active_user_list_1.xlsx';
  file_path =  upload_excelfile_path+'/BB_active_user_list_1_25k.xlsx';
  
  if(get_data.iBatchNo == 1){
    file_path =  upload_excelfile_path+'/BB_active_user_list_1_25k.xlsx';
  }
  
  if(get_data.iBatchNo == 2){
    file_path =  upload_excelfile_path+'/BB_active_user_list_25_50k.xlsx';
  }

  if(get_data.iBatchNo == 3){
    file_path =  upload_excelfile_path+'/BB_active_user_list_50_75k.xlsx';
  }

  if(get_data.iBatchNo == 4){
    file_path =  upload_excelfile_path+'/BB_active_user_list_75_1l.xlsx';
  }

  if(get_data.iBatchNo == 5){
    file_path =  upload_excelfile_path+'/BB_active_user_list_1l_1_25l.xlsx';
  }
  
  console.log(file_path, "File patgh") 
  var headers = {};
  alasql('SELECT  ROW * FROM XLSX("'+file_path+'",{headers:false})',[],function(res){

    headers = res;
// console.log(headers, "headers");



  alasql(['SELECT * FROM XLS("'+file_path+'")'])
            .then(function(res){                 
                if(_.size(res[0]) == 0){  
    
                  fs.unlinkSync(file_path);
                  result.result = "Error";
                  result.msg = 'In Provided File Is Empty';                  
                  //response.status(400).send('Provided Excel File Is Empty');
                  return false;
                }    
              
              
              var result = {}; 
               var result_op = {};
               result_op.headers =headers;
               result_op.reportData = res[0];
               response.json(result_op);
    
            }).catch(function(err){
                 console.log('Does the file exist? There was an error:', err);
            });
        //}
    
       
    });

  }
module.exports = {

  customer_details_list_db:customer_details_list_db,


};