// Import required modules
const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();
const cors = require("cors");

// Create Express app
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// CORS
app.use(cors());

// MongoDB connection setup
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
});

let seriesCollection;

async function connectToDatabase() {
  try {
    await client.connect();
    const database = client.db("HobiDatabase");
    seriesCollection = database.collection("SeriesCollection");
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

// Connect to the database before starting the server
connectToDatabase().catch(console.dir);

// Routes

/**
 * @route GET /series
 * @description Get all series
 */
app.get("/series", async (req, res) => {
  try {
    const series = await seriesCollection.find({}).toArray();
    res.status(200).json(series);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch series" });
  }
});

/**
 * @route GET /series/:id
 * @description Get a single serie by ID
 */
app.get("/series/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const serie = await seriesCollection.findOne({ _id: new ObjectId(id) });
    // TODO: in order to ignore _id -> collection.find({id: yourId}).project({_id: 0}).toArray();

    if (serie) {
      res.status(200).json(serie);
    } else {
      res.status(404).json({ error: "Serie not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch the serie" });
  }
});

/**
 * @route POST /series
 * @description Create a new series
 */
app.post("/series", async (req, res) => {
  try {
    const newSerie = req.body;
    const result = await seriesCollection.insertOne(newSerie);

    res.status(201).json({ message: "Serie created", serie: result.ops[0] });
  } catch (error) {
    res.status(500).json({ error: "Failed to create the serie" });
  }
});

/**
 * @route PUT /series/:id
 * @description Update an existing serie by ID
 */
app.put("/series/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedSerie = req.body;

    const result = await seriesCollection.updateOne({ _id: new ObjectId(id) }, { $set: updatedSerie });

    if (result.matchedCount === 0) {
      res.status(404).json({ error: "Serie not found" });
    } else {
      res.status(200).json({ message: "Serie updated" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update the serie" });
  }
});

/**
 * @route DELETE /series/:id
 * @description Delete a serie by ID
 */
app.delete("/series/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await seriesCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      res.status(404).json({ error: "Serie not found" });
    } else {
      res.status(200).json({ message: "Serie deleted" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete the serie" });
  }
});

// Default route
app.get("/", (req, res) => {
  res.send("Hobi Backend API");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
