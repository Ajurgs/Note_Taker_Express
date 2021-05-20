const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname + "/public", "notes.html"));
});

app.get("/api/notes", (req, res) => {
  res.json(path.join(__dirname + "/db", "db.json"));
});

app.post("/api/notes", (res, req) => {
  console.log(req.body);
});
app.get("*", (req, res) => {
  const url = req.url === "/" ? "index.html" : req.url;
  res.sendFile(path.join(__dirname + "/public", url));
});
app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
});
