import path from "path";
import multer from "multer";

export const UPLOAD_DIRECTORY = path.join(process.cwd(), "src", "uploads");
export const IMAGES_DIRECTORY = path.join(process.cwd(), "src", "images");


const storage = multer.diskStorage({
  destination: (req, file, callback) => { callback(null, UPLOAD_DIRECTORY); },
  filename: (req, file, callback) => {
    const date = Date.now();
    const rnd = Math.floor(Math.random() * 1_000_000);
    const name = [date, rnd, file.originalname].join("_");
    callback(null, name);
  },
  limits: { fileSize: 1_048_576 },
});

export const upload = multer({ storage });
