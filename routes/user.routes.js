const userController = require("../controllers/user.controller.js");
const express = require("express");

const Router = express.Router({
  mergeParams: true,
});

Router.post("/logout", userController.logoutProcess);

Router.get("/registeredUsers", userController.registeredUsers);

Router.get("/activeUsers", userController.activeUsers);

module.exports = Router;
