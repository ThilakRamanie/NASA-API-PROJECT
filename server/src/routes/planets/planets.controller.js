const { getAllPlanetsModel } = require("../../models/planets.model");
function getAllPlanets(req, res) {
  res.status(200).json(getAllPlanetsModel());
}

module.exports = { getAllPlanets };
