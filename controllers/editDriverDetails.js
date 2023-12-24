//import the user models 
const UserDetail = require("../models/UserDetails");

/*
 * Fetching id from query params and then fetching
 * user details from the databse and passing the
 * information to the 'editDriverDetails' page.
 */
module.exports = (req, res) => {
	if(req.params.id){
		UserDetail.findById(req.params.id, (error, data) => {
			error?console.log(error):undefined;
			res.render("editDriverDetails", {
				userDetail: data,userType:req.session.userType
			});
		});
	}else{
		if (req.session.userId) {
			UserDetail.findById(req.session.userId, (error, data) => {
				error?console.log(error):undefined;
				res.render("editDriverDetails", {
					userDetail: data,userType:req.session.userType
				});
			});
		}else {
			res.redirect('/')
		}
	}
};

/* 
? Student Name: Meet Yogesh Panchal
? Student Id: 8771023
*/