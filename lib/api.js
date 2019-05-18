// api.js
// ========


var login = function (username, password, fingerprint,req, res)
{

	console.log(username, "User name");
	console.log(password, "password");
	//$sql = "SELECT userId FROM tbl_user WHERE userId = $userId AND password = PASSWORD('$oldPassword')";
	var master_administration_Query = " select * from master_users where vUserName = 'chetan' and vpassword = password('"+ password +"')";			
	console.log(master_administration_Query, "master_administration_Query");
	
	connection.query(master_administration_Query, function (error, results, fields) {
		if (error){
			console.error(error);
		}else{
			if(_.size(results)){
				
				var cookies = new Cookies( req, res );
				cookies.set( 'c', "chetan",{overwrite : true, sameSite:true, httpOnly:false} )
						 .set( 'k' , "Dhotkar",{overwrite : true, sameSite:true, httpOnly:false} )
						 .set( 'profile_display_name' , "Chetan Dhotkar",{overwrite : true, sameSite:true,httpOnly:false} )						 
				var responseData = {'result' : 'success', 'message' : 'User is logged in successfully.','data' : results};
				res.json(responseData);

			}else{
		 		var responseData = {'result' : 'error', 'message' : 'Invalid Credentials.','data' : "data"};
		 		res.json(responseData);			
			}
		}
	})						

	
}




var logout = function (c, k, fingerprint,req, res)
{

	console.log("Logout");
}


module.exports = {
  login : login,
  logout: logout,

};
