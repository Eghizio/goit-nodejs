import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const dataPayload = {
  id: 1337,
  name: "Kuba",
};

const { JWT_SECRET } = process.env;

const token = jwt.sign(dataPayload, JWT_SECRET);

console.log({ token }, "\n");

console.log({ dataPayload });
console.log({ decoded: jwt.decode(token) });

// console.log(jwt.verify(token, JWT_SECRET, { complete: true }));