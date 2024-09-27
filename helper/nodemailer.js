const nodemailer = require("nodemailer");

function sendEmail(email) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.email",
    port: 465,
    service: "gmail",
    secure: true,
    auth: {
      user: "gurinoputroyordan@gmail.com",
      pass: process.env.PASS_NODEMAILER,
    },
    debug: true,
    logger: true,
  });
  let baseUrl = "http://localhost:3000/";
  const option = {
    from: "gurinoputroyordan@gmail.com",
    to: email,
    subject: "Success Register on Animax",
    text: "Your Account has been create",
    html: `Congratulation, now your account can be use for watching anime that you want.
    Please click the link to continue ${baseUrl}`,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(option, (err, info) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      resolve("success");
      console.log("sent: " + info);
    });
  });
}

module.exports = sendEmail;
