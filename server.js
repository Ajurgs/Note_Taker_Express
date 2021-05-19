const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname + "/public", "notes.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/public", "index.html"));
});

app.get("/api/notes", (req, res) => {});

app.post("/api/notes", (res, req) => {});

app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
});
