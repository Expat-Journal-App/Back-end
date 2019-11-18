exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("stories")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("stories").insert([
        {
          title: "The best lake in the World Lake Brienz",
          date_trip: "12-7-2018",
          story:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede."
        }
      ]);
    });
};
