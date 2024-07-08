const {
  getAllLaunchesFromModels,
  addNewLaunch,
} = require("../../models/launches.model");

const getAllLaunches = (req, res) => {
  res.status(200).json(getAllLaunchesFromModels());
};

const addNewLaunchHttp = (req, res) => {
  const launch = req.body;
  if (
    !launch.mission ||
    !launch.launchDate ||
    !launch.target ||
    !launch.rocket
  ) {
    res.status(400).json({
      error: "Missing one of the properties required for launching!",
    });
  }
  launch.launchDate = new Date(launch.launchDate);
  addNewLaunch(launch);
  res.status(201).json(launch);
};

module.exports = { getAllLaunches, addNewLaunchHttp };
