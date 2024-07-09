const {
  getAllLaunchesFromModels,
  addNewLaunch,
  existsLaunch,
  abortLaunch,
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

const deleteLaunchById = (req, res) => {
  const launchId = +req.params.id;
  if (!existsLaunch(launchId)) {
    return res.status(404).json({
      error: "Launch does not exist",
    });
  }
  const aborted = abortLaunch(launchId);
  return res.status(200).json(aborted);
};

module.exports = { getAllLaunches, addNewLaunchHttp, deleteLaunchById };
