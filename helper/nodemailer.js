const nodemailer = require("nodemailer");

function sendEmail(email) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.email",
    port: 465,
    service: "gmail",
    secure: true,
    auth: {
      user: "gurinoputroyordan@gmail.com",
      pass: "uhajcodgpqgsuktu",
    },
    debug: true,
    logger: true,
  });

  const option = {
    from: "gurinoputroyordan@gmail.com",
    to: email,
    subject: "Acount Success Create",
    text: "Your Account has been create",
    html: "<b>Your Account has been create</b>",
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(option, (err, info) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      resolve("success");
      console.log("sent: " + info, "<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
    });
  });
}

module.exports = sendEmail;
