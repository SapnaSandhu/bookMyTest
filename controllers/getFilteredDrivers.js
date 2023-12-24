const UserDetail = require("../models/UserDetails");

module.exports = (req, res) => {
    const { driverType } = req.query;
    switch (driverType) {
        case 'g':
            UserDetail.find({ "appoitments": { $exists: true, $not: { $size: 0 } }, isAppointmentForG2:false })
            .then(data=>res.json(data))
            break;
        case 'g2':
            UserDetail.find({ "appoitments": { $exists: true, $not: { $size: 0 } }, isAppointmentForG2:true })
            .then(data=>res.json(data))
            break;

        default:
            UserDetail.find({ "appoitments": { $exists: true, $not: { $size: 0 } } })
            .then(data=>res.json(data))
            break;
    }
}