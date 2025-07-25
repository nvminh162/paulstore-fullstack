// const express = require("express");
import express from "express";
import "dotenv/config";
import webRoutes from "routes/web";

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

//config routes
webRoutes(app);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
