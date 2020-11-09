const db = require(`./database/Database`);

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

module.exports = checkDatabaseConnection;
