const getBranchList = require('./getBranches');

exports.getBranch = async (req, res) => {
  try {
    const rootBranches = await getBranchList();
    // console.log('rootBranches', rootBranches);
    const data = {
      message: 'Success',
      size: rootBranches.length,
      rows: rootBranches
    }

    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching branches:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



