const { User } = require("../models/index");
const { OAuth2Client } = require("google-auth-library");
const { comparePassword } = require("../helper/bcryptjs");
const { createToken } = require("../helper/jwt");
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
      next(error);
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
  static async googleLogin(req, res, next) {
    try {
      const token = req.headers.google_token;
      const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

      const client = new OAuth2Client(CLIENT_ID);
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID,
      });
      const google_payload = ticket.getPayload();

      const [user, created] = await User.findOrCreate({
        where: {
          email: google_payload.email,
        },
        defaults: {
          username: google_payload.given_name,
          email: google_payload.email,
          password: "google_password",
          address: "google_address",
          phoneNumber: "google_phoneNumber",
        },
        hooks: false,
      });
      let payload = { id: user.id };
      let access_token = createToken(payload);
      res.status(200).json({
        access_token: access_token,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
