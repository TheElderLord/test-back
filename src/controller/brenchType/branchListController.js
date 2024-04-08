const getBranchtype = require("./getBranchType");
const setBranchType = require("./setBranchType");
const setBlock = require("./setBlock");
const branchList = require("./getAllBranches");

exports.getBranchList = async (req, res) => {
  const a = await getBranchtype();
  res.send(a);
};

exports.getList = async (req, res) => {
  const user = req.user;
  try {
    const branches = await branchList(user);
    const data = {
      message: "Success",
      size: branches.length,
      rows: branches,
    };

    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching branches:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.setMenu = async (req, res) => {
  const q = await setBranchType("first", true, 1139);
  res.send(q);
};
exports.setBlock = async (req, res) => {
  const role = req.role;
  const branchId = req.params.id;
  const value = req.query.value;
  const block = await setBlock(branchId, value, role);
  if (block) {
    return res.status(200).json({
      message: "Success",
    });
  } else {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
