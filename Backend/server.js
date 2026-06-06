const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const multer = require('multer'); // 📍 ADDED: For processing multi-part/form-data
const path = require('path');
const fs = require('fs');

// 1. Load environment variables from your secure Backend/.env file
dotenv.config();

const app = express();
// Priority port allocation: Render's environment variable first, or local 5000
const PORT = process.env.PORT || 5000;

// Ensure local temporary directory exists for uploads
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// 📍 IMPORT SEPARATE BLUEPRINT: Keeps your code modular!
const Applications = require('./models/Applications');

// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedExtensions = /jpeg|jpg|png|pdf/;
    const extName = allowedExtensions.test(path.extname(file.originalname).toLowerCase());
    const mimeType = allowedExtensions.test(file.mimetype);

    if (extName && mimeType) {
        return cb(null, true);
    } else {
        cb(new Error('Security Guard: Uploads must be strictly restricted to PDF or Image files!'));
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }
});

// 2. Global Middleware Assembly Line Configuration
app.use(cors({
    origin: '*', // Allows seamless communication with Vercel frontend deployments
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
app.use(express.json()); // Essential middleware for reading incoming application JSON request bodies

// 3. MongoDB Atlas Cloud Database Network Connection
// mongoose.connect(process.env.MONGODB_URI)
//     .then(() => console.log('Successfully connected to MongoDB Atlas. 🍃'))
//     .catch((err) => console.error('MongoDB Atlas connection failure:', err));
// Route A: Base Landing URL Route (The initial index response Render triggers on hit)
app.get('/', (req, res) => {
    res.json({ message: "Backend Online! 🚀" });
});

// Route B: The Health Check Route (Turns your Vercel frontend indicator green!)
app.get('/api/status', (req, res) => {
    res.status(200).json({ 
        status: 'online',
        message: 'Starehe Admissions Portal Backend Engine is active.',
        timestamp: new Date()
    });
});

// Route C: Secure Dynamic Student Applications Submission Endpoint
app.post('/api/applications', upload.fields([
    { name: 'passportPhotoFile', maxCount: 1 },
    { name: 'birthCertFile', maxCount: 1 }
]), async (req, res) => {
   try {
        // Debugging logs to help you see exactly what's hitting the server terminal
        console.log("📥 Inbound request intercepted on Starehe Gateway!");
        console.log("RAW BODY RECEIVED:", req.body);
        console.log("RAW FILES RECEIVED:", req.files);

        const body = req.body;

        // BIND THE DATA STRUCTURE DIRECTLY TO ELIMINATE PARSING BUG REJECTIONS
        const reconstructedPayload = {
            institutionType: body.institutionType || (req.query.view === 'sbc' ? 'SBC' : 'SGC'),
            
            personalInfo: {
                fullName: body['personalInfo[fullName]'] || `${body.firstName || ''} ${body.middleName || ''} ${body.lastName || ''}`.trim(),
                dateOfBirth: body['personalInfo[dateOfBirth]'] || body.dob,
                birthCertificateNumber: body['personalInfo[birthCertificateNumber]'] || body.birthCertNo,
                nemisUPI: body['personalInfo[nemisUPI]'] || body.nemisUpiNo || '',
                assessmentNumber: body['personalInfo[assessmentNumber]'] || body.assessmentNo || '',
                religion: body['personalInfo[religion]'] || body.religion || '',
                nationality: body['personalInfo[nationality]'] || body.nationality || 'Kenyan',
                county: body['personalInfo[county]'] || body.county || '',
                subCounty: body['personalInfo[subCounty]'] || body.subCounty || '',
                isFirstTimeApplication: body['personalInfo[isFirstTimeApplication]'] || body.isFirstTimeApplication || 'Yes',
                reapplicationReason: body.reapplicationReason || body['personalInfo[reapplicationReason]'] || '',
                isTransferStudent: body['personalInfo[isTransferStudent]'] === 'true' || body.applicationType === 'Transfer',
                transferDetails: {
                    currentGrade: body['personalInfo[transferDetails][currentGrade]'] || body.currentGrade || '',
                    reasonForTransfer: body['personalInfo[transferDetails][reasonForTransfer]'] || body.transferReason || ''
                }
            },

            academicBackground: {
                primarySchoolName: body['academicBackground[primarySchoolName]'] || body.juniorSchool || '',
                schoolKnecCode: body['academicBackground[schoolKnecCode]'] || body.schoolKnecCode || '',
                kcpeOrAssessmentMarks: Number(body['academicBackground[kcpeOrAssessmentMarks]']) || Number(body.kcpeOrAssessmentMarks) || 0,
                yearCompleted: Number(body['academicBackground[yearCompleted]']) || Number(body.yearCompleted) || new Date().getFullYear()
            },

            pathwayChoices: {
                choice1: {
                    pathwayName: body['pathwayChoices[choice1][pathwayName]'] || '',
                    trackName: body['pathwayChoices[choice1][trackName]'] || ''
                },
                choice2: {
                    pathwayName: body['pathwayChoices[choice2][pathwayName]'] || '',
                    trackName: body['pathwayChoices[choice2][trackName]'] || ''
                },
                choice3: {
                    pathwayName: body['pathwayChoices[choice3][pathwayName]'] || '',
                    trackName: body['pathwayChoices[choice3][trackName]'] || ''
                }
            },

            legalDeclaration: {
                hasCertifiedTrueData: true, // Auto-bind true as they clicked submit on the wizard review screen
                signatureName: body['legalDeclaration[signatureName]'] || `${body.firstName || ''} ${body.lastName || ''}`.trim(),
                signedAt: new Date()
            },

            documentAttachments: {
                passportPhotoPath: req.files && req.files['passportPhotoFile'] ? req.files['passportPhotoFile'][0].path : '',
                birthCertPath: req.files && req.files['birthCertFile'] ? req.files['birthCertFile'][0].path : ''
            }
        };

        // If pathway choices are arriving completely flat instead of nested, catch them here
        if (body.selections) {
            try {
                const parsedSelections = typeof body.selections === 'string' ? JSON.parse(body.selections) : body.selections;
                reconstructedPayload.pathwayChoices.choice1 = {
                    pathwayName: parsedSelections[0]?.pathway || '',
                    trackName: parsedSelections[0]?.track || ''
                };
                reconstructedPayload.pathwayChoices.choice2 = {
                    pathwayName: parsedSelections[1]?.pathway || '',
                    trackName: parsedSelections[1]?.track || ''
                };
                reconstructedPayload.pathwayChoices.choice3 = {
                    pathwayName: parsedSelections[2]?.pathway || '',
                    trackName: parsedSelections[2]?.track || ''
                };
            } catch(e) {
                console.log("Could not parse options array natively, defaulting fields.");
            }
        }

        // Save records cleanly to your cluster
        const newApplication = new Applications(reconstructedPayload);
        const savedApplication = await newApplication.save();
        
        res.status(201).json({
            success: true,
            message: 'Application recorded successfully to Starehe Servers! 💾',
            applicationId: savedApplication._id
        });

    } catch (error) {
        console.error('Starehe Database transaction failure:', error);
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