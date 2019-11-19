const db = require("../database/db-config");

module.exports = {
  getAll
};

function getAll() {
  return db("locationsStories as LS")
    .join("stories as S", "LS.story_id", "S.id")
    .join("locations as L", "LS.location_id", "L.id")
    .join("photos as P", "P.story_id", "S.id")
    .select("S.id", "S.title", "L.city", "L.country", "P.url", "P.description");
}
