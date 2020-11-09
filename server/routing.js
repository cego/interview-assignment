// const path = require(`path`);

// const HTTPError = require(`./helpers/HTTPError`);

const checkDatabaseConnection = require(`./models/checkDatabaseConnection`);
const users = require(`./models/Users`);

module.exports = (express, app) => {
  app.get(`/api`,       (req, res) => checkDatabaseConnection(req, res));
  app.use(`/api/users`, (req, res) => users.get(req, res));
};
