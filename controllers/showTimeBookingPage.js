//import the user models 

module.exports = (req, res) => {
    if(req.session.userType !== 'admin'){
        res.redirect('/')
    }else if (!req.session.userId){
        res.redirect('/login')
    }else{
        res.render('appointmentTime',{ availableTimeSlots:[],userType:req.session.userType })
    }
}

/* 
? Student Name: Meet Yogesh Panchal
? Student Id: 8771023
*/
