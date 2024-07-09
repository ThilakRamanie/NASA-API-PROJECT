const express = require("express");

const {
  getAllLaunches,
  addNewLaunchHttp,
  deleteLaunchById,
} = require("./launches.controller");

const launchesRouter = express.Router();

launchesRouter.get("/launches", getAllLaunches);
launchesRouter.post("/launches", addNewLaunchHttp);
launchesRouter.delete("/launches/:id", deleteLaunchById);

module.exports = launchesRouter;
