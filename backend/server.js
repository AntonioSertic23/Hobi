const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hobi Backend API");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

require("dotenv").config();

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.MONGO_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Poveži se s MongoDB serverom
    await client.connect();

    console.log("Connected to MongoDB!");

    // Dohvati bazu podataka sample_mflix
    const database = client.db("sample_mflix");

    // Dohvati kolekciju movies iz baze
    const moviesCollection = database.collection("movies");

    // Napravi upit za dohvaćanje svih filmova (ili samo nekih, npr. 5 filmova)
    const movies = await moviesCollection.find({}).limit(5).toArray();

    // Ispiši filmove u konzoli
    console.log("Movies:", movies);
  } catch (error) {
    console.error("MongoDB connection error:", error);
  } finally {
    // Zatvori konekciju nakon što završiš
    await client.close();
  }
}
run().catch(console.dir);
