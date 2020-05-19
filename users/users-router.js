const router = require("express").Router();
const Users = require("./usersModels");
const { restricted } = require("../middlewares/restricted");

router.use(restricted());
router.get("/", async (req, res, next) => {
  try {
    const users = await Users.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});
module.exports = router;
