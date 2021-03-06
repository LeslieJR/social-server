const models = require("../models");
const utils = require("../utils");
const config = require("../config");
const jwt = require("jsonwebtoken");
const values = require("../values");

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await models.user.findOne({ email });
    if (!user) {
      return res.json({ user, err: "USER NOT FOUND" });
    }

    const isValid = await utils.bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.json({ err: "PASSWORD DOES NOT MATCH" });
    }
    const data = { email: user.email };
    const token = jwt.sign(data, config.jwt.secret);
    return res.json({ token, avatar: user.avatar, email: user.email });
  } catch (err) {
    return res.json({ error: err.message });
  }
};
const signUp = async (req, res) => {
  try {
    const { email, password, password2 } = req.body;
    const file = req.file;
    const hostname = config.server.hostname;
    if (password !== password2) {
      return res.json({ err: "PASSWORD DO NOT MATCH" });
    }
    const hash = await utils.bcrypt.encrypt(password);
    const user = {
      avatar: hostname + "/" + values.avatarFolder + "/" + file.filename,
      email,
      password: hash,
    };
    const newUser = await models.user.create(user);
    return res.status(201).json(newUser);
  } catch (err) {
    return res.json({ error: err.message });
  }
};
module.exports = {
  signIn,
  signUp,
};
