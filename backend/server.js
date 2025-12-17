const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const authRoutes = require('./routes/authRoutes');
const leadsRoutes = require('./routes/leadsRoutes');
const clientsRoutes = require('./routes/clientsRoutes');
const dealsRoutes = require('./routes/dealsRoutes');
const revenueRoutes = require('./routes/revenueRoutes');
const activitiesRoutes = require('./routes/activitiesRoutes');

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to GrowthTrack API' });
});

app.use('/api/auth', authRoutes);
app.use('/api/leads', leadsRoutes);
app.use('/api/clients', clientsRoutes);
app.use('/api/deals', dealsRoutes);
app.use('/api/revenue', revenueRoutes);
app.use('/api/activities', activitiesRoutes);

// Export app for testing
module.exports = app;

// Start server only if this file is run directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}