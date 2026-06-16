// models/Application.js
const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
    // ✅ NEW UNIQUE CUSTOM ID FIELD INTEGRATED
    customId: { 
        type: String, 
        required: true, 
        unique: true, 
        trim: true 
    },

    institutionType: {
        type: String,
        required: true,
        enum: ['SBC', 'SGC']
    },

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
                    const rootDoc = this.ownerDocument ? this.ownerDocument() : this;
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

    academicBackground: {
        juniorSchool: { type: String, required: true, trim: true },
        schoolCounty: { type: String, required: true, trim: true },
        schoolSubCounty: { type: String, required: true, trim: true },
        yearCompleted: { type: Number, required: true }
    },

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

    familyBackground: {
        father: {
            fullName: { type: String, default: '', trim: true },
            status: { type: String, enum: ['Alive', 'Deceased', 'Unknown'], default: 'Alive' },
            maritalStatus: { type: String, default: '' },
            nationality: { type: String, default: 'Kenyan' },
            nationalIdNo: { type: String, default: '' },
            employmentDetails: { type: String, default: '' },
            businessDetails: { type: String, default: '' },
            landAssets: { type: String, default: '' },
            otherIncomeSource: { type: String, default: '' },
            averageMonthlyIncome: { type: Number, default: 0 },
            physicalAddress: { type: String, default: '' },
            houseOwnership: { type: String, default: '' }
        },
        mother: {
            fullName: { type: String, default: '', trim: true },
            status: { type: String, enum: ['Alive', 'Deceased', 'Unknown'], default: 'Alive' },
            maritalStatus: { type: String, default: '' },
            nationality: { type: String, default: 'Kenyan' },
            nationalIdNo: { type: String, default: '' },
            employmentDetails: { type: String, default: '' },
            businessDetails: { type: String, default: '' },
            landAssets: { type: String, default: '' },
            otherIncomeSource: { type: String, default: '' },
            averageMonthlyIncome: { type: Number, default: 0 },
            physicalAddress: { type: String, default: '' },
            houseOwnership: { type: String, default: '' }
        },
        siblings: [{
            name: { type: String, trim: true },
            gender: { type: String, enum: ['M', 'F', ''] },
            age: { type: Number, default: null },
            schoolOrOccupation: { type: String, default: '' },
            incomeOrFeesPaid: { type: String, default: '' }
        }],
        siblingFeesPayer: { type: String, default: '', trim: true }
    },

    // ✅ NEW TRANSCRIBED VALUES STRUCTURED INTERNALLY INTO SCHEMA DATA LAYOUTS
    recommendations: {
        chief: {
            name: { type: String, default: '', trim: true },
            physicalAddress: { type: String, default: '', trim: true },
            mobile: { type: String, default: '', trim: true },
            officeTel: { type: String, default: '', trim: true },
            dateSigned: { type: String, default: '' },
            comments: { type: String, default: '', trim: true }
        },
        religiousLeader: {
            name: { type: String, default: '', trim: true },
            address: { type: String, default: '', trim: true },
            mobile: { type: String, default: '', trim: true },
            officeTel: { type: String, default: '', trim: true },
            dateSigned: { type: String, default: '' },
            comments: { type: String, default: '', trim: true }
        },
        headteacher: {
            financialStatusCertification: { type: String, default: '' },
            name: { type: String, default: '', trim: true },
            mobile: { type: String, default: '', trim: true },
            dateSigned: { type: String, default: '' },
            academicRemarks: { type: String, default: '', trim: true },
            coCurricularRemarks: { type: String, default: '', trim: true },
            disciplineRemarks: { type: String, default: '', trim: true },
            generalComments: { type: String, default: '', trim: true }
        }
    },

    admissionJustification: {
        applicationStream: { type: String, default: '', trim: true },
        explanationText: { type: String, required: true, trim: true },
        signeeName: { type: String, required: true, trim: true },
        signeeOccupation: { type: String, default: '', trim: true },
        signeeAddress: { type: String, default: '', trim: true },
        signeeMobile: { type: String, required: true, trim: true },
        signeeEmail: { type: String, default: '', trim: true },
        relationshipToApplicant: { type: String, required: true, trim: true }
    },

    legalDeclaration: {
        hasCertifiedTrueData: { type: Boolean, required: true, enum: [true] }, 
        signatureName: { type: String, required: true, trim: true },
        signedAt: { type: Date, default: Date.now }
    },
    
    documentAttachments: {
        passportPhotoPath: { type: String, default: '' }, 
        birthCertPath: { type: String, default: '' },     
        fatherIdPath: { type: String, default: '' },
        motherIdPath: { type: String, default: '' },
        fatherPayslipPath: { type: String, default: '' },
        motherPayslipPath: { type: String, default: '' },
        fatherBusinessPath: { type: String, default: '' },
        motherBusinessPath: { type: String, default: '' },
        fatherTitleDeedPath: { type: String, default: '' },
        motherTitleDeedPath: { type: String, default: '' },
        fatherDeathCertPath: { type: String, default: '' },
        motherDeathCertPath: { type: String, default: '' },
        guardianshipProofPath: { type: String, default: '' },
        kpseaResultSlipPath: { type: String, default: '' },
        juniorSchoolTranscriptPath: { type: String, default: '' },
        
        // ✅ ATTACHED DISK FILE ROUTES FOR DYNAMIC SCANNED DATA
        chiefRecommendationPath: { type: String, default: '' },
        religiousLeaderRecommendationPath: { type: String, default: '' },
        headteacherRecommendationPath: { type: String, default: '' }
    }
}, {
    timestamps: true 
});

const Application = mongoose.model('Application', ApplicationSchema);
module.exports = Application;