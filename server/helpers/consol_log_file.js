/* eslint no-console: 0 */

const fs   = require(`fs`);
const path = require(`path`);

const Time = require(`./Time`);

const logDir = path.join(__dirname, `..`, `logs`);

// Modifies the console, such that it logs into the server/logs dir too
module.exports = () => {
  const logStdout = process.stdout;

  console.log = (log) => {
    const time = new Time();
    const logWithTimeStamp = `[${time.slashDate} ${time.colonTime}] ${log}\n`;
    logFile(logWithTimeStamp);
    logStdout.write(logWithTimeStamp);
  };
  console.error = console.log;
};

function logFile(log) {
  const time = new Time();
  fs.appendFile(path.join(logDir, `${time.dashDateUS}-console.log`), log, (error) => {
    if (error) {
      throw error;
    }
  });
}
