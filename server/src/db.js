const monk = require('monk');

// use environment variable so we can dynamically switch between development and production.
const db = monk('localhost/reactmap');

module.exports = db;
