
var validateLogin = function(req, res, next){
	//console.log("Query=>",req.query);
	//console.log("Body=>",req.body);
	let apiReq = req;
	let apiRes = res;

	var cookies = new Cookies( req, res );
	global.c = cookies.get( "c" );
	global.k = cookies.get( "k" );
	global.profile_name = cookies.get( "profile_display_name" );
		
	
	if(c != undefined){
		apiReq.sessionValid = 1;
		next();
	}else{
		apiReq.sessionValid = 1;
		next();
	}
	

}


module.exports = {
  validateLogin : validateLogin
};
