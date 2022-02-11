const router = require("express").Router();
const Conversation = require("../models/Conversation");

// New conversation
router.post("/", async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderID, req.body.receiverID],
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Ger conversation of a user
router.get("/:userId", async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
