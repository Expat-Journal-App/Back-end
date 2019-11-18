exports.up = function(knex) {
  return knex.schema.createTable("stories", table => {
    table.increments();
    table
      .string("title", 128)
      .notNullable()
      .unique();
    table.date("date_trip").notNullable();
    table.timestamps(true, true);
    table
      .text("story")
      .notNullable()
      .unique();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("stories");
};
