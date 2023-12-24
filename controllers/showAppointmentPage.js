const UserDetail = require("../models/UserDetails");

module.exports = (req, res) => {
    if(req.session.userType !== 'admin'){
        res.redirect('/')
    }else if (!req.session.userId){
        res.redirect('/login')
    }else{
        UserDetail.find({ result: { $exists: true } }).then((data) => {
            res.render('appointment',{ data });
          });
    }
}

/* 
? Student Name: Meet Yogesh Panchal
? Student Id: 8771023
*/