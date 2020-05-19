const db = require("../database/connection");

module.exports = {
  find,
  add,
  findById,
  findBy
};

async function find() {
  return await db("users");
}

async function add(user) {
  try {
    const [id] = await db("users").insert(user);
    return findById(id);
  } catch (err) {
    throw err;
  }
}

async function findBy(userData) {
  return await db("users")
    .where(userData)
    .first();
}

async function findById(id) {
  return await db("users")
    .where({ id })
    .first();
}
