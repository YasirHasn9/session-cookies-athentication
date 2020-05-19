const router = require("express").Router();
const bcrypt = require("bcryptjs");
const Users = require("../users/usersModels");
function isValid(user) {
  return Boolean(
    user.username && user.password && typeof user.password === "string"
  );
}
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
    const user = await Users.findBy({ username })
    if (user) {
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
module.exports = router;
