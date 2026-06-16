const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const Application = require('../models/Application'); // Points directly to clean uppercase singular model

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'starehe_community_portal',
        allowed_formats: ['jpg', 'jpeg', 'png', 'pdf'],
        resource_type: 'auto'
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }
});

const coreApplicationUploadFields = [
    { name: 'passportPhotoFile', maxCount: 1 },
    { name: 'birthCertFile', maxCount: 1 },
    { name: 'fatherIdFile', maxCount: 1 },
    { name: 'motherIdFile', maxCount: 1 },
    { name: 'fatherPayslipFile', maxCount: 1 },
    { name: 'motherPayslipFile', maxCount: 1 },
    { name: 'fatherBusinessFile', maxCount: 1 },
    { name: 'motherBusinessFile', maxCount: 1 },
    { name: 'fatherTitleDeedFile', maxCount: 1 },
    { name: 'motherTitleDeedFile', maxCount: 1 },
    { name: 'fatherDeathCertFile', maxCount: 1 },
    { name: 'motherDeathCertFile', maxCount: 1 },
    { name: 'guardianshipProofFile', maxCount: 1 }
];

router.post('/', upload.fields(coreApplicationUploadFields), async (req, res) => {
    try {
        console.log("📥 Inbound request intercepted on Starehe Gateway Applications Subsystem!");
        const body = req.body;

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
        const famBack = parsePayloadBlock(body.familyBackground);
        const justify = parsePayloadBlock(body.admissionJustification);

        let siblingArrayResolved = [];
        if (body['familyBackground[siblings]']) {
            try { siblingArrayResolved = JSON.parse(body['familyBackground[siblings]']); } catch(e) { siblingArrayResolved = []; }
        } else if (famBack.siblings) {
            siblingArrayResolved = famBack.siblings;
        }

        const reconstructedPayload = {
            institutionType: body.institutionType || 'SBC',
            
            personalInfo: {
                fullName: pInfo.fullName || undefined, 
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
                    pathwayName: path.choice1?.pathwayName || body['pathwayChoices[choice1][pathwayName]'] || undefined,
                    trackName: path.choice1?.trackName || body['pathwayChoices[choice1][trackName]'] || undefined
                },
                choice2: {
                    pathwayName: path.choice2?.pathwayName || body['pathwayChoices[choice2][pathwayName]'] || undefined,
                    trackName: path.choice2?.trackName || body['pathwayChoices[choice2][trackName]'] || undefined
                },
                choice3: {
                    pathwayName: path.choice3?.pathwayName || body['pathwayChoices[choice3][pathwayName]'] || undefined,
                    trackName: path.choice3?.trackName || body['pathwayChoices[choice3][trackName]'] || undefined
                }
            },

            familyBackground: {
                father: {
                    fullName: famBack.father?.fullName || body['familyBackground[father][fullName]'] || '',
                    status: famBack.father?.status || body['familyBackground[father][status]'] || 'Alive',
                    maritalStatus: famBack.father?.maritalStatus || body['familyBackground[father][maritalStatus]'] || '',
                    nationality: famBack.father?.nationality || body['familyBackground[father][nationality]'] || 'Kenyan',
                    nationalIdNo: famBack.father?.nationalIdNo || body['familyBackground[father][nationalIdNo]'] || '',
                    employmentDetails: famBack.father?.employmentDetails || body['familyBackground[father][employmentDetails]'] || '',
                    businessDetails: famBack.father?.businessDetails || body['familyBackground[father][businessDetails]'] || '',
                    landAssets: famBack.father?.landAssets || body['familyBackground[father][landAssets]'] || '',
                    otherIncomeSource: famBack.father?.otherIncomeSource || body['familyBackground[father][otherIncomeSource]'] || '',
                    averageMonthlyIncome: Number(famBack.father?.averageMonthlyIncome || body['familyBackground[father][averageMonthlyIncome]']) || 0,
                    physicalAddress: famBack.father?.physicalAddress || body['familyBackground[father][physicalAddress]'] || '',
                    houseOwnership: famBack.father?.houseOwnership || body['familyBackground[father][houseOwnership]'] || ''
                },
                mother: {
                    fullName: famBack.mother?.fullName || body['familyBackground[mother][fullName]'] || '',
                    status: famBack.mother?.status || body['familyBackground[mother][status]'] || 'Alive',
                    maritalStatus: famBack.mother?.maritalStatus || body['familyBackground[mother][maritalStatus]'] || '',
                    nationality: famBack.mother?.nationality || body['familyBackground[mother][nationality]'] || 'Kenyan',
                    nationalIdNo: famBack.mother?.nationalIdNo || body['familyBackground[mother][nationalIdNo]'] || '',
                    employmentDetails: famBack.mother?.employmentDetails || body['familyBackground[mother][employmentDetails]'] || '',
                    businessDetails: famBack.mother?.businessDetails || body['familyBackground[mother][businessDetails]'] || '',
                    landAssets: famBack.mother?.landAssets || body['familyBackground[mother][landAssets]'] || '',
                    otherIncomeSource: famBack.mother?.otherIncomeSource || body['familyBackground[mother][otherIncomeSource]'] || '',
                    averageMonthlyIncome: Number(famBack.mother?.averageMonthlyIncome || body['familyBackground[mother][averageMonthlyIncome]']) || 0,
                    physicalAddress: famBack.mother?.physicalAddress || body['familyBackground[mother][physicalAddress]'] || '',
                    houseOwnership: famBack.mother?.houseOwnership || body['familyBackground[mother][houseOwnership]'] || ''
                },
                siblings: siblingArrayResolved,
                siblingFeesPayer: famBack.siblingFeesPayer || body['familyBackground[siblingFeesPayer]'] || ''
            },

            admissionJustification: {
                applicationStream: justify.applicationStream || body['admissionJustification[applicationStream]'] || '',
                explanationText: justify.explanationText || body['admissionJustification[explanationText]'] || undefined,
                signeeName: justify.signeeName || body['admissionJustification[signeeName]'] || undefined,
                signeeOccupation: justify.signeeOccupation || body['admissionJustification[signeeOccupation]'] || '',
                signeeAddress: justify.signeeAddress || body['admissionJustification[signeeAddress]'] || '',
                signeeMobile: justify.signeeMobile || body['admissionJustification[signeeMobile]'] || undefined,
                signeeEmail: justify.signeeEmail || body['admissionJustification[signeeEmail]'] || '',
                relationshipToApplicant: justify.relationshipToApplicant || body['admissionJustification[relationshipToApplicant]'] || undefined
            },

            legalDeclaration: {
                hasCertifiedTrueData: legal.hasCertifiedTrueData === 'true' || legal.hasCertifiedTrueData === true || body['legalDeclaration[hasCertifiedTrueData]'] === 'true',
                signatureName: legal.signatureName || body['legalDeclaration[signatureName]'] || undefined,
                signedAt: legal.verifiedAt ? new Date(legal.verifiedAt) : new Date()
            },

            documentAttachments: {
                passportPhotoPath: req.files?.passportPhotoFile?.[0]?.path || '',
                birthCertPath: req.files?.birthCertFile?.[0]?.path || '',
                fatherIdPath: req.files?.fatherIdFile?.[0]?.path || '',
                motherIdPath: req.files?.motherIdFile?.[0]?.path || '',
                fatherPayslipPath: req.files?.fatherPayslipFile?.[0]?.path || '',
                motherPayslipPath: req.files?.motherPayslipFile?.[0]?.path || '',
                fatherBusinessPath: req.files?.fatherBusinessFile?.[0]?.path || '',
                motherBusinessPath: req.files?.motherBusinessFile?.[0]?.path || '',
                fatherTitleDeedPath: req.files?.fatherTitleDeedFile?.[0]?.path || '',
                motherTitleDeedPath: req.files?.motherTitleDeedFile?.[0]?.path || '',
                fatherDeathCertPath: req.files?.fatherDeathCertFile?.[0]?.path || '',
                motherDeathCertPath: req.files?.motherDeathCertFile?.[0]?.path || '',
                guardianshipProofPath: req.files?.guardianshipProofFile?.[0]?.path || ''
            }
        };

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

        const newApplication = new Application(reconstructedPayload);
        const savedApplication = await newApplication.save();
        
        return res.status(201).json({
            success: true,
            message: 'Application recorded successfully to Starehe Servers! Welcome to the Starehe Community. 💾',
            applicationId: savedApplication._id
        });

    } catch (error) {
        console.error('Starehe Database transaction failure:', error);
        return res.status(400).json({ 
            success: false, 
            message: 'Application submission validation failed.', 
            error: error.message 
        });
    }
});

module.exports = router;