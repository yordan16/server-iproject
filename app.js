require("dotenv").config();
const cors = require("cors");
const express = require("express");
const router = require("./routers");
const app = express();
const PORT = process.env.PORT || 3000;
const errorHandler = require("./middleware/errorHandler");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/", router);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log("this app running on port", PORT);
});

module.exports = app;
