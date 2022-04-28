const { send } = require("express/lib/response");
const Task = require("../models/Task");

async function addTask(request, response) {
  if (request.body.content) {
    const task = new Task({
      content: request.body.content,
      completed: false,
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

addNewTask = async function (request, response) {
  if (request.body.content) {
    const task = new Task({
      content: request.body.content,
      completed: false,
    });
    console.log('Trying to add ', task)
    try {
      await task.save();
      response.status(200).send(task);
    } catch (error) {
      console.log(error);
      response.sendStatus(500);
    }
  } else console.warn("No data ready to send");
}



getTasks = function(request, response) {
  Task.find({}, (error, tasks) => {
    console.log(tasks)
    return error ?  response.send(500, error) : response.render("tasks.ejs", { todoTasks: tasks });
  });
}

getTasksList = function(request, response){

  Task.find({}, (error, tasks) => {
    console.log(tasks)
    if (error) return response.send(500, error)
    else {
        response.setHeader('Content-Type', 'application/json');
        return response.end(JSON.stringify(tasks))
    }
});
}


updateTaskById = function (request, response) {
  const _id = request.params.id;
  const { content, completed} = request.body;
  console.log(content, request.body);
  Task.findByIdAndUpdate(
    _id,
    { content: content , completed: completed},
    (error) => {
      return error ? response.send(500, error) : response.status(200).send('Updated');
    }
  );
}

getTaskById = function(request, response){
  const _id = request.params.id;
  Task.find({ _id }, (error, task) => {
    console.log(task)
    if (error) return response.send(500, error)
    else {
        response.setHeader('Content-Type', 'application/json');
        return response.end(JSON.stringify(task))
    }
});
}

removeTaskById = function(request, response) {
  const _id = request.params.id;
  Task.findByIdAndRemove(_id, (error) => {
    return error ? response.send(500, error) : response.status(200).send('Removed');
  });
}

function getTask(request, response) {
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

  //get tasks array react app
  app.get("/tasks/", getTasksList)
  // Add new task
  app.post("/",  addTask);

  // Add new task react app
  app.post("/task",  addNewTask);  

  // Get all tasks from MongoDB
  app.get("/", getTasks);

  // Edit task
  app
    .route("/edit/:id")
    .get(getTask)
    .post(updateTask);

  // Edit task react app
  app
    .route("/task/edit/:id")
    .post(updateTaskById);    

  // delete task
  app.route("/task/remove/:id").get(removeTaskById);

  // delete task
  app.route("/remove/:id").get(removeTask);


};

