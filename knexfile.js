// Update with your config settings.

module.exports = {
  development: {
    // here it can be whatever database you wanna work with
    client: "sqlite3",
    // this is in case we have a default null value for the keys
    useNullAsDefault: true,
    connection: {
      // this is looking for the location of the database started from the root of your folders
      filename: "./database/auth.db3"
    },
    poo: {
      afterCreate: (conn, done) => {
        // in case we use a foreign keys
        conn.run("PRAGMA foreign_keys = ON", done);
      }
    },
    migrations: {
      directory: "./database/migrations"
    },
    seeds: {
      directory: "./database/seeds"
    }
  }
};
