const db = require("../database/db-config");

module.exports = {
  getAll,
  getStoriesById,
  insertStory,
  deleteStory,
  updateStory,
  getStoriesBy
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

function getStoriesBy(filter) {
  return db("stories")
    .where(filter)
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

function updateStory(id, storyBody) {
  const {
    title,
    story,
    date_trip,
    city,
    country,
    url,
    description
  } = storyBody;
  const titleStoryExists = getStoriesBy({ title });
  const textStoryExists = getStoriesBy({ story });
  const locationExists = findCity({ city });
  Promise.all([titleStoryExists, textStoryExists, locationExists])
    .then(values => {
      if (values[0].title || values[1].story) {
        throw new Error("Required");
      }
    })
    .catch(error => {
      console.log(error);
    });

  // return db("stories")
  //   .where({ id })
  //   .update({
  //     title,
  //     story,
  //     date_trip
  //   })
  //   .then(data => {
  //     return !data
  //       ? "The story could not be updated"
  //       : db("photos")
  //           .where({ story_id: id })
  //           .update({ url, description })
  //           .then(data => {
  //             return !data
  //               ? "There was a problem updating the photo"
  //               : findCity(city)
  //                   .then(data => {
  //                     return !data
  //                       ? addLocationStories(id, city, country)
  //                       : editLocationsStories(id, data.id);
  //                   })
  //                   .catch(error => {
  //                     console.log(error);
  //                   });
  //           })
  //           .catch(error => {
  //             console.log(error);
  //           });
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   });
}

function updateStoryTable(id, story) {
  return db("stories")
    .where({ id })
    .update(story);
}

function deleteStory(id) {
  return db("stories")
    .where({ id })
    .del()
    .then(data =>
      !!data
        ? "Story has been deleted"
        : `There was a problem deleting story ${id}`
    );
}

function findCity(city) {
  return db("locations")
    .where(city)
    .first();
}

function addLocationStories(id, city, country) {
  return db("locations")
    .insert({ city, country })
    .then(location => {
      return editLocationsStories(id, location[0]);
    });
}

function editLocationsStories(story_id, location_id) {
  return db("locationsStories")
    .where({ story_id })
    .update({ location_id })
    .then(data => {
      return getStoriesById(story_id);
    });
}

function addLocation(location) {
  return db("locations").insert(location);
}
