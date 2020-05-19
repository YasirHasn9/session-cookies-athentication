const router = require("express").Router();
const bcrypt = require("bcryptjs");
const Users = require("../users/usersModels");
const { isValid } = require("../middlewares/isValid");

router.post("/register", async (req, res, next) => {
  try {
    const credentials = req.body;
    const rounds = process.env.HASH_ROUNDS || 10;
    const hash = bcrypt.hashSync(credentials.password, rounds);
    credentials.password = hash;
    if (isValid(credentials)) {
      const user = await Users.add(credentials);
      res.status(201).json(user);
    } else {
      res.status(500).json({
        message: "Invalid credentials"
      });
    }
  } catch (err) {
    console.log("register", err);
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await Users.findBy({ username });

    if (user && bcrypt.compareSync(password, user.password)) {
      // send cookies
      req.session.user = user;
      req.session.loggedIn = true;
      res.status(201).json({ message: `Welcome ${user.username}` });
    } else {
      res.status(500).json({
        message: "Invalid credentials"
      });
    }
  } catch (err) {
    next(err);
  }
});

router.get("/logout", async (req, res, next) => {
  try {
    req.session.destroy(err => {
      if (err) {
        res.status(500).json({ message: err });
      } else {
        res.status(204).end();
      }
    });
  } catch (err) {
    next(err);
  }
});
module.exports = router;
