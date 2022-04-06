const express = require("express");

const app = express();

app.locals.title = "Tasks Manager";

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

require("./mongoDB/dataAccess")(app);

require("./controllers/tasksController")(app);

require("./controllers/userController")(app);

app.use("/static", express.static("public"));

app.set("view engine", "ejs");