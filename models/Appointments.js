const mongoose = require("mongoose");

// Create schema to determine the fields that needs to read/save it in DB
const Schema = mongoose.Schema;

const AppointmentsSchema = new Schema([{
    date: String,
    time:String,
    isTimeSlotAvailable:{type:Boolean,default:true},
    isSlotActive: {type:Boolean,default:false}
}]);

const Appointments = mongoose.model("Appointments", AppointmentsSchema);

module.exports = Appointments;

/* 
? Student Name: Meet Yogesh Panchal
? Student Id: 8771023
*/