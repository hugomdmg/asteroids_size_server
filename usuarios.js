const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

router.post("/registro", (req, res) => {
  let db = req.app.locals.db;
  let email = req.body.email;
  let password = req.body.password;
  db.collection("usuarios")
    .find({ email: email })
    .toArray((err, data) => {
      if (err !== undefined) {
        res.send({ estado: "error: " + err });
      } else {
        if (data.length > 0) {
          res.send({ estado: "user already exist" });
        } else {
          db.collection("usuarios").insertOne({
            email: email,
            password: password,
            fav: [],
          });
          res.send({ estado: "registered" });
        }
      }
    });
});

router.post("/", (req, res) => {
  let db = req.app.locals.db;
  let email = req.body.email;
  let password = req.body.password;

  db.collection("usuarios")
    .find({ email: email })
    .toArray((err, data) => {
      if (err !== undefined) {
        res.send({ estado: "error: " + err });
        console.log("error");
      } else {
        if (data.length == 0) {
          res.send({ estado: "unregistered user" });
        } else if (password == data[0].password) {
          res.send({ estado: true, data: data });
        } else {
          res.send({ estado: "uncorrect password" });
        }
      }
    });
});

module.exports = router;
