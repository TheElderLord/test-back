const nomadQuery = require("../../db/nomadConnection");

const brType = async()=>{
    const sql = `SELECT * FROM t_br_type_report;`;
    try{
        const result = await nomadQuery(sql);
        return result;
    }catch(err){
        console.log(err);
    }
}

module.exports = brType;