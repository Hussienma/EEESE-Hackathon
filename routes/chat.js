const express = require("express");
const router = express.Router();

const { check, validationResult } = require("express-validator");
const Chat = require("../models/chat");

//@route    GET /chat/
//@access   Private
router.get("/", auth, async (req, res) => {
  try {
    const chat = await Chat.findOne({ patient: req.user });

    if (!chat) {
      return res.status(404).json({ msg: "Chat not found" });
    }

    res.json(chat);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route    GET /chat/
//@access   Private
router.post(
  "/",
  [auth, check("text", "Please enter text").exists()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors });
    }
    try {
      let chat = await Chat.findOne({ patient: req.user });

      if (!chat) {
        chat = new Chat({ patient: req.user, doctor: req.user.doctor });
      }

      chat.messages.push({ text: req.body.text });

      await chat.save();

      res.json(chat);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
