const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, ActivityLog } = require('../models');

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      name,
      email,
      password_hash: hashedPassword,
      settings: { theme: 'light', lang: 'en' } // Default JSONB
    });

    res.status(201).json({ message: 'User created!', userId: user.id });
  } catch (err) {
    res.status(500).json({ error: 'Email might already exist.' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password_hash))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  // LOG THE LOGIN (Using your Audit Log Table)
  await ActivityLog.create({
    user_id: user.id,
    category: 'security',
    action_type: 'login_success',
    details: { ip: req.ip, agent: req.get('User-Agent') }
  });

  res.status(200).json({ token, userId: user.id, name: user.name });
};