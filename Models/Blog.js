const mongoose = require("mongoose");
const blogSchema = new mongoose.Schema({
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    date: {
      type: String,
    },
  });
const Blogs = new mongoose.model("blogs", blogSchema);
module.exports = Blogs;