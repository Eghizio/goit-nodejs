import dotenv from "dotenv";
import sendgrid from "@sendgrid/mail";

dotenv.config();
sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
  to: "test@example.com",
  from: "test@example.com",
  subject: "Message sent by SendGrid",
  text: "Sent from Node.js. Try out Twilio for SMS messaging!",
  html: `<h1>
    Sent from Node.js.
    Try out <a href="https://www.twilio.com">Twilio</a> for SMS messaging!
  </h1>`,
};

sendgrid
  .send(msg)
  .then(console.log)
  .catch(console.error);
