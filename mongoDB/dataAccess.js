const dotenv = require("dotenv");

const mongoose = require("mongoose");

dotenv.config();

const options = {
  autoIndex: false, // Don't build indexes
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  useNewUrlParser: true,
};

const uri = `${process.env.DB_SERVER}://${process.env.DB_USER}:${encodeURIComponent(process.env.DB_USER_PASSWORD)}@${process.env.DB_CLASTER}.1iwmy.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

module.exports = function (app) {
  mongoose.connect(uri, options, () => {
    console.log("connect to db!");
    app.listen(process.env.PORT || 3000, () =>
      console.log("server up and running")
    );
  });
};

// const client = new MongoClient(uri, { useNewUrlParser: true});
// client.connect(()=>{
//     const database = client.db('TodoApp')
//         console.log("Connected to db!");
//     app.listen(3000, ()=> console.log("Server is UP and running"));
// },err => {
//   const collection = client.db("todoApp").collection("todoCollection");
//   // perform actions on the collection object
//   client.close();
// });

// const mongoose = require("mongoose");

// mongoose.set("useFindAndModify", false);
