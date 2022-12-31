// console.log(process);
// console.log(process.argv);

const args = process.argv.slice(2);
console.log({ args });


const isDebug = args.includes("--debug");

const Logger = {
  info: (msg) => console.log(`Info: ${msg}`),
  debug: (msg) => isDebug && console.log(`Debug: ${msg}`),
};

const main = () => {
  Logger.info("Starting processing payments...");

  for (let i = 1; i <= 10; i++) {
    Logger.debug(`Processing payment number ${i}`);
    // Some processing
  }

  Logger.info("Finished processing payments :)");
};

main();