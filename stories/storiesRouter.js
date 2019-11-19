const express = require("express");
const router = express.Router();
const Stories = require("./storiesModels");

// IMPORT MIDDLEWARE

const middleware = require("./helpers/middleware");

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
router.get("/:id", middleware.checkValidtyId, (req, res) => {
  res.status(200).json(req.data);
});

// ADD A STORY

router.post("/", (req, res) => {
  Stories.insertStory(req.body)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: `Your story could not be posted: ${error.message}` });
    });
});

module.exports = router;
