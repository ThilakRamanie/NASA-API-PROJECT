const launches = new Map();

let latestFlightNumber = 100;

const launch = {
  flightNumber: latestFlightNumber,
  mission: "Kepler exploration M",
  rocket: "Explore IS1",
  launchDate: new Date("July 11 2028"),
  target: "kepler-442 b",
  customers: ["NASA", "ISRO"],
  upcoming: true,
  success: true,
};

launches.set(launch.flightNumber, launch);

function getAllLaunchesFromModels() {
  return Array.from(launches.values());
}

function addNewLaunch(launch) {
  latestFlightNumber++;
  launches.set(
    latestFlightNumber,
    Object.assign(launch, {
      flightNumber: latestFlightNumber,
      customers: ["NAST with ISRO"],
      upcoming: true,
      success: true,    
    })
  );
}

module.exports = { getAllLaunchesFromModels, addNewLaunch };
