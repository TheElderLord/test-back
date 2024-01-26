const query = require("../../db/connection");

const getWindows = async (id) => {
  try {
    const rows = await query("SELECT * FROM window_state where idbranch = ?", [
      id,
    ]);
    return rows;
  } catch (err) {
    console.error(err);
    throw err; // Propagate the error
  }
};

module.exports = { getWindows, query };
