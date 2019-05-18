"use strict";

function show_dashboard(iBatchNo) {
    window.location = "dashboard?iBatchNo="+iBatchNo;
}

function show_categories() {
    window.location = "/categories";
}



function dashboard(iBatchNo){
    window.location = "/categories";
}


function logout() {
    
    var params = {};
    params.c = c;
    params.k = k;
    $.ajax({
        url: "api/logout",
        type: 'GET',
        dataType: 'json',
        async: false,
        data: params,
        success: function(response) {
            window.location = "/";
        }
    });
}
