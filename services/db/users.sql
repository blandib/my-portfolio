--- 0. CLEANUP (Optional)
--- Uncomment the line below if you want to wipe the database and start fresh:
-- DROP TABLE IF EXISTS users, user_sessions, user_password_resets, user_email_verifications, user_password_history, user_login_attempts, user_login_history, user_roles, user_permissions, user_preferences, user_settings, user_language_preferences, user_timezones, user_theme_preferences, user_notification_preferences, user_privacy_settings, user_friends, user_messages, user_groups, user_group_members, user_notifications, user_activities, user_activity_logs, user_api_keys, user_api_tokens, user_api_usage, user_oauth_providers, user_subscriptions, user_billing_info, user_invoices, user_payments, user_referrals, user_achievements, user_badges, user_leaderboard, user_feedback, user_support_tickets, user_account_status, user_account_deletion_requests, user_account_recovery_requests, user_account_suspensions, user_account_reinstatements, user_account_merges, user_account_splits, user_account_closures, user_account_deactivations, user_account_reactivations, user_data_exports, user_data_imports, user_device_tokens, user_geolocation, user_events CASCADE;

--- 1. CORE IDENTITY
--CREATE TABLE IF NOT EXISTS users (
 --- id SERIAL PRIMARY KEY,
  ---name VARCHAR(100) NOT NULL,
  --email VARCHAR(150) UNIQUE NOT NULL,
  ---password_hash VARCHAR(255) NOT NULL,
  ---profile_image TEXT,
  ---created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
---);

--- 2. AUTHENTICATION & SECURITY
---CREATE TABLE IF NOT EXISTS user_sessions (
  ---id SERIAL PRIMARY KEY,
  ---user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
 --- session_token VARCHAR(255) UNIQUE NOT NULL,
 --- expires_at TIMESTAMP NOT NULL,
 -- created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
---);

---CREATE TABLE IF NOT EXISTS user_password_resets (
  ---id SERIAL PRIMARY KEY,
  ---user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  ---reset_token VARCHAR(255) UNIQUE NOT NULL,
  ---expires_at TIMESTAMP NOT NULL,
  ---created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
---);

---CREATE TABLE IF NOT EXISTS user_email_verifications (
  ---id SERIAL PRIMARY KEY,
  ---user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  ---verification_token VARCHAR(255) UNIQUE NOT NULL,
  ---expires_at TIMESTAMP NOT NULL,
  ---created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
---);

----CREATE TABLE IF NOT EXISTS user_password_history (
  ---id SERIAL PRIMARY KEY,
  ---user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  ---password_hash VARCHAR(255) NOT NULL,
  ---changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
---);

---CREATE TABLE IF NOT EXISTS user_login_attempts (
  ---id SERIAL PRIMARY KEY,
  ---user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  ---attempt_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  ---is_successful BOOLEAN NOT NULL
---);

---CREATE TABLE IF NOT EXISTS user_login_history (
  ---id SERIAL PRIMARY KEY,
  ---user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  ---login_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  ---ip_address VARCHAR(45),
  ---user_agent TEXT
---   );

--- 3. ACCESS CONTROL (RBAC)
  ---CREATE TABLE IF NOT EXISTS user_roles (
  ---id SERIAL PRIMARY KEY,
  ---user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  ---role_name VARCHAR(50) NOT NULL,
  ---created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
---);

---CREATE TABLE IF NOT EXISTS user_permissions (
  ---id SERIAL PRIMARY KEY,
  ---role_id INTEGER REFERENCES user_roles(id) ON DELETE CASCADE,
  ---permission_name VARCHAR(100) NOT NULL,
  ---created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
---);

--- 4. PERSONALIZATION & SETTINGS
---CREATE TABLE IF NOT EXISTS user_preferences (
  ---id SERIAL PRIMARY KEY,
  ---user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  ---preference_key VARCHAR(100) NOT NULL,
  ---preference_value TEXT,
  ---created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
---);

---  5. USER SETTINGS
---CREATE TABLE IF NOT EXISTS user_settings (     
 --- id SERIAL PRIMARY KEY,
 --- user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
 --- setting_key VARCHAR(100) NOT NULL,
  ---setting_value TEXT,
  --- created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
---);

---CREATE TABLE IF NOT EXISTS user_language_preferences (
 --- id SERIAL PRIMARY KEY,
 --- user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
 --- language_code VARCHAR(10) NOT NULL,
 --- created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
---);

---  5. USER TIMEZONES
---CREATE TABLE IF NOT EXISTS user_timezones (  
  ---id SERIAL PRIMARY KEY,
  ---user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  ---timezone VARCHAR(50) NOT NULL,
  ---created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
---);

  --- CREATE TABLE IF NOT EXISTS user_theme_preferences (
    ---id SERIAL PRIMARY KEY,
  ---user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  ---theme_name VARCHAR(50) NOT NULL,
  --- created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
---);

---  5. USER NOTIFICATION PREFERENCES   
  ---id SERIAL PRIMARY KEY,
  ---user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  ---notification_type VARCHAR(100) NOT NULL,
  ---is_enabled BOOLEAN DEFAULT TRUE,
  ---created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
---);

---  5. USER PRIVACY SETTINGS   
  ---id SERIAL PRIMARY KEY,
  ---user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  ---setting_key VARCHAR(100) NOT NULL,
  ---setting_value TEXT,
  ---created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
---   );

--- 5. SOCIAL & COMMUNICATION
---CREATE TABLE IF NOT EXISTS user_friends (
  ---id SERIAL PRIMARY KEY,
  ---user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  ---friend_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  ---created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
---   );

---CREATE TABLE IF NOT EXISTS user_messages (
 --- id SERIAL PRIMARY KEY,
  ---   sender_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  ---receiver_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  ---message TEXT NOT NULL,
  ---is_read BOOLEAN DEFAULT FALSE,
  ---created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
--- );

---CREATE TABLE IF NOT EXISTS user_groups (
 -- id SERIAL PRIMARY KEY,
 --- group_name VARCHAR(100) NOT NULL,
 --- created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
---);

---  5. USER GROUP MEMBERSHIP   
 -- id SERIAL PRIMARY KEY,
  ---group_id INTEGER REFERENCES user_groups(id) ON DELETE CASCADE,
  ---user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  ---created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
---);

---  5. USER NOTIFICATIONS    
 --- id SERIAL PRIMARY KEY,
 -- user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
 --- notification_type VARCHAR(100) NOT NULL,
 --- message TEXT NOT NULL,
 --- is_read BOOLEAN DEFAULT FALSE,
 --- created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
---);

--- 6. ACTIVITY & API
---CREATE TABLE IF NOT EXISTS user_activities (
  ---id SERIAL PRIMARY KEY,
  ---user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  ---activity_type VARCHAR(100) NOT NULL,
  ---activity_details TEXT,
  ---created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
---);

----CREATE TABLE IF NOT EXISTS user_activity_logs (
 ---- id SERIAL PRIMARY KEY,
 --- user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
 --- activity_type VARCHAR(100) NOT NULL,
 --- activity_details TEXT,
 --- created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
---);

---  5. USER API KEYS   
---CREATE TABLE IF NOT EXISTS user_api_keys (
  ---id SERIAL PRIMARY KEY,
  ---user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  ---api_key VARCHAR(255) UNIQUE NOT NULL,
  ---created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
---);

---  5. USER API TOKENS       
  ---id SERIAL PRIMARY KEY,
  ---user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  ---api_token VARCHAR(255) UNIQUE NOT NULL,
  ---created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
---);

---  5. USER API USAGE LOGS       
---id SERIAL PRIMARY KEY,
  ---user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  ---endpoint VARCHAR(255) NOT NULL,
  ---request_method VARCHAR(10) NOT NULL,
  ---response_status INTEGER NOT NULL,
  ---created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
---);

---CREATE TABLE IF NOT EXISTS user_oauth_providers (
  ---id SERIAL PRIMARY KEY,
  ---user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  ---provider_name VARCHAR(100) NOT NULL,
  ---provider_user_id VARCHAR(255) NOT NULL,
  ---created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
---);

--- 7. COMMERCE & BILLING
---CREATE TABLE IF NOT EXISTS user_subscriptions (
  ---id SERIAL PRIMARY KEY,
  ---user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  ---subscription_type VARCHAR(100) NOT NULL,
  ---subscription_status VARCHAR(50) NOT NULL,
  ---created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
---);

---  5. USER BILLING INFO     
---id SERIAL PRIMARY KEY,
  ---user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  ---billing_address TEXT NOT NULL,
  ---payment_method VARCHAR(100) NOT NULL,
  ---created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
---);

---  5. USER INVOICES     
  ---id SERIAL PRIMARY KEY,
  ---user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  ----invoice_number VARCHAR(100) NOT NULL,
  ---amount DECIMAL(10, 2) NOT NULL,
  ---invoice_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
---);

---  5. USER PAYMENTS       
 --- id SERIAL PRIMARY KEY,
  ---user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  ---payment_amount DECIMAL(10, 2) NOT NULL,
  ---payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  ---payment_method VARCHAR(100) NOT NULL
--);

--- 8. GAMIFICATION & ENGAGEMENT
---CREATE TABLE IF NOT EXISTS user_referrals (
  ---id SERIAL PRIMARY KEY,
  ---user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  ---referral_code VARCHAR(100) UNIQUE NOT NULL,
  ---referred_user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  ---created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
---);

---CREATE TABLE IF NOT EXISTS user_achievements (
  ---id SERIAL PRIMARY KEY,
  ---user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  ---achievement_name VARCHAR(100) NOT NULL,
  ---achievement_description TEXT,
  ---achieved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
---);

---  5. USER BADGES 
  ---id SERIAL PRIMARY KEY,
  ---user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  ---badge_name VARCHAR(100) NOT NULL,
  ---badge_description TEXT,
  ---awarded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
--- );

---CREATE TABLE IF NOT EXISTS user_leaderboard (
 --- id SERIAL PRIMARY KEY,
 --- user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
 --- score INTEGER NOT NULL,
 --- rank INTEGER NOT NULL,
 --- updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
---);

--- 9. SUPPORT & FEEDBACK
---CREATE TABLE IF NOT EXISTS user_feedback (
  ---id SERIAL PRIMARY KEY,
  ---user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  ---feedback_type VARCHAR(100) NOT NULL,
  ---feedback_message TEXT NOT NULL,
  ---created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
---);

---  5. USER SUPPORT TICKETS      
  ---id SERIAL PRIMARY KEY,
  ---user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  ---ticket_subject VARCHAR(255) NOT NULL,
  ---ticket_message TEXT NOT NULL,
  ---ticket_status VARCHAR(50) NOT NULL,
  ---created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
---);

--- 10. ACCOUNT LIFECYCLE
---CREATE TABLE IF NOT EXISTS user_account_status (
  ---id SERIAL PRIMARY KEY,
  ---user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  ---status VARCHAR(50) NOT NULL,
  ---reason TEXT,
  ---updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
---);

---CREATE TABLE IF NOT EXISTS user_account_deletion_requests (
  ---id SERIAL PRIMARY KEY,
  ---user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  ---request_reason TEXT,
  ---requested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
---);

---  5. USER ACCOUNT RECOVERY REQUESTS  
  ---id SERIAL PRIMARY KEY,
  ---user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  ---recovery_method VARCHAR(100) NOT NULL,
  ---requested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
---);

---  5. USER ACCOUNT SUSPENSIONS  
  ---id SERIAL PRIMARY KEY,
  ---user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  ---suspension_reason TEXT,
  ---suspended_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  ---lifted_at TIMESTAMP
---);

----CREATE TABLE IF NOT EXISTS user_account_reinstatements (
  ----id SERIAL PRIMARY KEY,
  ---user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  ---reinstatement_reason TEXT,
----  reinstated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
---);

---  5. USER ACCOUNT MERGES   
  ---id SERIAL PRIMARY KEY,
  ---primary_user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  ---secondary_user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  ---merge_reason TEXT,
  ---merged_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
---);

---  5. USER ACCOUNT SPLITS     
  ----id SERIAL PRIMARY KEY,
  ----original_user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  ---new_user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  ---split_reason TEXT,
  ---split_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
---);

---  5. USER ACCOUNT CLOSURES 
  ---id SERIAL PRIMARY KEY,
  ---user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  ---closure_reason TEXT,
 --- closed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
---);

---CREATE TABLE IF NOT EXISTS user_account_deactivations (
 --- id SERIAL PRIMARY KEY,
 --- user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  ---deactivation_reason TEXT,
  ---deactivated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
---);

---  5. USER ACCOUNT REACTIVATIONS    
  ---id SERIAL PRIMARY KEY,
  ---user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  ---reactivation_reason TEXT,
  ---reactivated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
---);

--- 11. DATA MANAGEMENT & MOBILE
---CREATE TABLE IF NOT EXISTS user_data_exports (
  ---id SERIAL PRIMARY KEY,
  ---user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  ---export_format VARCHAR(50) NOT NULL,
  ---export_status VARCHAR(50) NOT NULL,
  ---created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
---);

---  5. USER DATA IMPORTS   
---  id SERIAL PRIMARY KEY,
  ------user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  ---import_format VARCHAR(50) NOT NULL,
  ---import_status VARCHAR(50) NOT NULL,
  ----created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
---);

----CREATE TABLE IF NOT EXISTS user_device_tokens (
  ---id SERIAL PRIMARY KEY,
  ---user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  ---device_token VARCHAR(255) UNIQUE NOT NULL,
  ---created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
---);

---CREATE TABLE IF NOT EXISTS user_geolocation (
  --- id SERIAL PRIMARY KEY,
  ----user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  ----latitude DECIMAL(10, 8) NOT NULL,
  ----longitude DECIMAL(11, 8) NOT NULL,
  ---recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
---);

---CREATE TABLE IF NOT EXISTS user_events (
 --- id SERIAL PRIMARY KEY,
  ---user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  ---event_type VARCHAR(100) NOT NULL,
  ---event_details TEXT,
  ---created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
--);
 this version is best for now
-- 1. CORE IDENTITY & PROFILE
-- Merged: users + language + timezone + theme + metadata
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  profile_image TEXT,
  -- Flexible settings stored as JSON: {"theme": "dark", "lang": "en", "tz": "UTC"}
  settings JSONB DEFAULT '{}', 
  privacy_settings JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. AUTHENTICATION & SECURITY
CREATE TABLE IF NOT EXISTS user_auth_events (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  event_type VARCHAR(50), -- 'login_attempt', 'password_reset', 'email_verify'
  status VARCHAR(20),      -- 'success', 'fail', 'pending'
  ip_address VARCHAR(45),
  metadata JSONB,          -- Store user_agent or tokens here
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_sessions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  session_token VARCHAR(255) UNIQUE NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. RBAC (Roles & Permissions)
CREATE TABLE IF NOT EXISTS roles (
  id SERIAL PRIMARY KEY,
  role_name VARCHAR(50) UNIQUE NOT NULL,
  permissions JSONB -- Store array of permissions: ["read:posts", "write:posts"]
);

CREATE TABLE IF NOT EXISTS user_roles (
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  role_id INTEGER REFERENCES roles(id) ON DELETE CASCADE,
  PRIMARY KEY (user_id, role_id)
);

-- 4. SOCIAL & MESSAGING
CREATE TABLE IF NOT EXISTS user_relationships (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  target_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  rel_type VARCHAR(50), -- 'friend', 'blocked', 'follow'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  sender_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  receiver_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. BILLING & SUBSCRIPTIONS
CREATE TABLE IF NOT EXISTS user_billing (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  subscription_plan VARCHAR(50) DEFAULT 'free',
  status VARCHAR(20) DEFAULT 'active',
  billing_details JSONB, -- Address, payment methods
  last_payment_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. ACTIVITY & AUDIT LOGS
-- Merged: activities + logs + account_status + suspensions + merges
CREATE TABLE IF NOT EXISTS activity_audit_log (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  category VARCHAR(50), -- 'activity', 'security', 'account_lifecycle'
  action_type VARCHAR(100), -- 'account_suspended', 'profile_update', 'api_call'
  details JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 7. GAMIFICATION
CREATE TABLE IF NOT EXISTS user_rewards (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  reward_type VARCHAR(50), -- 'badge', 'achievement'
  reward_name VARCHAR(100),
  score_points INTEGER DEFAULT 0,
  awarded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);