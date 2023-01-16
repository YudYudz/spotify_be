const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  console.log(token);
  if (token == null) {
    return res.status(401).json({
      message: 'Token Not Found',
    });
  }
  jwt.verify(token, 'secret', (err, result) => {
    if (err) {
      return res.status(401).json({
        message: 'Login Expired',
      });
    }
  });

  next();
}

module.exports = { 
  authenticateToken
};