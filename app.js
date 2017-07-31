const express = require("express");
const mustacheExpress = require("mustache-express");
const bodyParser = require("body-parser");
const expressSession = require("express-session");

const app = express();

// teach express that we are using url encosded parsing forms
app.use(bodyParser.urlencoded({ extended: false }));
//
app.engine("mustache", mustacheExpress());
app.set("views", "./templates");
app.set("view engine", "mustache");

app.use(
  expressSession({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true
  })
);
// const todoList = [];
// const completedList = [];
// ****************GET**********

app.get("/", (request, response) => {
  const todoSession = request.session.todoSession || [];
  const completedSession = request.session.completedSession || [];
  ////////////////////////////////////for browser       where data comes from
  response.render("homepage", { todoListForTheBrowser: todoSession, completedListForBrowser: completedSession });
});
// ************POST************

app.post("/", (request, response) => {
  const todoSession = request.session.todoSession || [];
  const completedSession = request.session.completedSession || [];

  // get the description of the new to do item
  const descriptionForNewTodo = request.body.description;
  // add it to teh list of todoList
  todoSession.push(descriptionForNewTodo);
  // console.log(todoList);

  request.session.todoSession = todoSession;

  //show the user the new list of the todos
  response.redirect("/");
});

app.post("/remove", (request, response) => {
  const todoSession = request.session.todoSession || [];
  const completedSession = request.session.completedSession || [];

  const todoList = request.body.markCompleted;
  completedSession.push(todoList);
  // gets the index of item being removed
  const removeItem = todoSession.indexOf(todoList);

  console.log(removeItem);

  // removes that item by index and only that one item
  todoSession.splice(removeItem, 1);

  request.session.completedSession = completedSession;

  response.redirect("/");
});

app.listen(3000, () => {
  console.log("wow im listening");
});
