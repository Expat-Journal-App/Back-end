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
router.get("/:id", (req, res) => {
  Stories.getStoriesById(req.params.id)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(error => {
      res
        .status(500)
        .json({
          message: `There was an error fetching story ${id}: ${error.message}`
        });
    });
});
module.exports = router;
