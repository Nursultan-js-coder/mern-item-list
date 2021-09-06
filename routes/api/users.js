const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const config = require("config");

// @route get api/users
// @description get all users
// @access public

router.get("/", (req, res) => {
  User.find().then((users) => res.json(users));
});

// @route delete api/users
// @description delete user
// @access public

router.delete("/:id", (req, res) => {
  User.findOneAndDelete({ id: req.params.id }).then((user) => res.json(user));
});

module.exports = router;
