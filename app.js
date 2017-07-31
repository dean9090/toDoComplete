const express = require("express");
const mustacheExpress = require("mustache-express");
const bodyParser = require("body-parser");

const app = express();

// teach express that we are using url encosded parsing forms
app.use(bodyParser.urlencoded({ extended: false }));
//
app.engine("mustache", mustacheExpress());
app.set("views", "./templates");
app.set("view engine", "mustache");

const todoList = ["clean dishes", "walk the dog", "make lunch", "pack umbrella"];
const completedList = ["Sleep", "brush teeth", "eat"];
// ****************GET**********

app.get("/", (request, response) => {
  ////////////////////////////////////for browser       where data comes from
  response.render("homepage", { todoListForTheBrowser: todoList, completedListForBrowser: completedList });
});
// ************POST************

app.post("/", (request, response) => {
  // get the description of the new to do item
  const descriptionForNewTodo = request.body.description;
  // add it to teh list of todoList
  todoList.push(descriptionForNewTodo);
  console.log(todoList);
  //show the user the new list of the todos
  response.redirect("/");
});

app.post("/remove", (request, response) => {
  const completeList = request.body.markCompleted;
  completedList.push(completeList);
  // gets the index of item being removed
  const removeItem = todoList.indexOf(completeList);
  // removes that item by index and only that one item
  todoList.splice(removeItem, 1);

  response.redirect("/");
});

app.listen(3000, () => {
  console.log("wow im listening");
});
