const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Item = require("../../models/Item");

// @route GET api/items
// @description get items
// @access public

router.get("/", (req, res) => {
  Item.find()
    .sort({ data: -1 })
    .then((items) => res.json(items));
});

// @route POST api/items
// @description post item
// @access public

router.post("/", auth, async (req, res) => {
  const newItem = new Item({
    name: req.body.name,
    date: new Date().toLocaleDateString(),
  });
  await newItem.save().then((data) => res.json(data));
});

// @route DELETE api/items
// @description delete item
// @access public

router.delete("/:id", auth, async (req, res) => {
  Item.findById(req.params.id)
    .then((item) => item.delete())
    .then(() => res.json({ success: true }))
    .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
