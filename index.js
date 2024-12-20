const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

//application
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(express.json());
app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fovwt3b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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
    //data collection
    const clystDataCollection = client.db("clyst").collection("clystDb");

    //post data to db
    app.post("/api/data", async (req, res) => {
      const data = req.body;

      try {
        const result = await clystDataCollection.insertOne(data);
        res.status(200).json({
          success: true,
          message: "Data created db successfully",
          data: result,
        });
      } catch (err) {
        res.status(500).json({
          success: false,
          message: "Failed to create dat into db",
          error: err,
        });
      }
      //get data form db

      app.get("/api/data", async (req, res) => {
        try {
          const { searchTerm } = req.query; // Extract searchTerm from query parameters

          // Build the query dynamically based on searchTerm
          let query = {};

          if (searchTerm) {
            // If searchTerm exists, search across the relevant fields
            query = {
              $or: [
                { name: { $regex: searchTerm, $options: "i" } }, // 'i' for case-insensitive search
                { date: { $regex: searchTerm, $options: "i" } },
                { time: { $regex: searchTerm, $options: "i" } },
                { userName: { $regex: searchTerm, $options: "i" } },
                { email: { $regex: searchTerm, $options: "i" } },
                { text: { $regex: searchTerm, $options: "i" } },
              ],
            };
          }
          // Perform the search in the database using the query
          const result = await client
            .db("clyst")
            .collection("clystDb")
            .find(query) // Use query if searchTerm exists, or find all if not
            .toArray();

          console.log("Search result:", result. searchTerm);

          if (result.length === 0) {
            return res.status(404).json({
              success: false,
              message: "No data found matching the search term",
            });
          }

          res.status(200).json({
            success: true,
            message: "Data retrieved successfully",
            data: result,
          });
        } catch (err) {
          console.error(err);
          res.status(500).json({
            success: false,
            message: "Failed to get data from DB",
            error: err.message || "Something went wrong",
          });
        }
      });
      console.log(data);
    });

    //get a specific data
    app.get("/api/data/:dataId", async (req, res) => {
      try {
        const { dataId } = req.params;

        // Convert dataId to ObjectId if it's not a string (assuming it's stored as ObjectId in MongoDB)
        const result = await clystDataCollection.findOne(
          { _id: new ObjectId(dataId) } // Use ObjectId for querying MongoDB's _id field
        );

        console.log("Result:", result); // For debugging

        if (!result) {
          return res.status(404).json({
            success: false,
            message: "Data not found",
          });
        }

        res.status(200).json({
          success: true,
          message: "Data retrieved successfully",
          data: result,
        });
      } catch (error) {
        console.error(error); // Log the error
        res.status(500).json({
          success: false,
          message: "Failed to get data from DB",
          error: error.message || "Something went wrong",
        });
      }
    });

    //get

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

//home
app.get("/", (req, res) => {
  res.send("App is running!");
});

app.listen(port, () => {
  console.log(`Hello world app is running on port: ${port} `);
});
