const Database = require(`./abstract_models/mysqlConnector`);

class Biler extends Database {
  constructor() {
    super();
    this.table = `biler`;
  }

  async get(req, res) {
    const bil = await this.query(`SELECT * FROM ${this.table}`);
    res.json(bil);
  }
}

module.exports = new Biler();
