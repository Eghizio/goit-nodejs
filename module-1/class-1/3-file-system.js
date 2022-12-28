import fs from "fs";
import fsPromises from "fs/promises";
import { join } from "path";


const data = fs.readFileSync("./output", { encoding: "utf-8" });
console.log(data);


const message = "Hello there!";

fs.writeFile("./output", message, { encoding: "utf-8" }, (error) => {
  if (error) console.log("ERROR:", error);
});


fs.appendFile("./output", "\n" + message, { encoding: "utf-8" }, (error) => {
  if (error) console.log("ERROR:", error);
});


const printDirectory = async (directoryName) => {
  const files = await fsPromises.readdir(directoryName);
  // console.log(files);

  const stats = await Promise.all(files.map(async (file) => {
    const filePath = join(directoryName, file);
    const { size, mtime } = await fsPromises.stat(filePath);
    return {
      name: file,
      size,
      date: mtime,
    };
  }));

  console.table(stats);
};

// printDirectory(".");
printDirectory("npm-example");