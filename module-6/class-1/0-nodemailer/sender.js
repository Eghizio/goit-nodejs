import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";

const { EMAIL_USER, EMAIL_PWD } = process.env;

const imgUrl = "https://raw.githubusercontent.com/Eghizio/express-intro/main/src/public/meme.png";
const link = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

const sendEmail = async () => {
  const testAccount = await nodemailer.createTestAccount();
  console.log({ testAccount });

  const testAuth = { user: testAccount.user, pass: testAccount.pass };
  const etherealAuth = { user: EMAIL_USER, pass: EMAIL_PWD };

  const auth = EMAIL_USER && EMAIL_PWD ? etherealAuth : testAuth;
  console.log({ auth });

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth
  });

  const info = await transporter.sendMail({
    from: '"Jacob" <jacob@example.com>',
    to: ["first@example.com", "second@example.com"],
    subject: `Hello there ${new Date().toISOString()}`,
    text: "General Kenobi!",
    html: `
    <h1><b>General Kenobi!</b></h1>
    <div><a href='${link}'>A gift for You <3</a></div>
    <img src='${imgUrl}' alt='meme' />`,
  });

  console.log(`Message sent: ${info.messageId}`, { info });
  // preview only for Ethereal mail
  console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
};

sendEmail().catch(console.error);
