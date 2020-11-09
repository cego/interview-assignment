// const path = require(`path`);

// const HTTPError = require(`./helpers/HTTPError`);

const checkDatabaseConnection = require(`./models/checkDatabaseConnection`);

module.exports = (express, app) => {
  app.get(`/`, (req, res) => checkDatabaseConnection(req, res));
};
