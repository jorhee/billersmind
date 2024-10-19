const express = require('express');
const cors = require('cors');
const connectDB = require('./config');

const app = express();

require('dotenv').config();


// Middleware
app.use(cors());
app.use(express.json());


// Connect to MongoDB
connectDB();

/*// Example route
app.get('/', (req, res) => {
  res.send('API is running...');
});
*/
const profileRoutes = require('./routes/profile');


//routes
app.use('/profiles', profileRoutes);




// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
