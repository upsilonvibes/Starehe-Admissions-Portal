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
        isTransferStudent: { type: Boolean, default: false },
        transferDetails: {
            currentGrade: { type: String, default: '' },
            reasonForTransfer: { type: String, default: '' }
        }
    },

    // 3. Step 2: Academic Background
    academicBackground: {
        primarySchoolName: { type: String, required: true, trim: true },
        schoolKnecCode: { type: String, required: true, trim: true },
        kcpeOrAssessmentMarks: { type: Number, required: false },
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
    }
}, {
    timestamps: true // Automatically injects createdAt and updatedAt date tags for tracking
});

// Create the compiled model interface
const Application = mongoose.model('Application', ApplicationSchema);

module.exports = Application;
