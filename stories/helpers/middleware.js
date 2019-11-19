const Stories = require("../storiesModels");

module.exports = {
  checkValidtyId
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
