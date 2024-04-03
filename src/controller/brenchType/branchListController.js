const getBranchtype = require('./getBranchType');
const setBranchType = require('./setBranchType');

exports.getBranchList = async(req,res)=>{
    const a = await getBranchtype();
    res.send(a);
}  

exports.setMenu = async(req,res)=>{
    const q = await setBranchType("first", true, 1139);
    res.send(q);
}
