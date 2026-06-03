const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// 1. Load environment variables from your secure Backend/.env file
dotenv.config();

const app = express();
// Priority port allocation: Render's environment variable first, or local 5000
const PORT = process.env.PORT || 5000;

// Import your application model schema for database mapping
const Applications = require('./models/Applications');

// 2. Global Middleware Assembly Line Configuration
app.use(cors({
    origin: '*', // Allows seamless communication with Vercel frontend deployments
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
app.use(express.json()); // Essential middleware for reading incoming application JSON request bodies

// 3. MongoDB Atlas Cloud Database Network Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Successfully connected to MongoDB Atlas. 🍃'))
    .catch((err) => console.error('MongoDB Atlas connection failure:', err));

// Route A: Base Landing URL Route (The initial index response Render triggers on hit)
app.get('/', (req, res) => {
    res.json({ message: "Backend Online! 🚀" });
});

// Route B: The Health Check Route (Turns your Vercel frontend indicator green!)
app.get('/api/status', (req, res) => {
    res.status(200).json({ 
        status: 'online',
        message: 'Starehe Admissions Portal Backend Engine is active. Connection Successful! Hola React, me llamo Backend',
        timestamp: new Date()
    });
});

// Route C: Secure Dynamic Student Applications Submission Endpoint
app.post('/api/applications', async (req, res) => {
    try {
        // Instantiate data from the frontend wizard payload
        const newApplication = new Applications(req.body);
        
        // Save records asynchronously over the web to your cloud collections cluster
        const savedApplication = await newApplication.save();
        
        res.status(201).json({
            success: true,
            message: 'Application recorded choreographically to MongoDB Cloud! 💾',
            applicationId: savedApplication._id
        });
    } catch (error) {
        console.error('Data saving compilation failure:', error);
        res.status(400).json({
            success: false,
            message: 'Application submission validation failed.',
            error: error.message
        });
    }
});

// 5. Fire up the execution listener loop
app.listen(PORT, () => {
    console.log(`✅ Server is live and executing choreographically on port ${PORT}`);
});