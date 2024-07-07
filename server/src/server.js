const http = require("http");

const app = require("./app");

const { loadPlanetsData } = require("./models/planets.model");

const server = http.createServer(app);
const PORT = process.env.PORT || 8000;

(async () => {
  await loadPlanetsData();
})();

server.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
