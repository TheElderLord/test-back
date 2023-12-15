
const getUsers = require('./getUsers');
const getLastUsers = require('./getLastUser');
const {getMessages,postMessage} = require('./getMessages')
const {deleteUser,updateUser} = require('./userCRUD');
const connection = require('../../db/connection')


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
exports.getMessages = async(req,res)=>{
    const message = await getMessages();
    res.status(200).json({
        message:'Success',
        data:{
            message
        }
    })
}

exports.postMessage = async(req,res)=>{
    const message = await postMessage(req,res);
    res.status(200).json({
        message:'Success',
        data:{
            message
        }
    })
}

exports.deleteUser = async(req,res)=>{
    const userId = req.params.id;
    const user = await deleteUser(userId);
    if(user){
        res.status(200).json({
            message:'Success',
            data:{
                user
            }
        })
    }
    else{
        res.status(404).json({
            message:'Not found',
          
        })
    }
}

exports.updateUser = async(req,res)=>{
    const id = req.params.id;
    const body = req.body;
    const user = await updateUser(id,body);
    if(user){
        res.status(200).json({
            message:'Success',
            data:{
                user
            }
        })
    }
    else{
        res.status(404).json({
            message:'Not found',
            data:{
                user
            }
        })
    }

}

exports.makeSeen  = async(req,res)=>{
    const {messageId,userId} = req.body;
    
    const sql = `Update messages set seen = '1' where id = '${messageId}' and user_id = '${userId}'`;
    connection.query(sql,(err,result)=>{
        if(err){
            res.status(500).json({message:'Internal Server Error'})
        }
        res.status(201).json({message:"Success"})
    })

}


    





