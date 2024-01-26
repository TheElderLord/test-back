const { getWindows } = require("./getWindows");
const sortWindows = require("./sortWindows");

exports.getWindowsById = async (req, res) => {
  try {
    const { id } = req.params;
    const windows = await getWindows(id);
    // console.log(windows);
    const { windowsJson, newtickets, servTickets } = await sortWindows(
      id,
      windows
    );
    // console.log(sortedWindows);
    const data = {
      message: "Success",
      NEW: newtickets,
      INSERVICE: servTickets,
      size: windowsJson.length,
      windows: windowsJson,
    };

    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching windows:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
