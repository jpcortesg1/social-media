const router = require("express").Router();
const User = require("./../models/User");
const bcrypt = require("bcrypt");

//Register
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Generate new password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Create user
    const newUser = new User({
      username,
      email,
      password: hashPassword,
    });

    // Save user
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check email
    const user = await User.findOne({ email });
    !user && res.status(404).json("User not found");

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    !validPassword && res.status(400).json("Wrong password");

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
