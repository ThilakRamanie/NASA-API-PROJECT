const express = require("express");

const { getAllLaunches, addNewLaunchHttp } = require("./launches.controller");

const launchesRouter = express.Router();

launchesRouter.get("/launches", getAllLaunches);
launchesRouter.post("/launches", addNewLaunchHttp);

module.exports = launchesRouter;
