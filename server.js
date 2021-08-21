const express = require("express");
const cors = require("cors");
const MongoClient = require("mongodb").MongoClient;
const methodOverride = require("method-override");

const app = express();

app.use(methodOverride("_method"));
app.use(cors());
// Sets ejs instead of normal HTML
app.set("view engine", "ejs");
// Instead of having to sling code to reach all files, just take the public folder and use it.
app.use(express.static("public"));
// BodyParser stuff that is built in to express.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// My port -- could be anything.
const PORT = 5000;

// Connects to MongoDB
let db;
let dbConnectStr =
  "mongodb+srv://dylan:dylanreed1@cluster0.xpmb5.mongodb.net/pokemon?retryWrites=true&w=majority";
let dbName = "pokemon";

MongoClient.connect(dbConnectStr, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}).then((client) => {
  console.log(`connected to ${dbName} Database`);
  db = client.db(dbName);
});

// Root route.
app.get("/", (req, res) => {
  db.collection("pokemon")
    .find()
    .toArray()
    .then((data) => {
      res.render("index.ejs", { data: data });
    })
    .catch((err) => console.log(err));
});

app.post("/addPokemon", (req, res) => {
  db.collection("pokemon")
    .insertOne({ name: req.body.name, type: req.body.type })
    .then((result) => {
      console.log("pokedex updated!");
      res.redirect("/");
    })
    .catch((err) => console.log(err));
});

app.delete("/deletePokemon", (request, response) => {
  console.log(request.body.name, request.body.type);
  db.collection("pokemon")
    .deleteOne({ name: request.body.name, type: request.body.type })
    .then((result) => {
      console.log("Pokemon Deleted");
      response.json("Pokemon Deleted");
    })
    .catch((error) => console.error(error));
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
