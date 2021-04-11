const otocsv = require("objects-to-csv");
function saveInCSV(fileName, data) {
  const transformed = new otocsv(data);
  try {
    transformed.toDisk(`./${fileName}.csv`);
    return true;
  } catch (e) {
    return false;
  }
}

module.exports = {
    saveInCSV
};