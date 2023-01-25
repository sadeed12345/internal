const loginController = require("../controllers/login.controller.js");
const express = require("express");

const Router = express.Router({
  mergeParams: true,
});

// Router.post("/register", loginController.registerProcess);

Router.post("/login", loginController.loginProcess);

module.exports = Router;
