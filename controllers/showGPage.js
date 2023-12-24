module.exports = (req, res) => {
    console.log("Session : ",req.session);
    if(req.session.userType !== 'driver'){
        res.redirect('/')
    }else if (!req.session.userId){
        res.redirect('/login')
    }else{
        res.render('gTest')
    }
}

/* 
? Student Name: Meet Yogesh Panchal
? Student Id: 8771023
*/