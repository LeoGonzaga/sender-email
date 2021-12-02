const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3090;
app.use(cors());

app.use(express.json());

app.post("/send", function (req, res) {
  const { name, phone, email, message } = req.body;
  const mail = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });
  const mailOptions = {
    to: "lucas@atlasprojetos.com",
    from: email,
    subject: `${name} te enviou uma mensagem pelo site.`,
    text:
      "Nome:" +
      name +
      "\n" +
      "Contato:" +
      phone +
      "\n" +
      "Email:" +
      email +
      "\n\n" +
      "Mensagem:" +
      "\n" +
      message,
  };
  mail.sendMail(mailOptions, function (err) {
    if (err) {
      res.json({
        error: true,
        message:
          "Parece que alguma coisa deu errado. Aguarde um instante e tente novamente.",
      });
      return;
    }
    res.json({
      error: false,
      message: "Enviado com sucesso! Agradeçemos o contato.",
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
