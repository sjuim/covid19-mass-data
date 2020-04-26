const path = require("path");
const update = require("./update");

const WORKSPACE = process.env.GITHUB_WORKSPACE;
// const DATA_REPO = "data"; // from main.yml checkout action path
// const MAIN_REPO = "main"; // from main.yml checkout action path
const DATA_REPO = "covid-19-data"; // from main.yml checkout action path
const MAIN_REPO = "covid19-mass-data"; // from main.yml checkout action path

//The new filenames
const FILENAME_ALL = "massachusetts.csv";
const dataPath = path.join(
  WORKSPACE,
  DATA_REPO,
  FILENAME_ALL
);
const outputPath = path.join(WORKSPACE, MAIN_REPO, "docs", "timeseries.json");

update(dataPath, outputPath);
