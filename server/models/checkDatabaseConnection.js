const db = require(`../helpers/database/Database`);

async function checkDatabaseConnection(req, res) {
  let status = `API is `;
  try {
    db.connect();
    status += `up and running!`;
  }
  catch (error) {
    if (global.conf.logErrors) {
      console.log(error.stack);
    }
    status += `down. Sorry.`;
  }
  finally {
    res.json({ status });
  }
}

async function promisifiedConnect(connection) {
  return new Promise((resolve, reject) => {
    connection.connect((err) => {
      if (err) {
        reject(err);
      }
      else {
        resolve();
      }
    });
  });
}

module.exports = checkDatabaseConnection;
