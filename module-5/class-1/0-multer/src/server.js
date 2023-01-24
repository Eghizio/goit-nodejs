import fs from "fs/promises";
import path from "path";
import express from "express";
import morgan from "morgan";
import { upload, UPLOAD_DIRECTORY, IMAGES_DIRECTORY } from "./middlewares/upload.js";
import { initializeDirectory, sleep } from "./utils.js";


const app = express();

app.use(morgan("dev"));
app.use(express.static(path.join(process.cwd(), "src", "public")));

app.use("/images", express.static(path.join(process.cwd(), "src", "images")));


app.post("/upload", upload.single("picture"), async (req, res) => {
  const { path: temporaryname, originalname } = req.file;

  const filename = path.join(IMAGES_DIRECTORY, originalname);
  // console.log(req.file);
  // console.log({ temporaryname, originalname, filename });

  try {
    // await sleep(5000);
    await fs.rename(temporaryname, filename);
  } catch (error) {
    await fs.unlink(temporaryname);
    return res.sendStatus(500);
  }

  // return res.status(302).redirect(`/images/${originalname}`);
  return res.status(302).redirect("/");
});


app.get("/api/images", async (req, res) => {
  const images = await fs.readdir(IMAGES_DIRECTORY);
  return res.json({ images: images.map(img => "/images/" + img) });
});


app.listen(3000, async () => {
  await initializeDirectory(UPLOAD_DIRECTORY);
  await initializeDirectory(IMAGES_DIRECTORY);
  console.log(`\n${new Date().toISOString()}\nListening on port 3000...`);
});