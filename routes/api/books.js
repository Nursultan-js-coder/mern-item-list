const express = require("express");
const router = express.Router();

const Book = require("../../models/Book");

router.get("/", (req, res) => {
  Book.find()
    .sort({ data: -1 })
    .then((items) => res.json(items));
});

router.post("/", (req, res) => {
  const newPost = new Book({
    name: req.body.name,
    genre: req.body.genre,
    authorId: req.body.authorId,
  });
  newPost.save().then((book) => res.json(book));
});

module.exports = router;
