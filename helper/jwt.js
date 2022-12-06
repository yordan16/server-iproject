let jwt = require("jsonwebtoken");

let createToken = (payload) => jwt.sign(payload, process.env.SECRET);
let decoded = (token) => jwt.verify(token, process.env.SECRET);

module.exports = { createToken, decoded };
