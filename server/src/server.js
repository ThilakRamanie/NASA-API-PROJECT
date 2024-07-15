const http = require("http");
const mongoose = require("mongoose");

const app = require("./app");

const { loadPlanetsData } = require("./models/planets.model");

const server = http.createServer(app);
const PORT = process.env.PORT || 8000;
const MONGO_URL =
  "mongodb+srv://thilakramanie007:q6SlQd5FeCXWWrk9@ztmcluster.a021rqu.mongodb.net/?retryWrites=true&w=majority&appName=ztmcluster";
mongoose.connection.on("open", () => {
  console.log("MongoDB connection ready");
});
mongoose.connection.on("error", (err) => {
  console.error("Error", err);
});
(async () => {
  await mongoose.connect(MONGO_URL);
  await loadPlanetsData();
})();
server.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
