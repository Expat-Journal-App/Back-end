exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("locations")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("locations").insert([
        { city: "Mount Robson", country: "Canada" },
        { city: "Arles", country: "France" },
        { city: "Brienz", country: "Switzerland" },
        { city: "Sky-Ravine", country: "USA" },
        { city: "Horshoe-bend", country: "USA" },
        { city: "Snowy Mountains", country: "Switzerland" },
        { city: "Byron Bay", country: "Australia" },
        { city: "Surfers Paradise", country: "Australia" },
        { city: "Reykjavik", country: "Iceland" },
        { city: "Victoria", country: "Seychelles" }
      ]);
    });
};
