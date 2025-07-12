// const express = require("express");
import express from "express";
import "dotenv/config";
import webRoutes from "routes/web";
import initDatabase from "config/seed";
import passport from "passport";
import configPassportLocal from "src/middleware/passport.local";
import session from "express-session";
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const { PrismaClient } = require("@prisma/client");

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
app.use(
  session({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // ms => 7 days
    },
    secret: "a santa at nasa",
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(new PrismaClient(), {
      checkPeriod: 2 * 60 * 1000, //ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);

//config passport
app.use(passport.initialize());
app.use(passport.authenticate("session"));
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
