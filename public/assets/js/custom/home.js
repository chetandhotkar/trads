/*GLOBAL VARIABLES*/
var c = readCookie('c');
var k = readCookie('k');
var profile_display_name = readCookie('profile_display_name');
var permissioncode = readCookie('permissioncode');
var NameOfCookie = readCookie('NameOfCookie');
var iRoleId = readCookie('iRoleId');


$(document).ready(function() {

    if(profile_display_name != ''){
        $('#display_name_res').html(profile_display_name);   
    }         
    
    loadTemplate();
    
});

function loadTemplate(){
    //window.location.href
    //console.log("===>",window.location.pathname);
    var path = window.location.pathname;
    path = path + '_template';
    $.get(path, function(response) {
        //console.log("response=>",response);
        if(response.result == "success"){

            if(response.data.template != undefined){
                var template = response.data.template;
                var getParams = urlParameter();
                //console.log("getParams=>",getParams);
                var templateData = {
                    query : getParams,
                    data : response.data.data
                };
                var pathArr = path.split('/');
                if(pathArr[1] != undefined){
                    var templateId = '#' + pathArr[1];
                    //console.log("templateId=>",templateId);
                    var templateHtml = $(template).filter(templateId).html();
                    //console.log("templateHtml=>",templateHtml);
                    var templateContent = Mustache.to_html(templateHtml, templateData);
                    $('#main_content').html(templateContent);
                }else{
                    $('#main_content').html("Template path not found");
                }
            }else{
                $('#main_content').html("Error rendering the template.");
            }
            
        }else{
            window.location = "/";
        }
    });
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

/*function getParamsByName(name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if(results[1] != undefined){
        return results[1];
    }else{
        return undefined;
    }
}*/

function urlParameter() {
    var url = window.location.href,
    retObject = {},
    parameters;

    if (url.indexOf('?') === -1) {
        return retObject;
    }

    url = url.split('?')[1];

    parameters = url.split('&');

    for (var i = 0; i < parameters.length; i++) {
        retObject[parameters[i].split('=')[0]] = parameters[i].split('=')[1];
    }

    return retObject;
}

