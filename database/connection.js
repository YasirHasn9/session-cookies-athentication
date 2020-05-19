const knex = require("knex");
const knexfile = require("../knexfile");

const environment = process.env.PRODUCTION || "development";
module.exports = knex(knexfile[environment]);
