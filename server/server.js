require("dotenv").config();
const cors = require("cors");
const express = require("express");
const ConDb = require("./config/Db.config");
const authrouter = require("./router/auth.router")


const app = express();
app.use(express.json());
app.use(cors());




app.use("/api/exam/auth",authrouter)
const PORT = process.env.PORT || 5000;

ConDb().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running");
  });
});