let nav_date = new Date();
nav_year = nav_date.getFullYear();
nav_day = nav_date.getDate();
const nav_month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let nav_name = nav_month[nav_date.getMonth()];
let nav_days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let nav_dayName = nav_days[nav_date.getDay()];
document.getElementById("nav_date").innerHTML =
  nav_dayName +
  ",     " +
  nav_name +
  "     " +
  nav_day +
  "     " +
  nav_year;