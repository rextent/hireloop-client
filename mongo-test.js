const dns = require("dns");

dns.setServers([
  "8.8.8.8",
  "8.8.4.4",
]);

const { MongoClient } = require("mongodb");


const uri =
"mongodb+srv://hireloop:QlhQYCJTS7G7NsQo@cluster0.aqifngh.mongodb.net/?appName=Cluster0";

(async () => {
  try {
    const client = new MongoClient(uri);

    await client.connect();

    console.log("CONNECTED");

    await client.close();
  } catch (err) {
    console.error(err);
  }
})();