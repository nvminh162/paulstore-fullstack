/// <reference path="./types/index.d.ts" />
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
    //mật mã có thể tuỳ chỉnh theo ý mình, hãy đặt nó khó lên
    secret: "a santa at nasa",
    // forces session save even if unchanged => nếu session khôg thay đổi thì ko cần lưu vào database
    resave: false,
    // save unmodified sessions => nếu chưa đăng nhập chưa có data thì cũng không lưu vào database
    saveUninitialized: true,
    store: new PrismaSessionStore(new PrismaClient(), {
      //clear expired sessions every day => 1 day
      checkPeriod: 2 * 60 * 1000, //ms
      // session ID cùng 1 chuỗi số => có thể để khác
      dbRecordIdIsSessionId: true,
      // custom tạo ra record ID
      dbRecordIdFunction: undefined,
    }),
  })
);

//config passport
app.use(passport.initialize());
app.use(passport.authenticate("session"));
configPassportLocal();

//config global (Get From Session)
app.use((req, res, next) => {
  res.locals.user = req.user || null; // Pass user object to all views
  next();
});

//config routes
webRoutes(app);

//handle 404
app.use((req, res) => {
  res.render("status/404");
});

initDatabase();

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
