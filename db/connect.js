const mongoose = require("mongoose")
const connect="mongodb+srv://shane6123:shane6123@cluster0.jx2dhyr.mongodb.net/Bizlog"
mongoose.connect(connect, (err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log("db connected....");
  }
});