const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
    // 1. Institutional Track Selector
    institutionType: {
        type: String,
        required: true,
        enum: ['SBC', 'SGC'] // Restricts data strictly to Starehe Boys or Starehe Girls
    },

    // 2. Step 1: Personal Information & Identification
    personalInfo: {
        fullName: { type: String, required: true, trim: true },
        dateOfBirth: { type: Date, required: true },
        birthCertificateNumber: { type: String, required: true, trim: true },
        nemisUPI: { type: String, trim: true, default: '' },
        assessmentNumber: { type: String, trim: true, default: '' },
        gender: { 
            type: String, 
            required: true, 
            enum: ['Male', 'Female'],
            validate: {
                validator: function(value) {
                    // ✅ FIXED: Safely resolve the top-level root document across all operations
                    const rootDoc = this.ownerDocument ? this.ownerDocument() : this;
                    
                    // If we can't find the root layout track yet, skip validation to prevent freeze
                    if (!rootDoc || !rootDoc.institutionType) return true;
                    
                    const track = rootDoc.institutionType;
                    if (track === 'SGC' && value !== 'Female') return false;
                    if (track === 'SBC' && value !== 'Male') return false;
                    return true;
                },
                message: 'Gender mismatch! Starehe Girls applications must be Female, and Starehe Boys must be Male.'
            }
        },
        religion: { type: String, required: true, trim: true },
        nationality: { type: String, default: 'Kenyan', trim: true },
        county: { type: String, required: true, trim: true },
        subCounty: { type: String, required: true, trim: true },
        isFirstTimeApplication: { type: String, default: 'Yes', enum: ['Yes', 'No'] },
        reapplicationReason: { type: String, trim: true, default: '' },
        isTransferStudent: { type: Boolean, default: false },
        transferDetails: {
            currentGrade: { type: String, default: '' },
            reasonForTransfer: { type: String, default: '' }
        }
    },

    // 3. Step 2: Academic Background
    academicBackground: {
        juniorSchool: { type: String, required: true, trim: true },
        schoolCounty: { type: String, required: true, trim: true },
        schoolSubCounty: { type: String, required: true, trim: true },
        yearCompleted: { type: Number, required: true }
    },

    // 4. Step 3: Pathway Priority Choices
    pathwayChoices: {
        choice1: {
            pathwayName: { type: String, required: true },
            trackName: { type: String, required: true }
        },
        choice2: {
            pathwayName: { type: String, required: true },
            trackName: { type: String, required: true }
        },
        choice3: {
            pathwayName: { type: String, required: true },
            trackName: { type: String, required: true }
        }
    },

    /*//5. Step 4: Family Context
    familyContext: {
        guardianName: { type: String, required: true, trim: true },
        guardianContact: { type: String, required: true, trim: true },
        householdIncomeBracket: { type: String, required: true },
        justificationForBursary: { type: String, trim: true, default: '' }
    },*/

    // 6. Step 5: Legal Declarations & Sign-off
    legalDeclaration: {
        hasCertifiedTrueData: { type: Boolean, required: true, enum: [true] }, // Must be true to pass validation
        signatureName: { type: String, required: true, trim: true },
        signedAt: { type: Date, default: Date.now }
    },
    
    // 6. Step 6: Document Upload Tracking Paths
    documentAttachments: {
        // 📍 LOCAL FALLBACK OPTION: Changed to required: false so your form writes 
        // instantly even if your cloud images take time to stream through Multer local storage!
        passportPhotoPath: { type: String, required: false, default: '' }, // Stores path to passport photo cloud link
        birthCertPath: { type: String, required: false, default: '' },     // Stores path to scanned birth cert cloud link
        academicTranscriptPath: { type: String, default: '' },
        parentNationalIdPath: { type: String, default: '' },
        payslipPath: { type: String, default: '' },
        businessStatementPath: { type: String, default: '' },
        titleDeedPath: { type: String, default: '' },
        deathCertPath: { type: String, default: '' },
        recommendationPacketPath: { type: String, default: '' }
    }

}, {
    timestamps: true // Automatically injects createdAt and updatedAt date tags for tracking
});

// Create the compiled model interface
const Application = mongoose.model('Application', ApplicationSchema);

module.exports = Application;