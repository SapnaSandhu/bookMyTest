//import the user models 
const UserDetail = require("../models/UserDetails");
const bcrypt = require('bcrypt');


module.exports = async (req, res) => {
    const userData = await UserDetail.findOne({ 'user.uname': req.body.uname }); //fetching data 
    if (userData === null) {
        res.render('login', { info: "No user found with given credentials" })
    } else {
        bcrypt.compare(req.body.password, userData.user.password, (error, isValid) => {
            if (isValid) {
                req.session.userId = userData._id;
                req.session.userType = userData.user.userType;

                if (userData.user.userType === 'driver') {
                    global.isLoggedIn = true;
                    global.userType = 'driver';
                    res.render('driver', {
                        payload: { data: userData, error, isDriver: true, isLoggedIn: true, userType: userData.user.userType }
                    })
                } else if (userData.user.userType === 'admin') {
                    global.isLoggedIn = true;
                    global.userType = 'admin';
                    res.redirect('/appointment')
                } else if (userData.user.userType === 'examiner'){
                    global.isLoggedIn = true;
                    global.userType = 'examiner';
                    res.redirect('/examiner')
                }
            } else {
                global.isLoggedIn = false;
                console.log("Wrong Password")
                res.render('login', {
                    payload: {
                        info: "Please enter valid credentials",
                        error
                    }
                })
            }
        })
    }
};

/* 
? Student Name: Meet Yogesh Panchal
? Student Id: 8771023
*/