const mysql = require('mysql');
var nodemailer = require('nodemailer');

// Connection Pool
let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'legitwypozyczalniafilmow@gmail.com',
    pass: 'zaq1@WSX'
  }
});

const bcrypt = require('bcrypt');
const saltRounds = 10;

var session = require('express-session');

var info = "NULL"
var tab
var loggedUsername = "0" // ---> to trzeba zmienić bo śmierdzi chujem

exports.index = (req, res) => {
  connection.query('SELECT * FROM films', (err, rows) => {
    tab=rows
    if (!err) {
      if(req.session.user)
      {
        res.render('home', { rows, info: req.session.user.nick });
      }else
      {
        res.render('home', { rows, info: "" });
      }
    
    } else {
      console.log(err);
    }
  });
}

exports.login = (req, res) =>
{
  res.render('login');
}

exports.register = (req, res) =>
{
  res.render('register');
}

exports.auths = (req, res) =>
{
    const username = req.body.username;
    const password = req.body.password;
    const firstname = req.body.firstname;
    const surname = req.body.surname;
    const phone = req.body.phone;

    connection.query('SELECT email FROM users WHERE email LIKE ?', [username], (err, rows) => {
      if (!err) {
        if(rows == 0)
        {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        console.log(err);
      }
      transporter.sendMail({from:"legitwypozyczalniafilmow@gmail.com", to: username, subject: "Witamy w naszej wypozyczalni", text: "Łozap"}, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      connection.query(
        "INSERT INTO users (`id`, `email`, `password`, `elements`, `firstname`, `surname`, `phone`) VALUES (NULL, ?, ?, 0, ?, ?, ?);",
        [username, hash, firstname, surname, phone],
        (err, result) => {
          console.log(err);
        }
      );
    });
    res.redirect('/')
  }
  else
  {
    res.send({ message: "Istnieje taki" });
  }
} else {
  console.log(err);
}
});
}

exports.log = (req, res) =>
{
  const username = req.body.username;
  const password = req.body.password;
  req.body.username = loggedUsername;
  
  connection.query(
    "SELECT * FROM users WHERE email = ?;",
    username,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
      bcrypt.compare(password, result[0].password, (error, response) => {
        req.session.user = {nick: username, cart: []}
        loggedUsername = username
          if (response && username=="admin@admin") {
            res.render('admin', {giveName: 'admin@admin'})
            }else if(response && username!="admin")
            {
             // session=req.session;
             // session.userid=username;
              if(req.session.user){
                res.render('home', { rows: tab, info: req.session.user.nick, items: req.session.user.cart, message: "zalogowany" })
            }
          } else {
            res.send({ message: "Wrong username/password combination!" });
          }
        });
      } else {
        res.send({ message: "User doesn't exist" });
      }
    }
  );
}

exports.logout = (req, res) =>
{
  req.session.destroy((err) => {
    res.redirect('/')
  })
}

