const router = require("express").Router();
const Users = require("./usersModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

router.post("/login", (req, res) => {
  let { username, password } = req.body;
  Users.getUserBy({ username })
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res
          .status(200)
          .json({ message: `Welcome ${user.username}`, token: token });
      } else {
        res.status(401).json({ message: `Wrong credentials` });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: `There was an error logging you in: ${error.message}`
      });
    });
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };
  const options = {
    expiresIn: "1d"
  };
  const result = jwt.sign(payload, process.env.SECRET, options);

  return result;
}

module.exports = router;
