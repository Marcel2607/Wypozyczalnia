var session = require('express-session');
const mysql = require('mysql');

let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});


exports.add = (req, res) => {
  if(req.session.user)
  {
    console.log(req.session.user.nick + ": " + req.session.user.cart)
   if(req.session.user.cart.length < 3)
   req.session.user.cart.push(req.params.id)
  console.log(req.session.user.cart)
    res.redirect("/")
  }
}