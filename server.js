const express = require("express");
const app = express();
require('dotenv').config();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const mongodb = require("mongodb");
let MongoClient = mongodb.MongoClient;
MongoClient.connect(
    process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    if (err !== undefined) {
      console.log(err);
      console.log(null);
    } else {
        console.log('hola')
      app.locals.db = client.db("proyect-asteroids-cities");
    }
  }
);

app.get("/", (req, res) => {
  res.send("<h1>hola mundo</h1>");
});

let usuarios = require("./usuarios");
app.use("/usuarios", usuarios);

let favoritos = require("./favoritos");
app.use('/favoritos', favoritos);

app.listen(process.env.PORT || 3000);
