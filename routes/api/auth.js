const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../../middleware/auth");

/**
 * @route post api/auth/login
/* @description login user
/* @access public 
*/

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      msg: "Enter valid credentials",
    });
  }
  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(400).json({
        msg: "Invalid email",
      });
    }
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) {
        return res.status(400).json({
          msg: "Invalid password",
        });
      }
      jwt.sign(
        {
          id: user.id,
        },
        config.get("jwtSecret"),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user: {
              name: user.name,
              email: user.email,
              id: user.id,
            },
          });
        }
      );
    });
  });
});

/**
 * @route post api/auth/register
/* @description register new  user
/* @access public 
*/

router.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({
      msg: "Enter all fields",
    });
  }
  User.findOne({ email }).then((user) => {
    if (user) {
      return res.status(400).json({
        msg: "User with this user name already exist",
      });
    }
    const newUser = new User({
      name,
      email,
      password,
    });
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then((user) => {
          jwt.sign(
            {
              id: user.id,
            },
            config.get("jwtSecret"),
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user: {
                  name: user.name,
                  email: user.email,
                  id: user.id,
                },
              });
            }
          );
        });
      });
    });
  });
});

/**
 * @route post api/auth/user
/* @description get user
/* @access public 
*/

router.get("/user", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) throw Error("User does not exist");
    res.json(user);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

module.exports = router;
