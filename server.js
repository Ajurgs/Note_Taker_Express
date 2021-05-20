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
  res.sendFile(path.join(__dirname + "/db", "db.json"));
});

app.post("/api/notes", (req, res) => {
  const dbJson = require("./db/db.json");
  const note = req.body;
  note.id = dbJson.length > 0 ? dbJson[dbJson.length - 1].id + 1 : 1;
  dbJson.push(note);
  console.log(dbJson);
  fs.writeFile("./db/db.json", JSON.stringify(dbJson), function (err) {
    if (err) throw err;
    console.log("saved notes!");
    res.json(note);
  });
});

app.delete("/api/notes/:id", (req, res) => {
  const dbJson = require("./db/db.json");
  const toDeleteId = req.params.id;
  const newJson = dbJson.filter((note) => note.id != toDeleteId);
  fs.writeFile("./db/db.json", JSON.stringify(newJson), function (err) {
    if (err) throw err;
    console.log("removed the note!");
    res.status(200).redirect("/note");
  });
});
app.get("*", (req, res) => {
  const url = req.url === "/" ? "index.html" : req.url;
  res.sendFile(path.join(__dirname + "/public", url));
});
app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
});
