exports.up = function(knex) {
  return knex.schema.createTable("locationsStories", table => {
    table.increments();
    table
      .integer("story_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("stories")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table
      .integer("location_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("locations")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("locationsStories");
};
