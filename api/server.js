// IMPORT DEPENDENCIES

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

// IMPORT ROUTER FILE
const storiesRouter = require("../stories/storiesRouter");

// INSTANTIATE EXPRESS
const server = express();

// GLOBAL MIDDLEWARE
server.use(cors());
server.use(helmet());
server.use(express.json());

server.use("/api/stories", storiesRouter);

module.exports = server;
