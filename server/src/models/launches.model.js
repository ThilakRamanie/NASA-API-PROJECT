const launchesSchema = require("../routes/launches/launches.mongo");
const planetSchema = require("../routes/planets/planets.mongo");

const launches = new Map();

// let latestFlightNumber = 100;
const LATEST_FLIGHT_NUM = 100;

const launch = {
  flightNumber: LATEST_FLIGHT_NUM,
  mission: "Kepler exploration M",
  rocket: "Explore IS1",
  launchDate: new Date("July 11 2028"),
  target: "Kepler-442 b",
  customers: ["NASA", "ISRO"],
  upcoming: true,
  success: true,
};

// launches.set(launch.flightNumber, launch);

(async () => {
  await saveLaunch(launch);
})();

async function existsLaunch(id) {
  return await launchesSchema.findOne({ flightNumber: id });
}

async function getLatestFlightNumber() {
  const latestLaunch = await launchesSchema.findOne().sort("-flightNumber");
  if (!latestLaunch) {
    return LATEST_FLIGHT_NUM;
  }
  return latestLaunch.flightNumber;
}

async function getAllLaunchesFromModels() {
  return await launchesSchema.find({}, { _id: 0, __v: 0 });
  // return Array.from(launches.values());
}

async function saveLaunch(launchData) {
  const planet = await planetSchema.findOne({
    kepler_name: launchData.target,
  });
  if (!planet) {
    throw new Error("No matching planet found!");
  }
  await launchesSchema.updateOne(
    {
      flightNumber: launchData.flightNumber,
    },
    launchData,
    {
      upsert: true,
    }
  );
}

// function addNewLaunch(launch) {
//   latestFlightNumber++;
//   launches.set(
//     latestFlightNumber,
//     Object.assign(launch, {
//       flightNumber: latestFlightNumber,
//       customers: ["NAST with ISRO"],
//       upcoming: true,
//       success: true,
//     })
//   );
// }

async function scheduleNewLaunch(launch) {
  const newFlightNumber = (await getLatestFlightNumber()) + 1;
  const newLaunch = Object.assign(launch, {
    customers: ["NAST with ISRO"],
    upcoming: true,
    success: true,
    flightNumber: newFlightNumber,
  });
  await saveLaunch(newLaunch);
}

async function abortLaunch(id) {
  // const aborted = launches.get(id);
  // aborted.upcoming = false;
  // aborted.success = false;
  // return aborted;
  const aborted = await launchesSchema.updateOne(
    {
      flightNumber: id,
    },
    {
      upcoming: false,
      success: false,
    }
  );
  return aborted.modifiedCount === 1 && aborted.acknowledged === true;
}

module.exports = {
  getAllLaunchesFromModels,
  existsLaunch,
  abortLaunch,
  scheduleNewLaunch,
};
