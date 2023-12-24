const UserDetail = require("../models/UserDetails");

module.exports = (req,res)=>{
    const { id } = req.params;
    UserDetail.find({_id:id},{result:1}).then(data=>{
        let sendingData = { hasUserPassedTest: false, examinerComments: '', id }

        if(data[0].result){
            const {hasUserPassedTest,examinerComments } = data[0].result
            sendingData = { hasUserPassedTest, examinerComments, id }
        }
        res.render('driverDetails',{ sendingData })
    }) 

}