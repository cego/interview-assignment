/* eslint no-console: 0 */

/* External modules */
const express    = require(`express`);       // For running the server
const app        = express();                // For running the server
const bodyParser = require(`body-parser`);   // For parsing the request. Makes all request data available in req.body
// const path       = require(`path`);          // Used to avoid errors when reffering to a path in the file system
require(`express-async-errors`);             // With this we don't have to pass errors like next(err) but can just throw them instead

/* Internal modules */
const handleRoutes         = require(`./server/routing`);
const handleErrors         = require(`./server/error_handler`);
const middleWare           = require(`./server/middleware`);
const consoleLogToFile     = require(`./server/helpers/consol_log_file`);
const database             = require(`./server/helpers/database/Database`);

/* Setup */
global.conf = require(`./server_settings`); // Load settings into grobal variable (available across all scripts)
consoleLogToFile(); // Modifies the console, such that it writes logs into the server/logs dir
database.connect();
database.loadData();

/* Middleware */
app.use(middleWare.requestValidator);
if (global.conf.log) {
  app.use(middleWare.logger); // Logs requests to console
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* Routing */
handleRoutes(express, app);
handleErrors(express, app);
app.use((req, res) => res.sendStatus(404)); // Handles non-existing URI-requests. Has to be the last line before app.listen.

app.listen(global.conf.port, () => console.log(`skaalum-tech listening at http://localhost:${global.conf.port}`));
