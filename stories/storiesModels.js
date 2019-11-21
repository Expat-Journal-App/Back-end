const db = require("../database/db-config");

module.exports = {
  getAll,
  getStoriesById,
  insertStory,
  deleteStory,
  updateStory,
  getStoriesBy,
  findCity
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

function insertStory(storyBody, cityExists, cityId) {
  switch (cityExists) {
    case false:
      const insertStoryAddStory = db("stories").insert({
        title: storyBody.title,
        story: storyBody.story,
        date_trip: storyBody.date_trip
      }, 'id');
      const insertStoryAddLocation = addLocation({
        city: storyBody.city,
        country: storyBody.country
      }, 'id');
      return Promise.all([insertStoryAddStory, insertStoryAddLocation])
        .then(values => {
          const insertStoryAddPhoto = insertPhoto(storyBody, values[0][0]);
          const insertStoryAddLocationsStories = addLocationsStories(
            values[0][0],
            values[1][0]
          );
          return Promise.all([
            insertStoryAddPhoto,
            insertStoryAddLocationsStories
          ])
            .then(values => {
              return values[1];
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log(error);
        });
    case true:
      return db("stories")
        .insert({
          title: storyBody.title,
          story: storyBody.story,
          date_trip: storyBody.date_trip
        })
        .then(data => {
          const insertStoryAddPhoto = insertPhoto(storyBody, data[0]);
          const insertStoryAddLocationsStories = addLocationsStories(
            data[0],
            cityId
          );
          return Promise.all([
            insertStoryAddPhoto,
            insertStoryAddLocationsStories
          ])
            .then(values => {
              return values[1];
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log(error);
        });

    default:
      console.log("yay");
  }
}

function insertPhoto(story, storyId) {
  return db("photos").insert({
    url: story.url,
    description: story.description,
    story_id: storyId
  }, 'id');
}

function updateStory(id, storyBody, cityExists, cityId) {
  switch (cityExists) {
    case false:
      const updatingStory = db("stories")
        .where({ id })
        .update({
          title: storyBody.title,
          story: storyBody.story,
          date_trip: storyBody.date_trip
        });
      const updatingPhoto = db("photos")
        .where({ story_id: id })
        .update({
          url: storyBody.url,
          description: storyBody.description
        });
      const addingLocation = addLocation({
        city: storyBody.city,
        country: storyBody.country
      });
      return Promise.all([updatingStory, updatingPhoto, addingLocation])
        .then(values => {
          return updateLocationsStories(id, values[2][0]);
        })
        .catch(error => {
          console.log(error);
        });
    case true:
      const updatingStoryTrue = db("stories")
        .where({ id })
        .update({
          title: storyBody.title,
          story: storyBody.story,
          date_trip: storyBody.date_trip
        });
      const updatingPhotoTrue = db("photos")
        .where({ story_id: id })
        .update({
          url: storyBody.url,
          description: storyBody.description
        });
      return Promise.all([updatingStoryTrue, updatingPhotoTrue])
        .then(() => {
          return updateLocationsStories(id, cityId);
        })
        .catch(error => {
          console.log(error);
        });
    default:
      console.log("yay");
  }
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

function addLocationsStories(storyId, locationId) {
  return db("locationsStories")
    .insert({
      story_id: storyId,
      location_id: locationId
    }, 'id')
    .then(() => {
      return getStoriesById(storyId);
    })
    .catch(error => {
      console.log(error);
    });
}

function updateLocationsStories(story_id, location_id) {
  return db("locationsStories")
    .where({ story_id: story_id })
    .update({ location_id: location_id })
    .then(data => {
      return getStoriesById(story_id);
    })
    .catch(error => {
      console.log(error);
    });
}

function addLocation(location) {
  return db("locations").insert(location);
}

// function editLocationsStories(story_id, location_id) {
//   return db("locationsStories")
//     .where({ story_id })
//     .update({ location_id })
//     .then(data => {
//       return getStoriesById(story_id);
//     });
// }

// function insertLocation(story) {
//   return db("locations").insert({
//     city: story.city,
//     country: story.country
//   });
// }

// function insertLocationStory(storyId, locationId) {
//   return db("locationsStories").insert({
//     story_id: storyId,
//     location_id: locationId
//   });
// }
