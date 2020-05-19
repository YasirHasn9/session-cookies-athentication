exports.up = async function(knex) {
  await knex.schema.createTable("roles", role => {
    role.increments("id");
    role
      .string("username", 128)
      .notNullable()
      .unique();
    role.boolean("role").defaultTo(false);
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists("roles");
};
