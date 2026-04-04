/**const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>
  console.log("Token Received:", token); // <--- ADD THIS LOG

  if (!token) {
    return res.status(401).json({ message: 'Authentication failed: No token provided' });
  }

  try {
    // Update this line in your middleware:
const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
req.user = { id: decodedToken.id }; // Changed 'userData' to 'user' and 'userId' to 'id'
next();
  } catch (error) {
    return res.status(401).json({ message: 'Authentication failed: Invalid token' });
  }
};
console.log("DEBUG: JWT Secret is:", process.env.JWT_SECRET);**/
const jwt = require('jsonwebtoken');
// ADD THIS LINE TO THE TOP:
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

console.log("DEBUG: JWT Secret in middleware is:", process.env.JWT_SECRET);

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
    console.error("JWT Verify Error:", error.message); // Log the specific error
    return res.status(401).json({ message: 'Authentication failed: Invalid token' });
  }
};