import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { MongoClient } from "mongodb";
import dns from "dns";

// DNS রিজল্যুশন ফিক্সড করা (আপনার রিকোয়েস্ট অনুযায়ী)
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const uri = process.env.MONGO_DB_URI;
const dbName = process.env.AUTH_DB_NAME;

if (!uri || !dbName) {
  throw new Error("Missing MONGO_DB_URI or AUTH_DB_NAME in .env");
}

const globalWithMongo = global;

// সিঙ্গেলটন কানেকশন - হট রিলোড হ্যান্ডেল করার জন্য
if (!globalWithMongo._mongoClient) {
  globalWithMongo._mongoClient = new MongoClient(uri, {
    family: 4, // শুধুমাত্র IPv4 ব্যবহার করবে
    serverSelectionTimeoutMS: 15000,
    connectTimeoutMS: 15000,
    socketTimeoutMS: 60000,
  });
}

const client = globalWithMongo._mongoClient;

// ডাটাবেস কানেকশন হ্যান্ডলার
async function getDb() {
  try {
    await client.connect();
    return client.db(dbName);
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    throw error;
  }
}

// Better Auth ইনিশিয়ালাইজেশন
const db = await getDb();

export const auth = betterAuth({
  database: mongodbAdapter(db),
  emailAndPassword: { enabled: true },
  user: {
    additionalFields: {
      role: { type: "string", required: false, defaultValue: "seeker" },
      plan: { type: "string", defaultValue: "seeker_free" },
    },
  },
});