//import the user models 
const UserDetail = require("../models/UserDetails");

module.exports = (req, res) => {
	const { uname, password, confirmPassword, userType } = req.body;
	const userData = {
		user: { uname, password, userType }, FName: '', LName: '', dob: new Date(), uid: new Date()*1,
		address: { houseNo: '', streetName: '', city: '', province: '', postalCode: '' },
		carDeatils: { make: '', model: '', year: '', plateNumber: '' },
		licenseNumber: '',
		images: [],
	};
	// checking if the password and repeat password are same
	if (password === confirmPassword) {
		UserDetail.create({ ...userData }, (error, user) => {
			error ? console.error("Error: ", error) : undefined;
			res.redirect("/");
		});
	} else {
		res.redirect("/login")
	}
}

/* 
? Student Name: Meet Yogesh Panchal
? Student Id: 8771023
*/