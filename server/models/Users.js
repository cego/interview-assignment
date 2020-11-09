const db = require(`./database/Database`);

class Users {
  async get(req, res) {
    const users = await db.query(`SELECT * FROM users;`);
    res.json(users);
  }
}

module.exports = new Users();
