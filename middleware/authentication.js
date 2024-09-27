const { decoded } = require("../helper/jwt");
const { User } = require("../models/index");
let authentication = async (req, res, next) => {
  try {
    let { access_token } = req.headers;
    if (!access_token) {
      throw { name: "Unauthorized" };
    }
    let payload = decoded(access_token);
    let user = await User.findByPk(payload.id);
    if (!user) {
      throw { name: "Unauthorized" };
    }
    req.user = { id: user.id, email: user.email };
    next();
  } catch (error) {
    next(error);
  }
};
module.exports = authentication;
