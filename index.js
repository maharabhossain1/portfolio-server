const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const ObjectId = require("mongodb").ObjectId;

////////////////
app.use(cors());
app.use(express.json());
require("dotenv").config();
/////////////////////
//////////////////////////
const { MongoClient } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mhwso.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    const database = client.db("portfolio");
    //////////////////////
    const projectsCollections = database.collection("projects");

    // Get API
    app.get("/projects", async (req, res) => {
      const cursor = projectsCollections.find({});
      const projects = await cursor.toArray();
      res.send(projects);
    });

    app.get("/projects/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const project = await projectsCollections.findOne(query);
      res.send(project);
    });
    console.log("conneted");
  } finally {
    //   await client.close();
  }
}
run().catch(console.dir);
/////////////////////////////
app.get("/", (req, res) => {
  res.send("runnign my code2");
});

app.listen(port, () => {
  console.log("runnig", port);
});
