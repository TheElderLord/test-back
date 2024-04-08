const getBranchtype = require('./getBranchType');
const setBranchType = require('./setBranchType');
const setBlock = require('./setBlock');

exports.getBranchList = async(req,res)=>{
    const a = await getBranchtype();
    res.send(a);
}  

exports.setMenu = async(req,res)=>{
    const q = await setBranchType("first", true, 1139);
    res.send(q);
}
exports.setBlock = async(req,res)=>{
    const branchId = req.params.id;
    const value = req.query.value;
    const block = await setBlock(branchId,value);
    if(block){
        return res.status(200).json({
            message:"Success"
          });
    }
    else{
        return res.status(500).json({
            message:"Internal server error"
        })
    }
}
