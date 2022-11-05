const days = [  "Sunday",  "Monday",  "Tuesday",  "Wednesday",  "Thursday",  "Friday",  "Saturday",];
const months = [  "Jan",  "Feb",  "Mar",  "Apr",  "May",  "Jun",  "Jul",  "Aug",  "Sep",  "Oct",  "Nov",  "Dec",];
const d = new Date();
const day = days[d.getDay().toString()];
const month = months[d.getMonth().toString()];
const date = d.getDate().toString();
const fullDate = day + " , " + date + " " + month;
module.exports = fullDate