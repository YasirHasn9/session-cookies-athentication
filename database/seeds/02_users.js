exports.seed = async function(knex) {
  await knex("users").insert([
    {
      username: "groot",
      password: "Iamgroot!",
      role: 1
    },
    {
      username: "admin",
      password: "keepitsecret,keepitsafe.",
      role: 1
    }
  ]);
};
