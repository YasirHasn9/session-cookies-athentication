function restricted() {
  return (req, res, next) => {
    if (req.session && req.session.loggedIn) {
      next();
    } else {
      res.status(401).json({ message: "cant pass" });
    }
  };
}

module.exports = {
  restricted
};
