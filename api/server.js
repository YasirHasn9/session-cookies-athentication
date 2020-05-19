const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const server = express();

// routers
const usersRouter = require("../users/users-router");

server.use(express.json());
server.use(helmet());
server.use(cors());

server.use("/api/users", usersRouter);
server.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello, world!"
  });
});

module.exports = server;
