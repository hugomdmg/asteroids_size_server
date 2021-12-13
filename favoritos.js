const express = require("express");
const router = express.Router();

router.post("/guardar", (req, res) => {
  let email = req.body.email;
  let db = req.app.locals.db;
  db.collection("usuarios").updateOne(
    { email: email },
    { $push: { fav: { $each: [req.body.fecha] } } }
  );
});

module.exports = router;
