//import the user models 
const UserDetail = require("../models/UserDetails");
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcrypt");


// ? image upload path
const fileUploadPath = "public/uploads";

// ? Making directory (if not exists) for uploading images
!fs.existsSync(fileUploadPath)? fs.mkdirSync(fileUploadPath):undefined;

module.exports = (req, res) => {

	const {FName,LName,dob,uid,houseNo,streetName,city,province,
		postalCode,make,model,year,plateNumber,licenseNumber} = req.body;

	const schemaArray = [];
	// * fetching the uploaded images
	let images = req.files.images;

	// * checking if single image is uploaded or multiple
	if (images.length == undefined) {

		// * moving the images to server with relevant information
		images.mv(path.resolve(__dirname,`../${fileUploadPath}`,`${new Date() * 1}_${images.name}`),
			(error) => error?console.log(error):undefined );

		// * creating schema for the image
		schemaArray.push({path: `/uploads/${new Date() * 1}_${images.name}`});

	} else {
		images.forEach((image) => {

			// * moving the images to server with relevant information
			image.mv(path.resolve(__dirname,`../${fileUploadPath}`,`${new Date() * 1}_${image.name}`),
            (error) => error?console.log(error):undefined );

			// * creating schema for the image
			schemaArray.push({path: `/uploads/${new Date() * 1}_${image.name}`});

		});
	}

	const encryptedUID = bcrypt.hashSync(uid, 10);
	const encryptedLicenseNumber = bcrypt.hashSync(licenseNumber, 10);


	const userData = {
		FName, LName, dob, uid:encryptedUID,
		address: { houseNo, streetName, city, province, postalCode },
		carDeatils: { make, model, year, plateNumber },
		licenseNumber:encryptedLicenseNumber,
		images: schemaArray,
	};

	UserDetail.findByIdAndUpdate(
        { _id: req.session.userId },userData,(error, g2users) => {
			error?req.flash('validationErrors',error):undefined;
			res.redirect("/driver");
		});
}

/* 
? Student Name: Meet Yogesh Panchal
? Student Id: 8771023
*/