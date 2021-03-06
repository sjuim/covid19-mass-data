const path = require("path");
const update = require("./update");

const WORKSPACE = process.env.GITHUB_WORKSPACE;
// const DATA_REPO = "data"; // from main.yml checkout action path
// const MAIN_REPO = "main"; // from main.yml checkout action path
const DATA_REPO = "covid-19-data"; // from main.yml checkout action path
const MAIN_REPO = "covid19-mass-data"; // from main.yml checkout action path

//The source data file
const FILENAME_ALL = "us-counties.csv";
const dataPath = path.join(
  WORKSPACE,
  DATA_REPO,
  FILENAME_ALL
);
const outputPath = path.join(WORKSPACE, MAIN_REPO, "docs", "timeseries.json");

// In this application, we want to restrict our state to Massachusetts
const TARGET_STATE = "Massachusetts";

update(TARGET_STATE, dataPath, outputPath);
