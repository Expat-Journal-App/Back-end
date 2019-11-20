const db = require("../database/db-config");

module.exports = {
  getAll,
  getStoriesById,
  insertStory
};

function getAll() {
  return db("locationsStories as LS")
    .join("stories as S", "LS.story_id", "S.id")
    .join("locations as L", "LS.location_id", "L.id")
    .join("photos as P", "P.story_id", "S.id")
    .select(
      "S.id",
      "S.title",
      "S.story",
      "S.date_trip",
      "S.created_at",
      "L.city",
      "L.country",
      "P.url",
      "P.description"
    );
}

function getStoriesById(id) {
  return db("locationsStories as LS")
    .join("stories as S", "LS.story_id", "S.id")
    .join("locations as L", "LS.location_id", "L.id")
    .join("photos as P", "P.story_id", "S.id")
    .select(
      "S.id",
      "S.title",
      "S.story",
      "S.date_trip",
      "S.created_at",
      "L.city",
      "L.country",
      "P.url",
      "P.description"
    )
    .where("S.id", id)
    .first();
}

function insertStory(story) {
  return db("stories")
    .insert({
      title: story.title,
      story: story.story,
      date_trip: story.date_trip
    })
    .then(storyId => {
      const newPhoto = insertPhoto(story, storyId[0]);
      const newLocation = insertLocation(story);
      return Promise.all([newPhoto, newLocation])
        .then(data => {
          return insertLocationStory(storyId[0], data[1][0])
            .then(() => {
              return getStoriesById(storyId[0]);
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log(error);
        });
    });
}

function insertPhoto(story, storyId) {
  return db("photos").insert({
    url: story.url,
    description: story.description,
    story_id: storyId
  });
}

function insertLocation(story) {
  return db("locations").insert({
    city: story.city,
    country: story.country
  });
}

function insertLocationStory(storyId, locationId) {
  return db("locationsStories").insert({
    story_id: storyId,
    location_id: locationId
  });
}
