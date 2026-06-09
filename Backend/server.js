const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const multer = require('multer'); 
const path = require('path');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// 1. Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// IMPORT SEPARATE BLUEPRINT
const Applications = require('./models/Applications');

// 2. Initialize Cloudinary Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// 3. Set Up Cloudinary Storage Engine for Multer
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'starehe_community_portal', // Creates a dedicated folder dynamically in your Cloudinary asset pool
        allowed_formats: ['jpg', 'jpeg', 'png', 'pdf'],
        resource_type: 'auto' // 📍 CRITICAL: 'auto' allows simultaneous processing of binary image types and PDFs
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 } // Retains strict 5MB file-size validation threshold per seat
});

// 4. Global Middleware Assembly Line Configuration
app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); // Essential for unpacking deep multi-part form structures safely

// 5. MongoDB Atlas Cloud Database Network Connection
mongoose.connect(process.env.MONGODB_URI, {
    // Tells the driver to give up looking for the database after 5 seconds instead of hanging
    serverSelectionTimeoutMS: 5000, 
})
.then(() => console.log('🍃 Starehe Database Engine Connected Successfully!'))
.catch((err) => {
    console.error('❌ CRITICAL DATABASE CONNECTION ERROR:');
    console.error(err.message);
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

// Route C: Secure Dynamic Student Applications Submission Endpoint
app.post('/api/applications', upload.fields([
    { name: 'passportPhotoFile', maxCount: 1 },
    { name: 'birthCertFile', maxCount: 1 }
]), async (req, res) => {
    try {
        console.log("📥 Inbound request intercepted on Starehe Gateway!");
        console.log("RAW BODY RECEIVED:", req.body);
        console.log("RAW FILES RECEIVED (CLOUDINARY REDIRECTS):", req.files);

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
                gender: body.gender || pInfo.gender || undefined,
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
                juniorSchool: acad.juniorSchool || body['academicBackground[juniorSchool]'] || undefined,
                
                schoolCounty: (acad.schoolCounty && acad.schoolCounty.trim() !== '') ? acad.schoolCounty : 
                              (body['academicBackground[schoolCounty]'] && body['academicBackground[schoolCounty]'].trim() !== '') ? body['academicBackground[schoolCounty]'] : 
                              undefined,
                              
                schoolSubCounty: (acad.schoolSubCounty && acad.schoolSubCounty.trim() !== '') ? acad.schoolSubCounty : 
                                 (body['academicBackground[schoolSubCounty]'] && body['academicBackground[schoolSubCounty]'].trim() !== '') ? body['academicBackground[schoolSubCounty]'] : 
                                 undefined,
                                 
                yearCompleted: Number(acad.yearCompleted) || Number(body['academicBackground[yearCompleted]']) || new Date().getFullYear()
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
                // 📍 CLOUDINARY FILE URL INJECTION: Saves absolute CDN https paths cleanly straight to Atlas!
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
            message: 'Application recorded successfully to Starehe Servers! Welcome to the Starehe Csaommunity. 💾',
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

// 6. Fire up execution listener loop
app.listen(PORT, () => {
    console.log(`✅ Server is live and executing choreographically on port ${PORT}`);
});