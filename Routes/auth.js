const express = require("express");
const router = express.Router()
const passport = require("passport");
const passportLocal = require("passport-local");
const Blogs = require("../Models/Blog")
const Users = require("../Models/Users")
const  fullDate = require("../Helper/date")
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);
router.get(
  "/auth/google/bizlog",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    res.redirect("/bizlog");
  }
);
router.get("/", async (req, res) => {
  res.render("index")
});
router.get("/compose", (req, res) => {
  res.render("compose");
});
router.get("/register", (req, res) => {
  res.render("register");
});
router.get("/login", (req, res) => {
  res.render("login");
});
router.get("/bizlog", (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect("/data");
  } else {
    res.redirect("/login");
  }
});
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (!err) {
      res.redirect("/login");
    }
  });
});
router.get("/data",async (req,res)=>{
  const data= await Blogs.find({})
  res.render("data",{contents:data})
})
router.post("/register", (req, res) => {
  Users.register( { username: req.body.username },  req.body.password,(err, user) => {
      if (err) {
        res.redirect("/register");
      } else {
        passport.authenticate("local")(req, res, () => {
          res.redirect("/bizlog");
        });
      }
    }
  );
});
router.post("/login", (req, res) => {
    const user = new Users({
      username: req.body.username,
      password: req.body.password,
    });
    // console.log(req.body);
    req.login(user, (err) => {
      if (err) {
        console.log(err);
      } else {
        passport.authenticate("local")(req, res, () => {
          res.redirect("/bizlog");
        });
      }
    });
  });

router.post("/compose", (req, res) => {
//   console.log(req.body);
    const blog = new Blogs({
      title: req.body.title,
      description: req.body.description,
      date: fullDate,
    });
    blog.save();
  res.redirect("/data");
});
router.post("/delete", async (req, res) => {
//   console.log(req.body);
  const data = await Blogs.findOne({ title: req.body.del });
  console.log(data._id);
  const _id = data._id;
  try {
    await Blogs.deleteOne({ _id });
    res.redirect("/data");
  } catch (err) {
    console.log(err);
  }
});
router.post("/update", async (req, res) => {
//   console.log(req.body);
  const data = await Blogs.findOne({ title: req.body.edit });
  console.log(data._id);
  const _id = data._id;
  try {
    await Blogs.deleteOne({ _id });
    res.redirect("/compose");
  } catch (err) {
    console.log(err);
  }
});
router.get("*", (req, res) => {
    res.render("404");
  });
module.exports =router