/* eslint no-console: 0 */

const path = require(`path`);
const fs   = require(`fs`);

const HTTPError = require(`./helpers/HTTPError`);
const pad       = require(`./helpers/pad`);
const Time      = require(`./helpers/Time`);

class Middleware {
  // Throws an error if the request isn't valid in some way.
  requestValidator(req, res, next) {
    let err;

    if (global.conf.production) {
      if (req.headers[`x-real-ip`] === undefined) {
        err = `The request doesn't contain an IP-address`;
      }
      // else if {somePossibleError}
      // else if {somePossibleError}
      // (...)
    }

    if (err) {
      throw new HTTPError(400, err, `Bad request`);
    }
    next();
  }

  // Logs all incoming requests in the server log
  logger(req, res, next) {
    const clientIP  = global.conf.production ? `${pad(req.headers[`x-real-ip`], 15, ` `)} | ` : ``;
    const reqMethod = pad(req.method, -7, ` `);
    const reqUrl    = `${req.protocol}://${req.get(`host`)}${req.originalUrl}`;
    const log       = `${clientIP}GOT ${reqMethod}: ${reqUrl}`;

    console.log(log);
    next();
  }

  // Get's the log-stream for the morgan-module
  getLogWriteStream() {
    const time = new Time();
    // create a write stream (in append mode)
    const logWriteStream = fs.createWriteStream(path.join(__dirname, `logs`, `${time.dashDateUS}-full.log`), { flags: `a` });
    return logWriteStream;
  }
}

module.exports = new Middleware();
