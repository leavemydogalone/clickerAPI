const User = require("../models/User");
const { verifyToken, verifyTokenAndAuthorization } = require("./verifyToken");

const router = require("express").Router();

// update user
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  // if you are updating the password, update it as encrypted
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SECRET
    ).toString();
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all users
router.get("/", verifyToken, async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get top 10 user clicks
router.get("/clicks", verifyToken, async (req, res) => {
  const query = req.query.top;
  try {
    const users = query
      ? await User.find().sort({ clicks: -1 }).limit(10)
      : await User.find();

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
