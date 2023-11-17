const connection = require("../../db/connection");

function query(sql, values) {
  return new Promise((resolve, reject) => {
    connection.query(sql, values, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

const getWindows = async (id) => {
  try {
    const rows = await query("SELECT * FROM window_state where idbranch = ?", [id]);
    return rows;
  } catch (err) {
    console.error(err);
    throw err; // Propagate the error
  }
};

module.exports = {getWindows,query};