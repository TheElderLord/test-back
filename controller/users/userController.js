
const getUsers = require('./getUsers');
const getLastUsers = require('./getLastUser');

exports.getUsers = async (req,res) => {
    const users = await getUsers();
    res.status(200).json({
        message:'Success',
        data:{
            users
        }
    });
}
exports.getLastUsers = async (req,res) => {
    const users = await getLastUsers();
    res.status(200).json({
        message:'Success',
        data:{
            users
        }
    });
}


    





