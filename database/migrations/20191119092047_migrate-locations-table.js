exports.up = function(knex) {
  return knex.schema.createTable("locations", table => {
    table.increments();
    table
      .string("city", 128)
      .notNullable()
      .unique();
    table.string("country", 128).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("locations");
};
