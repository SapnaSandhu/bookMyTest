module.exports = (req, res) => {    
    res.render('dashboard',{userType: req.session.userType});
}

/* 
? Student Name: Meet Yogesh Panchal
? Student Id: 8771023
*/