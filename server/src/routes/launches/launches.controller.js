const {getAllLaunchesFromModels} = require("../../models/launches.model");

const getAllLaunches = (req, res) => {
  res.status(200).json(getAllLaunchesFromModels());
};

module.exports = { getAllLaunches };
