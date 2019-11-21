const db = require("../database/db-config");

module.exports = {
  addUser
};

function getUserById(id) {
  return db("users")
    .where({ id })
    .first();
}

function addUser(user) {
  return db("users")
    .insert(user)
    .then(ids => {
      return getUserById(ids[0]);
    });
}
