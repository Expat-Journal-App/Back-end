exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("stories")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("stories").insert([
        {
          title: "A trip to Kiney Lake",
          date_trip: "12-5-2018",
          story:
            "aLorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede."
        },
        {
          title: "The best locations in France",
          date_trip: "12-6-2018",
          story:
            "bLorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede."
        },
        {
          title: "The best lake in the World Lake Brienz",
          date_trip: "12-7-2018",
          story:
            "cLorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede."
        },
        {
          title: "A stary night in the canyon",
          date_trip: "12-8-2018",
          story:
            "dLorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede."
        },
        {
          title: "A day at the horshoe-bend",
          date_trip: "12-9-2018",
          story:
            "eLorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede."
        },
        {
          title: "Field trip in the Snow",
          date_trip: "12-10-2018",
          story:
            "fLorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede."
        },
        {
          title: "The Black Beaches of Australia",
          date_trip: "12-11-2018",
          story:
            "gLorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede."
        },
        {
          title: "Sandstone Cliffs & Waterfalls",
          date_trip: "12-12-2018",
          story:
            "hLorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede."
        },
        {
          title: "Seychelles the beach paradise",
          date_trip: "12-2-2019",
          story:
            "iLorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede."
        },
      ]);
    });
};
