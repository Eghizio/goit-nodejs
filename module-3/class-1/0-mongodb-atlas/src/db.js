import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const { MONGODB_URI } = process.env;

const client = new MongoClient(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1
});

console.log("Connecting to the database...");

client.connect(async error => {
  if (error) return console.log("There was an error", error);

  console.log("Connected to the database...");

  const collections = await client.db("test").collections();
  console.log(collections.map(c => c.collectionName));

  const customers = client.db("test").collection("customers");
  const customersCount = await customers.countDocuments();
  console.log({ customersCount });


  client.close();
});
