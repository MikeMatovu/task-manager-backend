const bcrypt = require("bcrypt");
const User = require("../models/User");
const { sendResponseError } = require("../middleware/Middleware");
const { checkPassword, newToken } = require("../utils/utilityFunctions");

const signUpUser = async (req, res) => {
  const { email, fullName, password } = req.body;
  try {
    const hash = await bcrypt.hash(password, 8);

    await User.create({ ...req.body, password: hash });
    res.status(201).send("Sucessfully account opened ");
    return;
  } catch (err) {
    console.log("Error : ", err);
    sendResponseError(500, "Something wrong please try again", res);
    return;
  }
};

const signInUser = async (req, res) => {
  const { password, email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!!!user) {
      sendResponseError(400, "No user found, sign up first !", res);
    }

    const same = await checkPassword(password, user.password);
    if (same) {
      let token = newToken(user);
      res.status(200).send({ status: "ok", token });
      return;
    }
    sendResponseError(400, "Invalid password !", res);
  } catch (err) {
    console.log("EROR", err);
    sendResponseError(500, `Error ${err}`, res);
  }
};

const getUser = async (req, res) => {
  res.status(200).send({ user: req.user });
};
module.exports = { signUpUser, signInUser, getUser };
