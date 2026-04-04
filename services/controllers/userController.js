const { User, Post, Donation, ActivityLog } = require('../models');
// DO THIS:
const { User, Post, User_Billing, ActivityLog } = require('../models');



exports.getDashboard = async (req, res) => {
  try {
    // Middleware defines req.user.id, so we use that!
    const userId = req.user?.id;
    
    if (!userId) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const userData = await User.findByPk(userId, {
      attributes: ['name', 'email', 'profile_image', 'created_at'],
      include: [
        { model: Post, as: 'SavedPosts' },
        { model: Donation, as: 'DonationHistory' },
        { model: ActivityLog, limit: 5, order: [['created_at', 'DESC']] } 
      ]
    });

    if (!userData) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(userData);
  } catch (err) {
    console.error("Dashboard Controller Error:", err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};