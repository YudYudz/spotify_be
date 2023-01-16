const connection = require("../database/db");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

function signUpAccount(req, res) {

  const salt = bcrypt.genSaltSync(10);
  // console.log(salt)
  console.log(req.body)
  const hash = bcrypt.hashSync(req.body.password, salt);

  connection.connection.query(`INSERT INTO users(nama,username,password) VALUES ('${req.body.name}','${req.body.username}','${hash}')`,
  function (err, result) {
    if(err) {
      return res.status(400).send({
        status: 400,
        message: "Username or Password Invalid",
      });
    } else {
      return res.status(201).send({
        status: 201,
        data: result,
        message: "Succesfully Created Account"
      });
    }
  }); 
}

function signIn(req, res) {
  const {username,password} = req.body


  connection.connection.query(`SELECT * FROM users WHERE username = '${username}'`,
  function(err, result) {
    if(err) {
      return res.status(400).send({
        status: 400,
        message: "Something Went Wrong",
      });
    } else {
      let resPassword = bcrypt.compareSync(password, result[0].password);
      if(resPassword) {
        let token = jwt.sign({
          data: {
            id: req.body.id,
            username: req.body.username
          },
        },
        'secret',
        { expiresIn: '1h' });
        return res.status(200).send({
          data: {
            id: result[0].id,
            username: result[0].username,
            nama: result[0].nama,
          },
          token: token,
          message: "Succesfully Login",
        });
      }
    }
  });
}

module.exports = {
  signUpAccount,
  signIn,
}