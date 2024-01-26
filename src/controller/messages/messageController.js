
const seen = require("./seen-message");
const getMessages = require("./getMessages");
const postMessage = require("./postMessage");

exports.post = async (req, res) => {
    const login = req.user;
    const { txt } = req.body;
    const id = req.id;
    console.log(login,id)
    const message = await postMessage(login, txt,id);
    res.status(200).json({
      message: "Success",
      data: {
        message,
      },
    });
  };
  
exports.makeSeen = async (req, res) => {
  const { messageId } = req.body;
  const login = req.user;

  
  // console.log(req.body)
  const result = await seen(messageId,login);

  if (result) {
    res.status(201).json({
      message: "Success",
    });
  } else {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

exports.getMessages = async (req, res) => {
  const login = req.user;
  //   if (id) {
  const message = await getMessages(login);

  if (message) {
    return res.status(200).json({
      message: "Success",
      data: {
        message,
      },
    });
  } else {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
  //   }
  //   const message = await getMessages();
  //   res.status(200).json({
  //     message: "Success",
  //     data: {
  //       message,
  //     },
  //   });
};

