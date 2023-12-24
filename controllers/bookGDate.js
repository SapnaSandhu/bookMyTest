//import the user models 
const UserDetail = require("../models/UserDetails");
const Appointment = require('../models/Appointments');

// * fetching user details from the UID
module.exports = (req, res) => {

    const { date,time,appointmentId } = req.body;

    if (time !== '' && appointmentId !== ''){

    //? changing the flag, once the user has booked an appointment slot
        Appointment.findByIdAndUpdate({_id:appointmentId},{
            isTimeSlotAvailable:false
        },(error)=>{error?console.error("Error: ",error):undefined})

        const id = req.session.userId;

        UserDetail.findByIdAndUpdate(
            { _id: id },
            {
                isAppointmentForG2:false,
                appoitments:{date,time,id:appointmentId}
            },
            (error) => {
                error?console.error("Error: ", error):undefined;
                res.redirect("/driver");
            }
        );

    }else{
        res.redirect('/gTest')
    }
}

/* 
? Student Name: Meet Yogesh Panchal
? Student Id: 8771023
*/