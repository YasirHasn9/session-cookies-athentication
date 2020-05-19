const db = require("../database/connection");

module.exports = {
  find,
  add,
  findById,
  findBy
};

function find() {
  return db("users");
}

async function add(user) {
  try {
    const [id] = await db("users").insert(user);
    return findById(id);
  } catch (err) {
    console.log("add db", err);
    throw err;
  }
}

async function findBy(userData) {
  return await db("users")
    .where(userData)
    .first();
}

async function findById(id) {
  return db("users")
    .where({ id })
    .first();
}
