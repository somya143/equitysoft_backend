const express = require("express");
const { refresh, createUser, authenticateUser } = require("../../controller/auth/auth.controller")
const app = express.Router();

app.route("/signup").post(createUser);
app.route("/login").post(authenticateUser);

module.exports = app;