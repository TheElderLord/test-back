const getBranchList = require("./getBranches");

exports.getBranches = async (req, res) => {
  try {
    const login = req.user;
    const type = req.query.type;
    
    // console.log("Branches",req)
    let rootBranches = await getBranchList(login);
    if(type){
      rootBranches = await getBranchList(login,type)
    }
    // console.log('rootBranches', rootBranches);
    const data = {
      message: "Success",
      size: rootBranches.length,
      rows: rootBranches,
    };

    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching branches:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
function findBranchById(rootBranches, id) {
  for (const branch of rootBranches) {
      if (branch.F_ID === id) {
          return branch;
      }
      if (branch.children) {
          const foundInChildren = findBranchById(branch.children, id);
          if (foundInChildren) {
              return foundInChildren;
          }
      }
  }
  return null;
}

exports.getBrachById = async (req, res) => {
  try {
    const login = req.user;
    const id = req.params.id;
    // console.log("Branches",req)
    const rootBranches = await getBranchList(login);
    // console.log('rootBranches', rootBranches);
    let branch = findBranchById(rootBranches, id);
    
    if(branch){
      res.status(200).json({
        data:branch
      });
    }
    else res.status(404).json({
      message:"Not found"
    })
    
    
   
  } catch (error) {
    console.error("Error fetching branches:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
