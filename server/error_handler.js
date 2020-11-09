/* eslint no-console: 0 */
const HTTPError = require(`./helpers/HTTPError`);

module.exports = (express, app) => {
  app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    // We expect all errors to be thrown with the HTTPError module
    const expected = err.name === `HTTPError`;

    // Logs all info about the error
    if (global.conf.logErrors) {
      const log = expected ? `Error (${err.status}): ${err.info}\n${err.stack}` : err.stack;
      console.error(log);
    }
    else if (global.conf.log) { // Logs on one line only
      const log = expected ? `Error (${err.status}): ${err.info}` : err;
      console.error(log);
    }

    // If the HTTPError module weren't used to throw the error,
    // it means that something unexpected has happened,
    // therefore we'll log the error and generate a generic error response to the client
    // (which is the HTTPError constructor's default)
    if (!expected) {
      err = new HTTPError(); // eslint-disable-line no-param-reassign
    }

    res.status(err.status).json(err.getResObj());
  });
};
