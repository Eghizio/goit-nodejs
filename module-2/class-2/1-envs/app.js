import dotenv from "dotenv";

const log = (...text) => console.log("\x1b[36m%s\x1b[0m", ...text);

log("API KEY: ", process.env.SECRET_API_KEY);
log("NODE ENV: ", process.env.NODE_ENV);
// https://expressjs.com/th/advanced/best-practice-performance.html#set-node_env-to-production

dotenv.config();

process.stdout.write("\n");

const { SECRET_API_KEY, NODE_ENV } = process.env;

log("API KEY: ", SECRET_API_KEY);
log("NODE ENV: ", NODE_ENV);
