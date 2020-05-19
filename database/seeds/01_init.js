exports.seed = async function(knex) {
  await knex("roles").insert([
    {
      name: "admin" // will get id 1
    },
    {
      name: "user" // will get id 2
    }
  ]);
};
