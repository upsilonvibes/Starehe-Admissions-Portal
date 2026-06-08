const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const multer = require('multer'); 
const path = require('path');
const fs = require('fs');

// 1. Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Ensure local temporary directory exists for uploads
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// IMPORT SEPARATE BLUEPRINT
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
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); // 📍 FIX: Essential for unpacking deep multi-part form structures safely

// 3. MongoDB Atlas Cloud Database Network Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Successfully connected to MongoDB Atlas. 🍃'))
    .catch((err) => console.error('MongoDB Atlas connection failure:', err));

// Route A: Base Landing URL Route
app.get('/', (req, res) => {
    res.json({ message: "Backend Online! 🚀" });
});

// Route B: The Health Check Route
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
        console.log("📥 Inbound request intercepted on Starehe Gateway!");
        console.log("RAW BODY RECEIVED:", req.body);
        console.log("RAW FILES RECEIVED:", req.files);

        const body = req.body;

        // Safely parse nested structures whether they arrive as raw objects or JSON strings
        const parsePayloadBlock = (block) => {
            if (!block) return {};
            if (typeof block === 'string') {
                try { return JSON.parse(block); } catch (e) { return {}; }
            }
            return block;
        };

        const pInfo = parsePayloadBlock(body.personalInfo);
        const acad  = parsePayloadBlock(body.academicBackground);
        const path  = parsePayloadBlock(body.pathwayChoices);
        const legal = parsePayloadBlock(body.legalDeclaration);

        const reconstructedPayload = {
            institutionType: body.institutionType || 'SBC',
            
            personalInfo: {
                fullName: pInfo.fullName || undefined, // undefined forces Mongoose validation catch if empty
                dateOfBirth: pInfo.dateOfBirth ? new Date(pInfo.dateOfBirth) : undefined,
                birthCertificateNumber: pInfo.birthCertificateNumber || undefined,
                nemisUPI: pInfo.nemisUPI || '',
                assessmentNumber: pInfo.assessmentNumber || '',
                gender: pInfo.gender || undefined,
                religion: pInfo.religion || 'Christian', 
                nationality: pInfo.nationality || 'Kenyan',
                county: pInfo.county || undefined,
                subCounty: pInfo.subCounty || undefined,
                isFirstTimeApplication: pInfo.isFirstTimeApplication || 'Yes',
                reapplicationReason: pInfo.reapplicationReason || '',
                isTransferStudent: pInfo.isTransferStudent === 'true' || pInfo.isTransferStudent === true,
                transferDetails: {
                    currentGrade: pInfo.transferDetails?.currentGrade || '',
                    reasonForTransfer: pInfo.transferDetails?.reasonForTransfer || ''
                }
            },

            academicBackground: {
                juniorSchool: acad.juniorSchool || undefined,
                schoolCounty: acad.schoolCounty || acad.county || undefined,
                schoolSubCounty: acad.schoolSubCounty || acad.subCounty || undefined,
                yearCompleted: Number(acad.yearCompleted) || new Date().getFullYear()
            },

            pathwayChoices: {
                choice1: {
                    pathwayName: path.choice1?.pathwayName || undefined,
                    trackName: path.choice1?.trackName || undefined
                },
                choice2: {
                    pathwayName: path.choice2?.pathwayName || undefined,
                    trackName: path.choice2?.trackName || undefined
                },
                choice3: {
                    pathwayName: path.choice3?.pathwayName || undefined,
                    trackName: path.choice3?.trackName || undefined
                }
            },

            legalDeclaration: {
                hasCertifiedTrueData: legal.hasCertifiedTrueData === 'true' || legal.hasCertifiedTrueData === true,
                signatureName: legal.signatureName || undefined,
                signedAt: legal.verifiedAt ? new Date(legal.verifiedAt) : new Date()
            },

            documentAttachments: {
                passportPhotoPath: req.files?.passportPhotoFile?.[0]?.path || '',
                birthCertPath: req.files?.birthCertFile?.[0]?.path || ''
            }
        };

        // Fallback option handling for flat array structures
        if (body.selections) {
            try {
                const parsedSelections = typeof body.selections === 'string' ? JSON.parse(body.selections) : body.selections;
                reconstructedPayload.pathwayChoices.choice1 = {
                    pathwayName: parsedSelections[0]?.pathway || reconstructedPayload.pathwayChoices.choice1.pathwayName,
                    trackName: parsedSelections[0]?.track || reconstructedPayload.pathwayChoices.choice1.trackName
                };
                reconstructedPayload.pathwayChoices.choice2 = {
                    pathwayName: parsedSelections[1]?.pathway || reconstructedPayload.pathwayChoices.choice2.pathwayName,
                    trackName: parsedSelections[1]?.track || reconstructedPayload.pathwayChoices.choice2.trackName
                };
                reconstructedPayload.pathwayChoices.choice3 = {
                    pathwayName: parsedSelections[2]?.pathway || reconstructedPayload.pathwayChoices.choice3.pathwayName,
                    trackName: parsedSelections[2]?.track || reconstructedPayload.pathwayChoices.choice3.trackName
                };
            } catch(e) {
                console.log("Could not parse options array, sticking to standard fields.");
            }
        }

        // Save records cleanly to your database cluster
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

// 5. Fire up execution listener loop
app.listen(PORT, () => {
    console.log(`✅ Server is live and executing choreographically on port ${PORT}`);
});