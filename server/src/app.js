require("dotenv").config();
require('module-alias/register');
const colors = require("colors");
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routers
const { commonRouter, usersRouter, passwordsRouter } = require("./routers");

app.use("/", commonRouter);
app.use("/users", usersRouter);
app.use("/passwords", passwordsRouter);

// custom middlewares
const { errorHandler } = require("./config/middlewares");

app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    if (process.env.NODE_ENV === "development") {
        console.log(`Server started on port: ${colors.green(PORT)} in ${colors.green(process.env.NODE_ENV)}`);
    }
});
