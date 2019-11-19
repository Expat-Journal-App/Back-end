exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("locationsStories")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("locationsStories").insert([
        { story_id: 1, location_id: 1 },
        { story_id: 2, location_id: 2 },
        { story_id: 3, location_id: 3 },
        { story_id: 4, location_id: 4 },
        { story_id: 5, location_id: 5 },
        { story_id: 6, location_id: 6 },
        { story_id: 7, location_id: 7 },
        { story_id: 8, location_id: 8 },
        { story_id: 9, location_id: 9 }
        // { story_id: 10, location_id: 10 }
      ]);
    });
};
