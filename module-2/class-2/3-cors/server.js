import express from "express";
import cors from "cors";

const app = express();

// app.use(cors());

app.get("/hello", (req, res) => res.json({ hello: "there" }));

app.listen(3000, () => console.log("Listening on 3000"));