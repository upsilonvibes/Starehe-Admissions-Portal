const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const cloudinary = require('cloudinary').v2;

// 1. Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// 2. Initialize Cloudinary Global Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// 3. Global Middleware Assembly Configuration
app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// 4. MongoDB Atlas Cloud Database Network Connection
mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 5000, 
})
.then(() => console.log('🍃 Starehe Database Engine Connected Successfully!'))
.catch((err) => {
    console.error('❌ CRITICAL DATABASE CONNECTION ERROR:', err.message);
});

// Route A: Base Landing URL Route 
app.get('/', (req, res) => {
    res.json({ message: "Backend Online! Welcome to the Starehe Community. 🚀" });
});

// Route B: The Health Check Route
app.get('/api/status', (req, res) => {
    res.status(200).json({ 
        status: 'online',
        message: 'Welcome to the Starehe Community admissions gateway.',
        timestamp: new Date()
    });
});

// Route C: Mount Decoupled Router Block Subsystems
const applicationsRouter = require('./routes/applications');
app.use('/api/applications', applicationsRouter); // Mounts everything neatly under /api/applications

// 5. Fire up execution listener loop
app.listen(PORT, () => {
    console.log(`✅ Server is live and executing choreographically on port ${PORT}`);
});