import * as Logger from "./1-logger-module.js";
// import Logger, { warn } from "./1-logger-module.js";

const { warn } = Logger;

console.log(Logger);

Logger.info("Dupa");
Logger.log("Hi");

warn("Danger!!!");
