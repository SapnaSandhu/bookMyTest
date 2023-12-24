const UserDetail = require("../models/UserDetails");

module.exports = (req,res)=>{
const { hasUserPassedTest,examinerComments,userId } = req.body
UserDetail.findByIdAndUpdate({_id: userId},{
    result:{hasUserPassedTest:hasUserPassedTest?true:false,examinerComments}
}).then(data=>{
    res.redirect("/examiner")
})
}