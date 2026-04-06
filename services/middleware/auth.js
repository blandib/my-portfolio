
const jwt = require('jsonwebtoken');
// ADD THIS LINE TO THE TOP:
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });



module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authentication failed: No token provided' });
  }

  try {
    //const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const decodedToken = jwt.verify(token, 'my_temporary_secret_key');
    req.user = { id: decodedToken.id };
    next();
  } catch (error) {
    
    return res.status(401).json({ message: 'Authentication failed: Invalid token' });
  }
};