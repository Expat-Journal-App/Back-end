const Stories = require("../storiesModels");

module.exports = {
  checkValidtyId,
  checkBodyRequest,
  checkTitleExists,
  checkTextStoryExists,
  checkCityExists
};

function checkValidtyId(req, res, next) {
  const { id } = req.params;
  Stories.getStoriesById(id)
    .then(data => {
      if (!data) {
        res.status(404).json({ message: `Story ${id} could not be found` });
      } else {
        req.data = data;
        next();
      }
    })
    .catch(error => {
      res.status(500).json({
        message: `Error: story ${id} could not be found: ${error.message}`
      });
    });
}

function checkBodyRequest(req, res, next) {
  const { title, date_trip, story, city, country, url, description } = req.body;
  if (title && date_trip && story && city && country && url && description) {
    next();
  } else {
    res.status(500).json({
      message: `Please provide all required fields: title, date_trip, story, city, country, url and description`
    });
  }
}

function checkTitleExists(req, res, next) {
  const { title } = req.body;
  const { id } = req.params;
  Stories.getStoriesBy({ title })
    .then(data => {
      if (data && data.id !== Number(id)) {
        res.status(401).json({
          message: `Could not edit the story because there is another story with the same title "${title}"`
        });
      } else {
        next();
      }
    })
    .catch(error => {
      res.status(500).json({
        message: `Could not check if title of story exists in Database: ${error.message}`
      });
    });
}

function checkTextStoryExists(req, res, next) {
  const { story } = req.body;
  const { id } = req.params;
  Stories.getStoriesBy({ story })
    .then(data => {
      if (data && data.id !== Number(id)) {
        res.status(401).json({
          message: `Could not edit story because there is another story with the exact same `
        });
      } else {
        next();
      }
    })
    .catch(error => {
      res.status(500).json({
        message: `There was an error editing the story: ${error.message}`
      });
    });
}

function checkCityExists(req, res, next) {
  const { city } = req.body;
  Stories.findCity({ city })
    .then(data => {
      if (!data) {
        req.cityExists = false;
        req.cityId = null;
        next();
      } else {
        req.cityExists = true;
        req.cityId = data.id;
        next();
      }
    })
    .catch(error => {
      res.status(500).json({
        message: `There was an error editing the story: ${error.message}`
      });
    });
}
