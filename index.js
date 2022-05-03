const express = require("express");

const cors = require("cors");

const swaggerUi = require("swagger-ui-express"),swaggerDocument = require("./swagger.json");



const app = express();

app.use(cors());

app.locals.title = "Tasks Manager";

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(function(request, response, next){
       response.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

       response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
   
       response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

       response.setHeader('Access-Control-Allow-Credentials', true);
   
       next();
})

require("./mongoDB/dataAccess")(app);

require("./controllers/tasksController")(app);

require("./controllers/userController")(app);

require("./controllers/templateController")(app);

require("./controllers/notificationController")(app);

require("./controllers/scheduleController")(app);

app.use("/static", express.static("public"));

app.set("view engine", "ejs");

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(process.env.PORT || 3003, () =>
console.log("server up and running")
);