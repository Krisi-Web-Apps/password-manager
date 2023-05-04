require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const { errorHandler } = require("./config/middlewares");

const PORT = process.env.PORT || 4000;

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// routers
app.use("/", require("./routers"));
app.use("/users", require("./users/routers"));

app.use(errorHandler);

app.listen(PORT, () => {
    console.log("Server started on port: " + PORT);
});
