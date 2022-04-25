const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");

const connectDatabase = require("./helpers/connect-db");

const userRoutes = require("./routes/user.routes");

dotenv.config();
const app = express();

// middleware
app.use(cors());
//app.use(morgan("dev"));
app.use(express.json());


app.use("/user", userRoutes);

const startServer = async (port = 3000, hostname = "localhost", database = "TestFirst") => {
  await connectDatabase(database); // Change database name

  app.listen(port, hostname, () => {
    console.log(`🚀 Listening at ${hostname}:${port}...`);
  });
};

module.exports = {
  app,
  connectDatabase,
  startServer,
};