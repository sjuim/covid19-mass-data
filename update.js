//Setting up the work environment
const fs = require("fs");
const path = require("path");
const parse = require("csv-parse/lib/sync");


// Extract the list of all possible dates and all possible counties from the file
function extractDatesCounties(targetState, filepath) {
  const csv = fs.readFileSync(filepath);
  const [headers, ...rows] = parse(csv);
  const [date, county, state, fips, cases, deaths] = headers;
  const dateList = [];
  const countyList = [];
  
  rows.forEach(([date, county, state, fips, cases, deaths], idx) => {      //The arrow says for every thing, do that action
    if ( targetState.localeCompare(state) == 0 ) {
      dateList[date] = date;
      countyList[county] = county;
    }
  });

  return [Object.keys(countyList), Object.keys(dateList)];
}


// Initialize a 2-dimensional array so that all counts are initially 0
function initializeCountList(counties, dates) {
  const confirmedList = [];
  const deathsList = [];
  var count = 0;

  // console.log("initializeCountList:", "All counties", counties, counties.length);
  // console.log("initializeCountList:", "All Dates", dates, dates.length);

  counties.forEach((county) => {
    count++;
    confirmedList[county] = {};
    deathsList[county] = {};

    dates.forEach((date) => {
      confirmedList[county][date] = 0;
      deathsList[county][date] = 0;
    });
  });

  // console.log("initializeCountList:", "Count", count);
  // console.log("initializeCountList:", "Confirmed List", confirmedList);
  // console.log("initializeCountList:", "Deaths List", deathsList);

  return [confirmedList, deathsList]; 
}


//Reading from the country data method
function extract(targetState, filepath, confirmedList, deathsList) {
  const csv = fs.readFileSync(filepath);
  const [headers, ...rows] = parse(csv);
  const [date, county, state, fips, cases, deaths] = headers;

  rows.forEach(([date, county, state, fips, cases, deaths]) => {      //The arrow says for every thing, do that action
    if ( targetState.localeCompare(state) == 0 ) {
      confirmedList[county][date] = parseInt(cases);
      deathsList[county][date] = parseInt(deaths);
    }
  });

  console.log("extract:", "Confirmed List", confirmedList);
  console.log("extract:", "Deaths List", deathsList);

  return [confirmedList, deathsList];
}

// Main entry point of this module
function update(targetState, dataPath, outputPath) {
  // Because the data is not present for every county for every date, it can lead to a sparse matrix
  // We want to find all dates and counties and then initialize a 2-dimentional array
  const [counties, dates] = extractDatesCounties(targetState, dataPath);
  var [confirmed, deaths] = initializeCountList(counties, dates);

  // This extracts the count from the file
  [confirmed, deaths] = extract(targetState, dataPath, confirmed, deaths);  

  const results = {};

  //Fixing up the name if there are multiple possible names for an accurate count. ex: US vs USA
  counties.forEach((county, idx) => {
    console.log("update:", "Processing", county);
    //Returning the results in the right format
    results[county] = dates.map(date => {
      return {
        date,
        confirmed: confirmed[county][date],
        deaths: deaths[county][date],
        recovered: null
      };
    });
  });

  console.log("update:", "Geneating output JSON file...");
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
}

module.exports = update;
