import readline from "readline";


const lineReader = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let username = "Username";

lineReader.question("What is your name?\n", (name) => {
  console.log(`Hello there ${name}`);
  username = name;
  console.log(" > To exit just type `EXIT` or press CTRL+C < ");
});

lineReader.on("line", (input) => {
  if (input === "EXIT") {
    console.log(`Goodbye ${username}`);
    return lineReader.close();
  }
  console.log(`${username}: ${input}`);
});