
const getLastUsers = require("./getLastUser");

const crud = require("./userCRUD");

exports.getUsers = async (req, res) => {
  const login = req.user;
  const users = await crud.getUsers(login);
  res.status(200).json({
    message: "Success",
    data: {
      users,
    },
  });
};

exports.getUser = async (req, res) => {
  // const user = req.user;
  const user_id = req.params.id;
  const user = await crud.getUserById(user_id);
  res.status(200).json({
    message: "Success",
    user,
  });
};


exports.getLastUsers = async (req, res) => {
  const login = req.user;
  const users = await getLastUsers(login);
  res.status(200).json({
    message: "Success",
    data: {
      users,
    },
  });
};

exports.deleteUser = async (req, res) => {
  const user_id = req.params.id;
  const user = await crud.deleteUserById(user_id);
  if (user) {
    res.status(200).json({
      message: "Success",
      data: {
        user,
      },
    });
  } else {
    res.status(404).json({
      message: "Not found",
    });
  }
};

exports.updateUser = async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const user = await crud.updateUserById(id,body);
  if (user) {
    return res.status(200).json({
      message: "Success",
      data: {
        user,
      },
    });
  } else {
    res.status(404).json({
      message: "Not found",
      data: {
        user,
      },
    });
  }
};

exports.createUser = async(req,res)=>{
  const body = req.body;
  const result = await crud.createUser(body);
  if(result){
    return res.status(200).json({
      message: "Success",
     
    });
  }
  return res.status(500).json({
    message:"Internal Server Error"
  })
}

// exports.updateUserInfo = async (req,res) => {
//   const login = req.user;
//   const body = req.body;
//   const user = await updateInfo(login, body);
//   if (user) {
//     res.status(200).json({
//       message: "Success",
//       data: {
//         user,
//       },
//     });
//   } else {
//     res.status(404).json({
//       message: "Not found",
//       data: {
//         user,
//       },
//     });
//   }
// };

