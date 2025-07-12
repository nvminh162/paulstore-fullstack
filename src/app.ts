// const express = require("express");
import express from "express";
import "dotenv/config";
import webRoutes from "routes/web";
import initDatabase from "config/seed";
import passport from "passport";
import configPassportLocal from "src/middleware/passport.local";
import session from "express-session";

const PORT = process.env.PORT || 8080;
const app = express();

//config view engine
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

//config req.body => submit data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//config static file
app.use(express.static("public"));

//config session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
}));

//config passport
app.use(passport.initialize());
app.use(passport.authenticate('session'));
configPassportLocal();

//config routes
webRoutes(app);

//handle 404
app.use((req, res) => {
  res.send("404");
});

initDatabase();

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
