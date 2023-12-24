const UserDetail = require("../models/UserDetails");

module.exports = (req, res) => {
    if(req.session.userType !== 'examiner'){
        res.redirect('/')
    }else if (!req.session.userId){
        res.redirect('/login')
    }else{
        UserDetail.find({"appoitments": {$exists: true,$not: {$size: 0}}})
        .then(data=>{
            res.render('examiner',{data})
        })
    }
}

/* 
? Student Name: Meet Yogesh Panchal
? Student Id: 8771023
*/