const monk = require('monk');

// use environment variable so we can dynamically switch between development and production.
const db = monk(process.env.DATABASE_URL);

module.exports = db;
