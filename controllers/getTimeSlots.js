const Appointment = require('../models/Appointments')

module.exports = (req, res) => {
    const { date, type } = req.body
    switch (type) {
        case 'admin':
            Appointment.find({ 'date': date }, (error, data) => {
                if(data.length == 0){
                    const timeSlots = ['9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00']
                    let slots = []
                    for (let i = 0; i < 11; i++) {
                        slots.push({ date, time: timeSlots[i], isTimeSlotAvailable: true })
                    }
                    Appointment.create(slots, (error, data) => {
                        error ? console.error("Error : ", error) : undefined;
                        data.sort((a,b) => (a.time < b.time) ? 1: 0)
                        res.json(data)
                    })
                }else{
                    data.sort((a,b) => (a.time < b.time) ? 1: 0)
                    res.json(data)
                }
            })
            break;
        case 'driver':
            Appointment.find({'date':date,'isTimeSlotAvailable':true,'isSlotActive':true},(error,data)=>{
                error ? console.error("Error : ", error) : undefined;
                res.json(data)
            })
            break;

        default:
            break;
    }
}

/* 
? Student Name: Meet Yogesh Panchal
? Student Id: 8771023
*/