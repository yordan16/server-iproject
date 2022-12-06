const { User, Profile } = require("../models/index");
const { comparePassword } = require("../helper/bcryptjs");
const { createToken } = require("../helper/jwt");
const ProfileController = require("./profileController");
const sendEmail = require("../helper/nodemailer");

class UserController {
  static async register(req, res, next) {
    try {
      const { email, password } = req.body;
      let data = await User.create({
        email,
        password,
      });
      sendEmail(email);
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
    }
  }
  static async logIn(req, res, next) {
    try {
      const { email, password } = req.body;
      let data = await User.findOne({
        where: {
          email: email,
        },
      });
      if (!data) {
        throw { name: "Invalid_input" };
      }

      let checkPassword = comparePassword(password, data.password);
      if (!checkPassword) {
        throw { name: "Invalid_input" };
      }
      let payload = { id: data.id };
      let access_token = createToken(payload);

      res.status(200).json({ access_token });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
