const getBoardList = require("./getBoard");
const createBoard = require("./createBoard");

exports.getList = async(req,res)=>{
    try{
    const list = await getBoardList();
    if(list){
        return res.status(200).json({
            message:"Success",
            data:list
        })
    }
    res.status(404).json({
        message:"Not found"
    })
    }catch(err){
        console.log(err);
        res.status(500).json({
            message:"Internal server error"
        })
    }
    
}

exports.createBoard = async(req,res)=>{
    const userId = req.id;
    const {title,board_body,valid_to,role} = req.body;
    console.log(req.body);
    try{
    const result = await createBoard(userId,title,board_body,valid_to,role);
    if(result){
        return res.status(200).json({
            message:"Success",
            
        })
    }
    res.status(404).json({
        message:"Not found"
    })
    }catch(err){
        console.log(err);
        res.status(500).json({
            message:"Internal server error"
        })
    }
}