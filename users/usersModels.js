const db = require("../database/db-config");

module.exports = {
  addUser,
  getUserBy
};

function getUserById(id) {
  return db("users")
    .where({ id })
    .first();
}

function getUserBy(filter) {
  return db("users")
    .where(filter)
    .first();
}

function addUser(user) {
  return db("users")
    .insert(user)
    .then(ids => {
      return getUserById(ids[0]);
    });
}
