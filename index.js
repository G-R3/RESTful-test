const express = require("express");
const app = express();
const path = require("path");
const { v4: uuid } = require("uuid");
const data = require("./data.json");
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// view comments
app.get("/comments", (req, res) => {
  res.render("comments/index", { data });
});

// create comment
app.get("/comments/create", (req, res) => {
  res.render("comments/create");
});

app.post("/comments/create", (req, res) => {
  const { name, comment } = req.body;
  data.push({ id: uuid(), name, body: comment });
  res.redirect("/comments");
});

// view single comment
app.get("/comments/:id", (req, res) => {
  const { id } = req.params;
  const foundComment = data.find((comment) => comment.id === parseInt(id));

  res.render("comments/show", { foundComment });
});

app.listen(PORT, (req, res) => {
  console.log(`Listening on ${PORT}`);
});
