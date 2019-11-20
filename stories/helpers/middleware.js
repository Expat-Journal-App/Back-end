const Stories = require("../storiesModels");

module.exports = {
  checkValidtyId,
  checkBodyRequest
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
      console.log(error);
    });
}

function checkBodyRequest(req, res, next) {
  const { title, date_trip, story, city, country, url, description } = req.body;
  if (title && date_trip && story && city && country && url && description) {
    next();
  } else {
    res
      .status(500)
      .json({
        message: `Please provide all required fields: title, date_trip, story, city, country, url and description`
      });
  }
}
