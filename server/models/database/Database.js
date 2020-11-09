const sqlite3 = require(`sqlite3`).verbose();
const fs      = require(`fs`);
const path    = require(`path`);

const dbSource = path.join(__dirname, `db.sqlite`);

class Database {
  connect() {
    this.db = new sqlite3.Database(dbSource, (err) => {
      if (err) {
        // Cannot open database
        throw err;
      }
    });
  }

  loadData() {
    const dumpFilePath = path.join(__dirname, `sqldump.sql`);
    const dataSql = fs.readFileSync(dumpFilePath).toString();
    this.db.exec(dataSql, (err) => {
      // Data has already been loaded
    });
  }

  async query(queryString) {
    return new Promise((resolve, reject) => {
      this.db.all(queryString, (err, rows) => {
        if (err) {
          reject(err);
        }
        else {
          resolve(rows);
        }
      });
    });
  }
}

module.exports = new Database();
