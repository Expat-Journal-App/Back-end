const router = require("express").Router();
const Users = require("./usersModels");

router.get("/", (req, res) => {
  res.status(200).json({ message: `Hello from dummy auth endpoint` });
});

module.exports = router;
