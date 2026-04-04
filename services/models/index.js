//const User = require('./User'); // Path to your User model file
//const ActivityLog = require('./ActivityLog');
//const Post = require('./Post');
//const User_Billing = require('./User_Billing');

// Associations
//User.hasMany(ActivityLog, { foreignKey: 'user_id' });
//ActivityLog.belongsTo(User, { foreignKey: 'user_id' });

//User.belongsToMany(Post, { through: 'user_saved_posts', as: 'SavedPosts' });
//User.hasMany(User_Billing, { foreignKey: 'user_id', as: 'DonationHistory' });

//module.exports = { User, ActivityLog, Post, User_Billing };
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: 5432,
  ssl: { rejectUnauthorized: false },
  // ADD THIS LINE: This tells Node to always use your new schema
  options: "-c search_path=app_data,public" 
});
//module.exports = { pool };