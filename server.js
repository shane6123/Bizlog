require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("passport-local");
const mongoose = require("mongoose")
const GoogleStrategy = require("passport-google-oauth20").Strategy;
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "template/views"));
// db
app.use(
  session({
    secret: "this is little bit secret.",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
require("./db/connect")
const Users = require("./Models/Users")

passport.use(Users.createStrategy());

passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    cb(null, { id: user.id, username: user.username, name: user.name });
  });
});
passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/bizlog",
    },
    function (accessToken, refreshToken, profile, cb) {
      // console.log(profile);
      Users.findOrCreate({ googleId: profile.id }, function (err, user) {
        return cb(err, user);
      });
    }
  )
);
// date

const Auth = require("./Routes/auth")
app.use("/",Auth)
app.listen(process.env.PORT, () => {
  console.log(`server is connect on ${process.env.PORT}`);
});
