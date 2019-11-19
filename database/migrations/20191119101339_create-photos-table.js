exports.up = function(knex) {
  return knex.schema.createTable("photos", table => {
    table.increments();
    table.text("url").notNullable();
    table.text("description").notNullable();
    table
      .integer("story_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("stories")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("photos");
};
