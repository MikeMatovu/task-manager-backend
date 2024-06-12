const express = require("express");
const {
  signUpUser,
  signInUser,
  getUser,
} = require("../controllers/userController");
const { verifyUser } = require("../middleware/Middleware");
const router = express.Router();

router.post("/signup", signUpUser);
router.post("/signin", signInUser);

router.route("/me").get([verifyUser], getUser);

module.exports = router;
