//import the user models 
const UserDetail = require("../models/UserDetails");

module.exports = async(req,res)=>{
    if(req.session.userId !== undefined){
        if(req.session.userType === 'driver'){
            const driverDetails = await UserDetail.findOne({'_id' : req.session.userId});
            res.render('driver',{
                payload:{
                    data:driverDetails,isDriver:true,isLoggedIn:true
                }
            })
        }else{
            res.render('driver',{
                payload:{isDriver:false,isLoggedIn:true}
            })
        }
    }else{
        res.redirect('/login')
    }
};



/* 
? Student Name: Meet Yogesh Panchal
? Student Id: 8771023
*/