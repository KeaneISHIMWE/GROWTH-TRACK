const supabase = require('../config/supabase');

// Register a new user
const registerUser = async (req, res) => {
  try {
    const { email, password, name, role } = req.body;
    
    // Create user in Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          role: role || 'BUSINESS_DEVELOPMENT_OFFICER'
        }
      }
    });
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    
    return res.status(201).json({
      message: 'User registered successfully',
      user: data.user
    });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ error: 'Internal server error during registration' });
  }
};

// Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Sign in with Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) {
      return res.status(401).json({ error: error.message });
    }
    
    return res.status(200).json({
      message: 'Login successful',
      user: data.user,
      session: data.session
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Internal server error during login' });
  }
};

// Logout user
const logoutUser = async (req, res) => {
  try {
    // Get the user's session
    const authHeader = req.headers.authorization;
    const token = authHeader ? authHeader.substring(7) : null;
    
    if (token) {
      // Sign out from Supabase Auth
      await supabase.auth.signOut();
    }
    
    return res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Logout error:', error);
    return res.status(500).json({ error: 'Internal server error during logout' });
  }
};

// Get current user profile
const getCurrentUser = async (req, res) => {
  try {
    // The user is already attached to the request by the auth middleware
    return res.status(200).json({
      user: req.user
    });
  } catch (error) {
    console.error('Get user error:', error);
    return res.status(500).json({ error: 'Internal server error while fetching user' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser
};