const express = require("express");
const router = express.Router();
const Stories = require("./storiesModels");

// DUMMY TESTING ENDPOINT
router.get("/test", (req, res) => {
  res.status(200).json({ message: `Hello from dummy endpoint` });
});

// GET ALL STORIES ENDPOINTS
router.get("/", (req, res) => {
  Stories.getAll()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: `Could not retrieve stories: ${error.message}` });
    });
});

// GET STORY BY ID ENDPOINT
router.get("/:id", checkValidtyId, (req, res) => {
  res.status(200).json(req.data);
});

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
module.exports = router;
