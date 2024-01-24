const query = require('../../db/connection');





const getUser= async(id)=>{
 
  const user = await query('Select * FROM users WHERE id = ?',[id]);
  return user;
}

const deleteUser = async (userId) => {
    const user = await query('DELETE FROM users WHERE id = ?',[userId]);
    return user;
}
const updateUser = async (id,body)=>{
    const {login, password, email} = body;
    const user = await query(`UPDATE users SET login = '${login}', password = '${password}', email = '${email}' WHERE id = ${id}`);
    return user;
}




module.exports = {deleteUser,updateUser,getUser};