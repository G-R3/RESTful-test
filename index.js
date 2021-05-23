const express = require("express");
const app = express();
const path = require("path");
// creates random unique IDs for our comments
const { v4: uuid } = require("uuid");
// allows us to use HTTP verbs such as PUT, PATCH and DELETE in our html forms
const methodOverride = require("method-override");
const PORT = 3000;
// fake JSON data from https://jsonplaceholder.typicode.com/
let data = require("./data.json");

app.use(express.urlencoded({ extended: true })); // parse form data
app.use(methodOverride("_method")); // ovverride using a query string value

// set view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

/** View all Comments */
app.get("/comments", (req, res) => {
  res.render("comments/index", { data });
});

/** Creatte a Comment */
app.get("/comments/create", (req, res) => {
  res.render("comments/create");
});

app.post("/comments/create", (req, res) => {
  const { name, comment } = req.body;
  data.push({ id: uuid(), name, body: comment });
  res.redirect("/comments");
});

/** View a Comment */
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

/**Update a Comment */
app.get("/comments/:id/edit", (req, res) => {
  const { id } = req.params;
  let foundComment = data.find((comment) => comment.id === parseInt(id));

  /**
   * since newly created comments will get an ID from UUID(), they will return undefined
   * if we try to parse the ID. This is just a temp solution to get the comment we want.
   */
  if (!foundComment) {
    foundComment = data.find((comment) => comment.id === id);
  }

  res.render("comments/edit", { foundComment });
});

app.patch("/comments/:id/edit", (req, res) => {
  const { name, email, comment } = req.body;
  const { id } = req.params;
  let foundComment = data.find((comment) => comment.id === parseInt(id));

  /**
   * since newly created comments will get an ID from UUID(), they will return undefined
   * if we try to parse the ID. This is just a temp solution to get the comment we want.
   */
  if (!foundComment) {
    foundComment = data.find((comment) => comment.id === id);
  }

  foundComment.name = name;
  foundComment.email = email;
  foundComment.body = comment;

  res.redirect("/comments");
});

/** Delete Comment */
app.delete("/comments/:id", (req, res) => {
  const { id } = req.params;
  let foundComment = data.find((comment) => comment.id === parseInt(id));

  /**
   * since newly created comments will get an ID from UUID(), they will return undefined
   * if we try to parse the ID. This is just a temp solution to get the comment we want.
   */
  if (!foundComment) {
    foundComment = data.find((comment) => comment.id === id);
  }

  data = data.filter((comment) => comment.id !== foundComment.id);

  res.redirect("/comments");
});

app.listen(PORT, (req, res) => {
  console.log(`Listening on ${PORT}`);
});
