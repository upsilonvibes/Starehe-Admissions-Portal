// src/App.js
import React, { useState, useEffect, createRef } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Landing from './components/Landing'; 
import Personal from './components/Personal';
import Academics from './components/Academics';
import Pathway from './components/Pathway';
import Family from './components/Family';
import Recommendations from './components/Recommendations'; // ✅ Imported your real component
import Review from './components/Review';

// ==========================================
// DETERMINISTIC UNIFIED TRACKING GENERATOR
// ==========================================
const generateCleanReferenceId = () => {
  // Returns a strict 6-digit tracking digit string (e.g., "739201")
  return String(Math.floor(100000 + Math.random() * 900000));
};

function App() {
  // === THE STATE ENGINE MANAGEMENT ===
  const [view, setView] = useState('landing');
  const [currentStep, setCurrentStep] = useState(0);
  const [serverStatus, setServerStatus] = useState("Connecting to Brain...");

  // Form identity state initialization
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    dob: '',
    birthCertNo: '',
    nemisUpiNo: '',
    assessmentNo: '',
    schoolKnecCode: '',
    juniorSchool: '',
    subCounty: '',
    schoolCounty: '',
    schoolSubCounty: '',
    county: '',
    religion: '',
    nationality: '',
    applicationType: 'Standard',
    transferReason: '',
    currentGrade: 'Grade 9',
    isFirstTimeApplication: 'Yes',
    reapplicationReason: '',
    passportPhotoFile: null,
    birthCertFile: null,

    // ✅ FIXED CORE SYSTEM IDENTIFIER
    id: '', 

    // Parent Structure Fields
    fatherName: '', fatherStatus: 'Alive', fatherMarital: '', fatherNationality: 'Kenyan', fatherIdNo: '', fatherEmployment: '', fatherBusiness: '', fatherLand: '', fatherOtherIncome: '', fatherMonthlyIncome: 0, fatherAddress: '', fatherHouse: '',
    motherName: '', motherStatus: 'Alive', motherMarital: '', motherNationality: 'Kenyan', motherIdNo: '', motherEmployment: '', motherBusiness: '', motherLand: '', motherOtherIncome: '', motherMonthlyIncome: 0, motherAddress: '', motherHouse: '',

    // Sibling Metadata Arrays
    siblingFeesPayer: '',

    // Narrative & Sign-off Block
    applicationStream: '', 
    justifycationText: '',
    familySigneeName: '',
    familySigneeOccupation: '',
    familySigneeAddress: '',
    familySigneeMobile: '',
    familySigneeEmail: '',
    familyRelationship: '',
    hasAdoptedSignature: false, 

    // Verification Asset File Objects
    fatherIdFile: null, 
    motherIdFile: null, 
    fatherPayslipFile: null, 
    motherPayslipFile: null, 
    fatherBusinessFile: null, 
    motherBusinessFile: null, 
    fatherTitleDeedFile: null, 
    motherTitleDeedFile: null, 
    fatherDeathCertFile: null, 
    motherDeathCertFile: null,
    guardianshipProofFile: null, 
    
    // NEW ACADEMIC UPLOAD TARGETS
    kpseaResultSlipFile: null,
    juniorSchoolTranscriptFile: null,

    // ✅ NEW RECOMMENDATIONS & REFERENCES STATE FIELDS
    chiefName: '',
    chiefPhysicalAddress: '',
    chiefMobile: '',
    chiefOfficeTel: '',
    chiefDate: '',
    chiefComments: '',
    chiefRecommendationFile: null,

    religiousLeaderName: '',
    religiousLeaderAddress: '',
    religiousLeaderMobile: '',
    religiousLeaderOfficeTel: '',
    religiousLeaderDate: '',
    religiousLeaderComments: '',
    religiousLeaderRecommendationFile: null,

    headteacherFinancialRecommendation: '',
    headteacherName: '',
    headteacherMobile: '',
    headteacherDate: '',
    headteacherAcademicRemarks: '',
    headteacherCoCurricularRemarks: '',
    headteacherDisciplineRemarks: '',
    headteacherGeneralComments: '',
    headteacherRecommendationFile: null
  });

  // Structural References for Native Input Targeting
  const fileInputRefs = {
    passportPhotoFile: createRef(),
    birthCertFile: createRef(),
    fatherIdFile: createRef(),
    motherIdFile: createRef(),
    fatherPayslipFile: createRef(),
    motherPayslipFile: createRef(),
    fatherBusinessFile: createRef(),
    motherBusinessFile: createRef(),
    fatherTitleDeedFile: createRef(),
    motherTitleDeedFile: createRef(),
    fatherDeathCertFile: createRef(),
    motherDeathCertFile: createRef(),
    guardianshipProofFile: createRef(),
    kpseaResultSlipFile: createRef(),
    juniorSchoolTranscriptFile: createRef(),
    
    // ✅ NEW TRANSCRIPTION ATTACHMENT REFERENCES
    chiefRecommendationFile: createRef(),
    religiousLeaderRecommendationFile: createRef(),
    headteacherRecommendationFile: createRef()
  };

  // Dynamic array table tracking hook for dynamic sibling entries
  const [siblingsList, setSiblingsList] = useState([
    { name: '', gender: '', age: '', schoolOrOccupation: '', incomeOrFeesPaid: '' }
  ]);

  const handleSelectSchoolTrack = (trackCode) => {
    const systemCode = trackCode.toUpperCase();
    const autoGender = systemCode === 'SGC' ? 'Female' : 'Male';

    setView(trackCode);
    setCurrentStep(0);

    setFormData((prev) => ({
      ...prev,
      institutionType: systemCode,
      gender: autoGender,
      // Map view identifier back down cleanly into state targets
      selectedSchool: systemCode 
    }));
  };

  const [selections, setSelections] = useState([
    { choice: 1, pathway: '', track: '' },
    { choice: 2, pathway: '', track: '' },
    { choice: 3, pathway: '', track: '' }
  ]);

  const tracks = {
    'STEM': [
      { id: 'pure', name: 'Pure Sciences (Mathematics, Physics, Chemistry, Biology)' },
      { id: 'applied', name: 'Applied Sciences (Agriculture, Home Science, Computer Science)' }
    ],
    'Social Sciences': [
      { id: 'lang', name: 'Languages (Literature in English, Kiswahili/Fasihi, French, German)' },
      { id: 'biz', name: 'Humanities & Business Studies (History, Geography, CRE/IRE, Business)' }
    ],
    'Arts & Sports Science': [
      { id: 'arts', name: 'Performing Arts (Music & Dance, Fine Art, Theatre & Film)' },
      { id: 'sports', name: 'Sports Science (Physical Education, Sports & Recreation)' }
    ]
  };

  const FORM_STEPS = [
    { id: 'personal', title: 'Personal Identity', component: Personal },
    { id: 'academics', title: 'Academic Background', component: Academics },
    { id: 'pathway', title: 'Pathway Priorities', component: Pathway },
    { id: 'family', title: 'Family Information', component: Family },
    { id: 'recommendations', title: 'Recommendations & References', component: Recommendations }, 
    { id: 'review', title: 'Final Declaration', component: Review } 
  ];

  // Global window tracking hook
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [currentStep, view]);

  // Backend sync engine connectivity hook
  useEffect(() => {
    fetch('http://localhost:5000/api/status')
      .then(res => res.json())
      .then(data => setServerStatus(data.message))
      .catch(() => setServerStatus("Backend Offline ❌"));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    }
  };

  const triggerFileSelect = (inputName) => {
    if (fileInputRefs[inputName] && fileInputRefs[inputName].current) {
      fileInputRefs[inputName].current.click();
    }
  };

  const handleSelectChange = (index, field, value) => {
    setSelections(prev => {
      const updated = [...prev];
      updated[index][field] = value;
      if (field === 'pathway') updated[index].track = '';
      return updated;
    });
  };

  const handleNext = () => {
    setFormData(prev => ({
      ...prev,
      selections: selections,
      siblings: siblingsList
    }));
    
    if (currentStep < FORM_STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
    
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    } else {
      setView('landing');
    }
  };

  // ==================================================
  // ✅ SYNCHRONIZED CENTRAL PRINT HANDLER HOOK
  // ==================================================
  const handlePrintFormWithLock = (templateGeneratorFunc) => {
    let uniqueId = formData.id;

    // Enforce instant generation to trap matching 6-digit keys early
    if (!uniqueId) {
      uniqueId = generateCleanReferenceId();
      setFormData(prev => ({
        ...prev,
        id: uniqueId
      }));
    }

    // Explicit payload override protects against state batching asynchronous delays
    const targetedHtmlString = templateGeneratorFunc({ ...formData, id: uniqueId });

    const printWindow = window.open('', '_blank');
    printWindow.document.open();
    printWindow.document.write(targetedHtmlString);
    printWindow.document.close();

    printWindow.onload = function() {
      printWindow.print();
    };
  };

  const handleFormSubmit = async (e) => {
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
    }

    let uniqueId = formData.id;
    if (!uniqueId) {
      uniqueId = generateCleanReferenceId();
      setFormData(prev => ({ ...prev, id: uniqueId }));
    }

    const payload = new FormData();
    
    payload.append('applicationId', uniqueId);
    payload.append('institutionType', view === 'sbc' ? "SBC" : "SGC");
    payload.append('personalInfo[fullName]', `${formData.firstName} ${formData.middleName || ''} ${formData.lastName}`.trim());
    payload.append('personalInfo[dateOfBirth]', formData.dob);
    payload.append('personalInfo[birthCertificateNumber]', formData.birthCertNo);
    payload.append('personalInfo[gender]', formData.gender);
    payload.append('personalInfo[nemisUPI]', formData.nemisUpiNo);
    payload.append('personalInfo[assessmentNumber]', formData.assessmentNo);
    payload.append('personalInfo[religion]', formData.religion);
    payload.append('personalInfo[nationality]', formData.nationality);
    payload.append('personalInfo[subCounty]', formData.subCounty);
    payload.append('personalInfo[county]', formData.county);
    payload.append('personalInfo[isFirstTimeApplication]', formData.isFirstTimeApplication);
    payload.append('personalInfo[reapplicationReason]', formData.isFirstTimeApplication === 'No' ? formData.reapplicationReason : "");

    const checkIsTransfer = formData.applicationType === 'Transfer';
    payload.append('personalInfo[isTransferStudent]', checkIsTransfer);
    payload.append('personalInfo[transferDetails][currentGrade]', checkIsTransfer ? formData.currentGrade : "");
    payload.append('personalInfo[transferDetails][reasonForTransfer]', checkIsTransfer ? formData.transferReason : "");

    payload.append('academicBackground[juniorSchool]', formData.juniorSchool || "");
    payload.append('academicBackground[schoolCounty]', formData.schoolCounty || "");
    payload.append('academicBackground[schoolSubCounty]', formData.schoolSubCounty || "");
    payload.append('academicBackground[yearCompleted]', formData.yearCompleted || new Date().getFullYear());

    payload.append('pathwayChoices[choice1][pathwayName]', selections[0]?.pathway || "");
    payload.append('pathwayChoices[choice1][trackName]', selections[0]?.track || "");
    payload.append('pathwayChoices[choice2][pathwayName]', selections[1]?.pathway || "");
    payload.append('pathwayChoices[choice2][trackName]', selections[1]?.track || "");
    payload.append('pathwayChoices[choice3][pathwayName]', selections[2]?.pathway || "");
    payload.append('pathwayChoices[choice3][trackName]', selections[2]?.track || "");

    payload.append('familyBackground[father][fullName]', formData.fatherName);
    payload.append('familyBackground[father][status]', formData.fatherStatus);
    payload.append('familyBackground[father][maritalStatus]', formData.fatherMarital);
    payload.append('familyBackground[father][nationality]', formData.fatherNationality);
    payload.append('familyBackground[father][nationalIdNo]', formData.fatherIdNo);
    payload.append('familyBackground[father][employmentDetails]', formData.fatherEmployment);
    payload.append('familyBackground[father][businessDetails]', formData.fatherBusiness);
    payload.append('familyBackground[father][landAssets]', formData.fatherLand);
    payload.append('familyBackground[father][otherIncomeSource]', formData.fatherOtherIncome);
    payload.append('familyBackground[father][averageMonthlyIncome]', formData.fatherMonthlyIncome);
    payload.append('familyBackground[father][physicalAddress]', formData.fatherAddress);
    payload.append('familyBackground[father][houseOwnership]', formData.fatherHouse);

    payload.append('familyBackground[mother][fullName]', formData.motherName);
    payload.append('familyBackground[mother][status]', formData.motherStatus);
    payload.append('familyBackground[mother][maritalStatus]', formData.motherMarital);
    payload.append('familyBackground[mother][nationality]', formData.motherNationality);
    payload.append('familyBackground[mother][nationalIdNo]', formData.motherIdNo);
    payload.append('familyBackground[mother][employmentDetails]', formData.motherEmployment);
    payload.append('familyBackground[mother][businessDetails]', formData.motherBusiness);
    payload.append('familyBackground[mother][landAssets]', formData.motherLand);
    payload.append('familyBackground[mother][otherIncomeSource]', formData.motherOtherIncome);
    payload.append('familyBackground[mother][averageMonthlyIncome]', formData.motherMonthlyIncome);
    payload.append('familyBackground[mother][physicalAddress]', formData.motherAddress);
    payload.append('familyBackground[mother][houseOwnership]', formData.motherHouse);

    payload.append('familyBackground[siblings]', JSON.stringify(siblingsList));
    payload.append('familyBackground[siblingFeesPayer]', formData.siblingFeesPayer);

    payload.append('recommendations[chief][name]', formData.chiefName);
    payload.append('recommendations[chief][physicalAddress]', formData.chiefPhysicalAddress);
    payload.append('recommendations[chief][mobile]', formData.chiefMobile);
    payload.append('recommendations[chief][officeTel]', formData.chiefOfficeTel);
    payload.append('recommendations[chief][dateSigned]', formData.chiefDate);
    payload.append('recommendations[chief][comments]', formData.chiefComments);

    payload.append('recommendations[religiousLeader][name]', formData.religiousLeaderName);
    payload.append('recommendations[religiousLeader][address]', formData.religiousLeaderAddress);
    payload.append('recommendations[religiousLeader][mobile]', formData.religiousLeaderMobile);
    payload.append('recommendations[religiousLeader][officeTel]', formData.religiousLeaderOfficeTel);
    payload.append('recommendations[religiousLeader][dateSigned]', formData.religiousLeaderDate);
    payload.append('recommendations[religiousLeader][comments]', formData.religiousLeaderComments);

    payload.append('recommendations[headteacher][financialStatusCertification]', formData.headteacherFinancialRecommendation);
    payload.append('recommendations[headteacher][name]', formData.headteacherName);
    payload.append('recommendations[headteacher][mobile]', formData.headteacherMobile);
    payload.append('recommendations[headteacher][dateSigned]', formData.headteacherDate);
    payload.append('recommendations[headteacher][academicRemarks]', formData.headteacherAcademicRemarks);
    payload.append('recommendations[headteacher][coCurricularRemarks]', formData.headteacherCoCurricularRemarks);
    payload.append('recommendations[headteacher][disciplineRemarks]', formData.headteacherDisciplineRemarks);
    payload.append('recommendations[headteacher][generalComments]', formData.headteacherGeneralComments);

    payload.append('admissionJustification[applicationStream]', formData.applicationStream);
    payload.append('admissionJustification[explanationText]', formData.justificationText);
    payload.append('admissionJustification[signeeName]', formData.familySigneeName);
    payload.append('admissionJustification[signeeOccupation]', formData.familySigneeOccupation);
    payload.append('admissionJustification[signeeAddress]', formData.familySigneeAddress);
    payload.append('admissionJustification[signeeMobile]', formData.familySigneeMobile);
    payload.append('admissionJustification[signeeEmail]', formData.familySigneeEmail);
    payload.append('admissionJustification[relationshipToApplicant]', formData.familyRelationship);

    payload.append('legalDeclaration[hasCertifiedTrueData]', formData.hasAdoptedSignature);
    payload.append('legalDeclaration[signatureName]', formData.familySigneeName || "");
    payload.append('legalDeclaration[verifiedAt]', new Date().toISOString());

    if (formData.passportPhotoFile) payload.append('passportPhotoFile', formData.passportPhotoFile);
    if (formData.birthCertFile) payload.append('birthCertFile', formData.birthCertFile);
    if (formData.fatherIdFile) payload.append('fatherIdFile', formData.fatherIdFile);
    if (formData.motherIdFile) payload.append('motherIdFile', formData.motherIdFile);
    if (formData.fatherPayslipFile) payload.append('fatherPayslipFile', formData.fatherPayslipFile);
    if (formData.motherPayslipFile) payload.append('motherPayslipFile', formData.motherPayslipFile);
    if (formData.fatherBusinessFile) payload.append('fatherBusinessFile', formData.fatherBusinessFile);
    if (formData.motherBusinessFile) payload.append('motherBusinessFile', formData.motherBusinessFile);
    if (formData.fatherTitleDeedFile) payload.append('fatherTitleDeedFile', formData.fatherTitleDeedFile);
    if (formData.motherTitleDeedFile) payload.append('motherTitleDeedFile', formData.motherTitleDeedFile);
    if (formData.fatherDeathCertFile) payload.append('fatherDeathCertFile', formData.fatherDeathCertFile);
    if (formData.motherDeathCertFile) payload.append('motherDeathCertFile', formData.motherDeathCertFile);
    if (formData.guardianshipProofFile) payload.append('guardianshipProofFile', formData.guardianshipProofFile);
    if (formData.kpseaResultSlipFile) payload.append('kpseaResultSlipFile', formData.kpseaResultSlipFile);
    if (formData.juniorSchoolTranscriptFile) payload.append('juniorSchoolTranscriptFile', formData.juniorSchoolTranscriptFile);

    if (formData.chiefRecommendationFile) payload.append('chiefRecommendationFile', formData.chiefRecommendationFile);
    if (formData.religiousLeaderRecommendationFile) payload.append('religiousLeaderRecommendationFile', formData.religiousLeaderRecommendationFile);
    if (formData.headteacherRecommendationFile) payload.append('headteacherRecommendationFile', formData.headteacherRecommendationFile);

    try {
      const response = await fetch('http://localhost:5000/api/applications', {
        method: 'POST',
        body: payload
      });
      const result = await response.json();

      if (response.ok) {
        const explicitTargetCentre = view === 'sbc' ? "Starehe Boys' Centre" : "Starehe Girls' Centre";
        const targetYear = new Date().getFullYear();
        const prefixCode = view === 'sbc' ? "SBC-ADM-" : "SGC-ADM-";
        
        alert(`🎉 Success! Application Submitted Successfully!\n\nYour application packet has been logged on the network by ${explicitTargetCentre}.\n\nTracking Reference ID: ${prefixCode}${targetYear}-REF-${uniqueId}`);
        
        setView('landing');
        setCurrentStep(0);
        setFormData(prev => ({ ...prev, id: '' }));
      } else {
        alert(`❌ Submission Rejected: ${result.message || 'Validation Failure'}`);
      }
    } catch (error) {
      alert("Pipeline Error: Failed to broadcast data packet over the network.");
    }
  };

  const ActiveStepComponent = FORM_STEPS[currentStep].component;

  return (
    <div className="app-layout">
      <Header view={view} />

      {view === 'landing' ? (
        <Landing
          serverStatus={serverStatus}
          onSelectTrack={handleSelectSchoolTrack}
        />
      ) : (
        /* ✅ Data theme binds cleanly right here, isolating color variables strictly to the active forms */
        <main id="center" data-theme={view}>
          <div className="progress-metadata-bar">
            <span className="step-badge">Step {currentStep + 1} of {FORM_STEPS.length}</span>
            <h2 className="step-main-title">{FORM_STEPS[currentStep].title}</h2>
          </div>

          <ActiveStepComponent
            formData={formData}
            handleInputChange={handleInputChange}
            handleFileChange={handleFileChange}
            fileInputRefs={fileInputRefs}
            triggerFileSelect={triggerFileSelect}
            selections={selections}
            tracks={tracks}
            handleSelectChange={handleSelectChange}
            view={view}
            siblingsList={siblingsList}
            setSiblingsList={setSiblingsList}
            onNext={handleNext}
            onBack={handleBack}
            onSubmit={handleFormSubmit}
            prevStep={handleBack}
            nextStep={handleNext}
            handleDownload={handlePrintFormWithLock}
          />
        </main>
      )}

      <Footer />
    </div>
  );
}

export default App;