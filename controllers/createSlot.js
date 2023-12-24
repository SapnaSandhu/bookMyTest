const Appointments = require('../models/Appointments')

// * fetching slot details form the user

module.exports = (req, res) => {
    const { date, time } = req.body
    Appointments.findOneAndUpdate({'date':date,'time':time}, {isSlotActive:true},(error,data)=>{
        res.redirect('/appointment')
    });
}

/* 
? Student Name: Meet Yogesh Panchal
? Student Id: 8771023
*/
