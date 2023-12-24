//import mongoose module to connect with DB
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
// Create schema to determine the fields that needs to read/save it in DB
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
    uname : { type: String, default: '' },
    password: { type: String, default: '' },
    userType: { type: String, default: '' }
});

const ResultSchema = new Schema({
	hasUserPassedTest: { type: Boolean, default: false },
	examinerComments: { type: String, default: '' }
})

const AppointmentSchema = new Schema({
	date:{ type: String, default: '' },
	time:{ type: String, default: '' },
	id:{ type: String, default: '' }

})

const ImageSchema = new Schema({
	path: { type: String, default: '' },
});

const AddressSchema = new Schema({
	houseNo: { type: String, default: '' },
	streetName: { type: String, default: '' },
	city: { type: String, default: '' },
	province: { type: String, default: '' },
	postalCode: { type: String, default: '' },
});

const CarDetailsSchema = new Schema({
	make: { type: String, default: '' },
	model: { type: String, default: '' },
	year: { type: String, default: '' },
	plateNumber: { type: String, default: '' },
});

const G2UsersSchema = new Schema({
	FName: { type: String, default: '' },
	LName: { type: String, default: '' },
	dob: {type: Date, default: new Date()},
	uid: { type: String, unique: true },
	isAppointmentForG2: { type: Boolean, default: true },
	address: AddressSchema,
	carDeatils: CarDetailsSchema,
	licenseNumber: { type: String, default: '' },
	images: [ImageSchema],
	user:UsersSchema,
	appoitments:[AppointmentSchema],
	result:ResultSchema
});

UsersSchema.pre("save", function (next) {
	const user = this; //? get the object that we are going to save it

	bcrypt.hash(user.password, 10, (error, hash) => {
		user.password = hash;
		next();
	});
});

const G2Users = mongoose.model("G2User", G2UsersSchema);

module.exports = G2Users;

/* 
    ? Student Name: Meet Yogesh Panchal
    ? Student Id: 8771023
*/
