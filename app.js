const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const mainRouter = require("./routes/mainRouter");
const resultRatioRouter = require("./routes/resultRatioRouter");
const gameScreenRouter = require("./routes/gameScreenRouter");
const problemGenerateRouter = require("./routes/problemGenerateRouter");
const resultImgRouter = require("./routes/resultImgRouter");

BigInt.prototype.toJSON = function () {
  return Number(this);
};

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/**
 * router 등록
 */
app.use("/main", mainRouter);
app.use("/", resultRatioRouter);
app.use("/game", gameScreenRouter);
app.use("/problems", problemGenerateRouter);
app.use("/", resultImgRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
});

module.exports = app;
