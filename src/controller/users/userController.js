const getUsers = require("./getUsers");
const getLastUsers = require("./getLastUser");

const { deleteUser, updateUser, getUser } = require("./userCRUD");

const updateInfo = require('./updateUserInfo');


exports.getUs = async (req, res) => {
  // const user = req.user;
  const login = req.user;
  const user = await getUser(login);
  res.status(200).json({
    message: "Success",
    user,
  });
};

exports.getUsers = async (req, res) => {
  const login = req.user;
  const users = await getUsers(login);
  res.status(200).json({
    message: "Success",
    data: {
      users,
    },
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
  const login = req.user;
  const user = await deleteUser(login);
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
  const login = req.user;
  const body = req.body;
  const user = await updateUser(login, body);
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
      data: {
        user,
      },
    });
  }
};

exports.updateUserInfo = async (req,res) => {
  const login = req.user;
  const body = req.body;
  const user = await updateInfo(login, body);
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
      data: {
        user,
      },
    });
  }
};

exports.getUserById = async (req, res) => {
  const login = req.user;
  const user = await getUserByid(login);
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
      data: {
        user,
      },
    });
  }
};
