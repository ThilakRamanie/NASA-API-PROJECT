const {
  getAllLaunchesFromModels,
  scheduleNewLaunch,
  existsLaunch,
  abortLaunch,
} = require("../../models/launches.model");

const getAllLaunches = async (req, res) => {
  res.status(200).json(await getAllLaunchesFromModels());
};

const addNewLaunchHttp = async (req, res) => {
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
  await scheduleNewLaunch(launch);
  res.status(201).json(launch);
};

const deleteLaunchById = async (req, res) => {
  const launchId = +req.params.id;
  const exists_launch = await existsLaunch(launchId);
  if (!exists_launch) {
    return res.status(404).json({
      error: "Launch does not exist",
    });
  }
  const aborted = await abortLaunch(launchId);
  if (!aborted) {
    return res.status(400).json({
      error: "Something went wrong aborting launches",
    });
  }
  return res.status(200).json({ ok: true });
};

module.exports = { getAllLaunches, addNewLaunchHttp, deleteLaunchById };
