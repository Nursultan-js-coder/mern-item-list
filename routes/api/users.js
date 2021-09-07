const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../../middleware/auth");

// @route get api/users
// @description get all users
// @access public

router.get("/", (req, res) => {
  User.find().then((users) => res.json(users));
});

/**
 * @route get api/user/:id
/* @description get user
/* @access public 
*/

router.get("/:id", (req, res) => {
  User.findOne({ id: req.params.id })
    .select("-password")
    .then((user) => res.json(user))
    .catch((err) => {
      res.status(400).json({
        msg: "No user with given id",
      });
    });
});

// @route delete api/users
// @description delete user
// @access public

router.delete("/:id", (req, res) => {
  User.findOneAndDelete({ id: req.params.id }).then((user) => res.json(user));
});

/**
 * @route post api/user/:id
/* @description update user
/* @access private 
*/

router.put("/:id", auth, async (req, res) => {
  const { role, project } = req.body;
  const userToUpdate = await User.findById(req.params.id);
  console.log("projects:", userToUpdate.projects);
  const update = {
    role,
    projects: [...userToUpdate.projects, project] ?? [project],
  };
  try {
    const user = await User.findByIdAndUpdate(req.params.id, update, {
      new: true,
      upsert: true,
    });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
