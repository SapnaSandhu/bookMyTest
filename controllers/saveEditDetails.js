//import the user models 
const UserDetail = require("../models/UserDetails");
const Appointment = require('../models/Appointments');

/*
 * destructing the req.body obeject; forming object as per the
 * defined schema. Creating the user with corresponding information
 */

module.exports = (req, res) => {
    const {houseNo,streetName,city,province,
        postalCode,make,model,year,plateNumber,
        dob,firstName,lastName,id,date,time,appointmentId} = req.body;

    //? changing the flag, once the user has booked an appointment slot
    Appointment.findByIdAndUpdate({_id:appointmentId},{
        isTimeSlotAvailable:false
    },(error)=>{error?console.error("Error: ",error):undefined})

    UserDetail.findByIdAndUpdate(
        { _id: id },
        {
            FName: firstName,
            LName: lastName,
            dob,
            isAppointmentForG2:true,
            address: {houseNo,streetName,city,province,postalCode},
            carDeatils: {make,model,year,plateNumber},
            appoitments:{date,time,id:appointmentId}
        },
        (error) => {
            error?console.error("Error: ", error):undefined;
            res.redirect("/");
        }
    );
}

/* 
? Student Name: Meet Yogesh Panchal
? Student Id: 8771023
*/