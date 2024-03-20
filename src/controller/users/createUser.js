const query = require("../../db/connection");
const getbranches = require("../branch/getBranches")

const createUserByBranch = async()=>{
    const branches = await getbranches("admin");
    const sql = "Insert into users(login,password,id_branch,ins_date) values(?,?,?,?)";
    await Promise.all(branches.map(async(e)=>{
        console.log("Login and pass",e.F_ID);
        console.log("Child",e.children.join(","));
        const insSql = await query(sql,[e.F_ID,e.F_ID,e.children.join(","),new Date().toLocaleDateString("kz-KK")]);
        console.log(insSql);
    })
    );
    
}
  
  module.exports = createUserByBranch;