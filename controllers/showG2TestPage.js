module.exports = (req, res) => {
    if(req.session.userType !== 'driver'){
        res.redirect('/')
    }else if (!req.session.userId){
        res.redirect('/login')
    }else{
        res.render('g2Test',{userType:req.session.userType})
    }
}

/* 
? Student Name: Meet Yogesh Panchal
? Student Id: 8771023
*/