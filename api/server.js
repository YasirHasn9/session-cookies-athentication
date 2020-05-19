const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const server = express();
const session = require("express-session");

// routers
const usersRouter = require("../users/users-router");
const authRouter = require("../auth/auth-router");

server.use(express.json());
server.use(helmet());
server.use(cors());

const sessionConfig = {
  name: "sessionId",
  secret: "keep it secret, keep it safe!",
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: false, // https
    httpOnly: true // when true, js can't get to the cookie
  },
  // we should only save sessions when user allows it
  resave: false,
  saveUninitialized: false
};
server.use(session(sessionConfig));

server.use("/api/users", usersRouter);
server.use("/api/auth", authRouter);
server.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello, world!"
  });
});

module.exports = server;
