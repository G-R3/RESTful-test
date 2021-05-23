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
  let foundComment = data.find((comment) => comment.id === parseInt(id));

  /**
   * since newly created comments will get an ID from UUID(), they will return undefined
   * if we try to parse the ID. This is just a temp solution to get the comment we want.
   */
  if (!foundComment) {
    foundComment = data.find((comment) => comment.id === id);
  }

  res.render("comments/show", { foundComment });
});

app.listen(PORT, (req, res) => {
  console.log(`Listening on ${PORT}`);
});
