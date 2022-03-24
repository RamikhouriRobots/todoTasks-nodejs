const Task = require("../models/Task");

async function addTask(request, response) {
  if (request.body.content) {
    const task = new Task({
      content: request.body.content,
    });
    try {
      await task.save();
      response.redirect("/");
    } catch (error) {
      console.log(error);
      response.redirect("/");
    }
  } else console.warn("No data ready to send");
}

getTasks = function(request, response) {
  Task.find({}, (error, tasks) => {
    console.log(tasks)
    return error ?  response.send(500, error) : response.render("tasks.ejs", { todoTasks: tasks });
  });
}

function getTaskById(request, response) {
  const taskId = request.params.id;
  Task.find({}, (error, tasks) => {
    return error ? response.send(500, error) : response.render("editTask.ejs", { todoTasks: tasks, idTask: taskId });
  });
}

function updateTask(request, response) {
  const taskId = request.params.id;
  Task.findByIdAndUpdate(
    taskId,
    { content: request.body.content },
    (error) => {
      return error ? response.send(500, error) : response.redirect("/");
    }
  );
}

function removeTask(request, response) {
  const taskId = request.params.id;
  Task.findByIdAndRemove(taskId, (error) => {
    return error ? response.send(500, error) : response.redirect("/");
  });
}

module.exports = function (app) {
  // Add new task
  app.post("/",  addTask);

  // Get all tasks from MongoDB
  app.get("/", getTasks);

  // Edit task
  app
    .route("/edit/:id")
    .get(getTaskById)
    .post(updateTask);

  // delete task
  app.route("/remove/:id").get(removeTask);


};

