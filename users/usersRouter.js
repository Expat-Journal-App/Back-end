const router = require("express").Router();
const Users = require("./usersModels");
const bcrypt = require("bcryptjs");

// DUMMY ENDPOINT TO TEST
router.get("/", (req, res) => {
  res.status(200).json({ message: `Hello from dummy auth endpoint` });
});

router.post("/register", (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 11);
  const newUser = {
    username: req.body.username,
    password: hash
  };
  Users.addUser(newUser)
    .then(data => {
      res.status(200).json({
        message: `User saved succesfully`,
        user: {
          id: data.id,
          username: data.username
        }
      });
    })
    .catch(error => {
      res
        .status(401)
        .json({ message: `There was a problem saving user: ${error.message}` });
    });
});

module.exports = router;
