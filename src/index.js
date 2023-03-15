//library import
const express = require("express");
const logger = require("morgan");
const routes = require("./routes");
require("dotenv").config("../.env");
const cors = require("cors");
const path = require("path");
require("./database");
const credentials = require("./middleware/credentials");
const corsOptions = require("./config/corsOptions");
const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 9999;

//middleware
app.use(logger("dev"));
app.use(credentials);
app.use(cors(corsOptions));
//
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
// app.use(verifyJWT);
app.use("/api/v1", routes);
app.use(express.static(path.join(__dirname, "/uploads")));

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send(err.message);
});
app.listen(PORT, () => console.log(`Server started at PORT : ${PORT}`));
