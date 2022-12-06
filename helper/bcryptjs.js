let bcrypt = require("bcryptjs");
let salt = bcrypt.genSaltSync(10);

let hash = (password) => bcrypt.hashSync(password, salt);
let comparePassword = (password, userPassword) => bcrypt.compareSync(password, userPassword);

module.exports = { hash, comparePassword };
