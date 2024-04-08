const query = require("../../db/connection");

const setBlock = async(branchId,value,role)=>{
    try{
        const sql = `Update branches set blocked = ${value},blocked_by = ${role}  where F_ID = ${branchId}`;
        console.log(sql);
        const result = await query(sql);
        return result;
    }catch(err){
        console.log(err);
    }
}
module.exports = setBlock;