const { Profile, User } = require("../models/index");

class ProfileController {
  static async addProfile(req, res, next) {
    try {
      const { username, profPict, phoneNumber, address } = req.body;
      const { id } = req.user;
      let data = await Profile.create({
        username,
        profPict,
        phoneNumber,
        address,
        UserId: id,
      });
      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async updataProfile(req, res, next) {
    try {
      const id = req.params.id;
      const { username, profPict, phoneNumber, address } = req.body;
      let data = await Profile.findByPk(id);
      if (!data) {
        throw { name: "Not_found" };
      }
      let dataUpdate = await Profile.update(
        {
          username,
          profPict,
          phoneNumber,
          address,
        },
        { where: { id } }
      );
      if (dataUpdate[0] === 0) {
        throw { name: "Not_found" };
      }
      res.status(200).json({ message: `Profile ${username} updated` });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProfileController;
