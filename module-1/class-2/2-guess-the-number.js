import readline from "readline";
import fs from "fs/promises";
import colors from "colors";


const getFilename = () => {
  const args = process.argv.slice(2);
  const resultsFile = args.find(str => str.includes("--file=")) ?? "--file=results";

  const fileName = resultsFile.replace("--file=", "");

  if (fileName.length === 0) throw new Error("Please provide a non-empty filename using --file='filename'");
  return fileName;
};

const saveResultToFile = async (result, fileName) => {
  try {
    if (!fileName) fileName = getFilename();

    await fs.appendFile(fileName, result + "\n");
    console.log(colors.green(`Saved result to ${fileName}`));
  } catch (error) {
    console.log(`Failed to save the result to ${fileName}`);
  }
};




const isValidNumber = (input) => {
  const isNumber = !isNaN(input);
  const isInRange = input >= 1 && input <= 10;

  if (!isNumber || !isInRange) {
    console.log(colors.red(`Please provide a valid number between 1 and 10!`));
    return false;
  }
  return true;
};


const guessTheNumber = () => {
  const lineReader = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const secretNumber = Math.floor(Math.random() * 10) + 1;
  let score = 0;

  const guessOnce = () => {
    lineReader.question(colors.cyan(`Please provide a number between 1 and 10:\n`), async (answer) => {
      const guess = parseInt(answer, 10);

      if (!isValidNumber(guess)) return guessOnce();

      score++;

      if (guess !== secretNumber) {
        const isGreater = guess < secretNumber;

        console.log(colors.red("That's a wrong number!"));
        console.log(colors.yellow(`The number is ${isGreater ? "greater" : "less"} than ${guess}`));
        return guessOnce();
      }

      console.log(colors.green(`Congratz! You've won with ${score} tries!`));
      const msg = `${new Date().toLocaleDateString()}: Congratulations! You've guessed the number with ${score} tries.`;
      await saveResultToFile(msg);

      lineReader.close();
      return;
    });
  };

  guessOnce();
};

guessTheNumber();