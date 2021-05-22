const express = require("express");
const app = express();
const path = require("path");
const data = require("./data.json");
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/comments", (req, res) => {
  res.render("comments/index", { data });
});

app.listen(PORT, (req, res) => {
  console.log(`Listening on ${PORT}`);
});
