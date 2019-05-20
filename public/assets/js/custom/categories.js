$(document).ready(function() {


    $("select").select2();



 var table = $('#example').DataTable({
    buttons: [
        {
            extend: 'copyHtml5',
            exportOptions: {
             columns: ':contains("Office")',
             className: 'btn btn-primary'
            }
        },
        'excelHtml5',
        'csvHtml5',
        'pdfHtml5'
    ],
    select: {
      style: 'multi'
   },
    buttons: [
            {
                text: 'Add User',
                action: function ( e, dt, node, config ) {
                   $('#role_name').val('');

                assign_role();
                },
                enabled: true,

            },

          {
            text: 'Delete Trads',
            action: function ( e, dt, node, config ) {


                var array = [];
  table.rows('.selected').every(function(rowIdx) {
     array.push(table.row(rowIdx).data())
  })   
  console.log(array);


           delete_trads(array);
            },
            enabled: false
        },

        {
            extend: 'copyHtml5',
            exportOptions: {
             columns: ':contains("Office")',
             className: 'btn btn-primary'
            }
        },
        'excelHtml5',
        'csvHtml5',
        'pdfHtml5'
    ],

      language: {
          buttons: {
              colvis: 'Show/Hide columns',
              colvisRestore: 'Reset'
          }
      },
      lengthChange: false,          
            processing: true,
            //searching: false,
            "deferLoading": 0,
            "dom": 'Bfrtip', // Blrtip
            lengthChange: false,

            language: {
                buttons: {
                    colvis: 'Show/Hide columns',
                    colvisRestore: 'Reset',
                     className: 'btn btn-primary'
                }
            },
            ajax: {
                url: "trades/trades",
                dataSrc: "reportData",
                headers: {
                    'Content-Type': 'application/json'
                },
                "data": function(d){
                    d.form = $('form').serializeArray();                    
                }
            },    
            

            columns: [ 
              
              { data : "user" },
              { data : "name" },
              { data : "type" },
              { data : "price" },

     
           ]     
  }); 
      
    table.on( 'select', function () {            
      var selectedRows = table.rows( { selected: true } ).count(); 
      table.button( 0 ).enable( selectedRows === 1 );
      table.button( 1 ).enable( selectedRows > 0 );

      table.button( 0 ).enable( selectedRows === 1 );
      table.button( 2 ).enable( selectedRows > 0 );
    });

    $('#example tbody').on( 'click', 'button', function () {
        var data = table.row( $(this).parents('tr') ).data();
        console.log(data, "DATA");
        var data_ = {};
        data_.deleting_id = data.iCategoriesId;
        $.ajax({
          url: "/categories/delete_categories",
          type: 'GET',
          dataType: 'json',
          async: false,
          data: data_,
          success: function (response) {
            console.log("response",  "response", response);
            if(response.status == 200){
              window.location = "/categories";
            }else{
              $('#categories_div').addClass('has-error');
              $('#categories_name').val(response.msg); 
            }
          }
        });
    });
});

    
function delete_trads(selected_data){
  var data = {};
  data.selected_data =selected_data;
  $.ajax({
    url: "/trads/erase_selected",
    type: 'GET',
    dataType: 'json',
    async: false,
    data: data,
    success: function (response) {
      console.log("response",  "response", response);
      if(response.HTTPresponse == 200){
        window.location = "/categories";
      }else{
        $('#categories_div').addClass('has-error');
        $('#categories_name').val(response.msg); 
      }
    }
  });

}

function assign_role(){  
  $('#assign_window').modal('show'); 
}

$('#submit_btn').on( 'click', function (ev) {  
  
  var data_post = {};
  var price = parseFloat($('#price').val());
  data_post.type = $('#t_type').val();
  data_post.user = $('#user_id').val();
  data_post.name = $('#tname').val();
  data_post.shares = $('#shares').val();
  data_post.price = price;

  console.log($('#shares').val() , typeof($('#shares').val()) );

  if(($('#shares').val() < '10' || $('#shares').val() > '31') || $('#shares').val() == ''  ){
    alert("Please enter share between 10 to 30");
    $('#shares').focus();
    return false;
  }



  if((price <  '130.42'  || price > '195.65'  ) || $('#price').val() == ''){
    alert("please fill price between 130.42 to 195.65");
    return false;
  }


  $.ajax({
    url: "/insert_trads",
    type: 'GET',
    dataType: 'json',
    async: false,
    data: data_post,
    success: function (response) {
      console.log("response",  "response", response);
      if(response.HTTPresponse == 200){
        window.location = "/categories";
      }else{
        alert(response.result)
      }
    }
  });
});



function check_user_is_all_ready(){
  var action =   $('#confirm_assign_role').attr('action');
      var optionsAsString = "";
      $.ajax({
        url: "/categories/confirm_categories",
        type: 'GET',
        dataType: 'json',
        async: false,
        data: data,
        success: function (response) {
          console.log("response",  "response", response);
          if(response.status == 200){
            window.location = "/categories";
          }else{
            $('#categories_div').addClass('has-error');
            $('#categories_name').val(response.msg); 
          }
        }
      });
}

function edit_Categories(all_details){ 
  console.log(all_details.iCategoriesId, "all_details");
  $('#categories_name_edit').val(all_details.vCategorieName); 
  $('#edit_role_window').attr('edit_id', all_details.iCategoriesId);     
  $('#edit_role_window').modal('show');     
}


$('#confirm_assign_edit_role').on( 'click', function (ev) {  
    var data = {};
    data.categories_name = $('#categories_name_edit').val();
    data.updated_id =  $('#edit_role_window').attr('edit_id');
    if( $('#categories_name_edit').val() == ''){      
      $('#categories_div_edit').addClass('has-error');
      return false;
    }else{
      $('#categories_div_edit').removeClass('has-error');
    }        
    $.ajax({
      url: "/categories/update_categories",
      type: 'GET',
      dataType: 'json',
      async: false,
      data: data,
      success: function (response){
        console.log("response",  "response", response);
        if(response.status == 200){
          window.location = "/categories";
        }else{
          $('#categories_div_edit').addClass('has-error');
          $('#categories_name_edit').val(response.msg); 
        }
      }
    });
  })