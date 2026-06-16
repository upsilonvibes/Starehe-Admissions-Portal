import React, { useState, useEffect, createRef } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Landing from './components/Landing'; 
import Personal from './components/Personal';
import Academics from './components/Academics';
import Pathway from './components/Pathway';
import Family from './components/Family';
import Review from './components/Review';

// temporary baseline placeholder component for the recommendations layout
const RecommendationsPlaceholder = ({ onNext, onBack }) => (
  <div className="form-section placeholder-card">
    <h3>Recommendations & References Section</h3>
    <p style={{ margin: '15px 0', color: '#666' }}>
      [This section will contain official structural validation input logs, Primary School Headteacher recommendations, and regional Chief/Ministerial certificates.]
    </p>
    <div className="form-actions-container split-buttons" style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
      <button type="button" className="back-btn" onClick={onBack}>← Back</button>
      <button type="button" className="next-btn" onClick={onNext}>Next: Final Declaration →</button>
    </div>
  </div>
);

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

    // Parent Structure Fields
    fatherName: '', fatherStatus: 'Alive', fatherMarital: '', fatherNationality: 'Kenyan', fatherIdNo: '', fatherEmployment: '', fatherBusiness: '', fatherLand: '', fatherOtherIncome: '', fatherMonthlyIncome: 0, fatherAddress: '', fatherHouse: '',
    motherName: '', motherStatus: 'Alive', motherMarital: '', motherNationality: 'Kenyan', motherIdNo: '', motherEmployment: '', motherBusiness: '', motherLand: '', motherOtherIncome: '', motherMonthlyIncome: 0, motherAddress: '', motherHouse: '',

    // Sibling Metadata Arrays
    siblingFeesPayer: '',

    // Narrative & Sign-off Block
    applicationStream: '', // Safely added to catch stream types
    justificationText: '',
    familySigneeName: '',
    familySigneeOccupation: '',
    familySigneeAddress: '',
    familySigneeMobile: '',
    familySigneeEmail: '',
    familyRelationship: '',
    hasAdoptedSignature: false, // Explicitly tracks signature checkbox binding

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
    guardianshipProofFile: null, // FIXED: Added to fully catch field data from Section D layout
    
    // NEW ACADEMIC UPLOAD TARGETS
    kpseaResultSlipFile: null,
    juniorSchoolTranscriptFile: null
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
    juniorSchoolTranscriptFile: createRef()
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
      gender: autoGender
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
      { id: 'lang', name: 'Languages (Literature in English, Fasihi, French, German)' },
      { id: 'biz', name: 'Humanities & Business Studies (History, Geography, CRE/IRE, Business)' }
    ],
    'Arts & Sports Science': [
      { id: 'arts', name: 'Arts (Music & Dance, Fine Art, Theatre & Film)' },
      { id: 'sports', name: 'Sports Science (Physical Education, Sports & Recreation)' }
    ]
  };

  // TWEAK: Expanded to include a 6-step layout system seamlessly
  const FORM_STEPS = [
    { id: 'personal', title: 'Personal Identity', component: Personal },
    { id: 'academics', title: 'Academic Background', component: Academics },
    { id: 'pathway', title: 'Pathway Priorities', component: Pathway },
    { id: 'family', title: 'Family Information', component: Family },
    { id: 'recommendations', title: 'Recommendations & References', component: RecommendationsPlaceholder }, // Step 5 of 6
    { id: 'review', title: 'Final Declaration', component: Review } // Step 6 of 6
  ];

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [currentStep, view]);

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

  const handleFormSubmit = async (e) => {
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
    }

    const payload = new FormData();
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

    // --- FAMILY BACKGROUND FORM DATA EXTRUSION ---
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

    // --- JUSTIFICATION BLOCK EXTRUSION ---
    payload.append('admissionJustification[applicationStream]', formData.applicationStream);
    payload.append('admissionJustification[explanationText]', formData.justificationText);
    payload.append('admissionJustification[signeeName]', formData.familySigneeName);
    payload.append('admissionJustification[signeeOccupation]', formData.familySigneeOccupation);
    payload.append('admissionJustification[signeeAddress]', formData.familySigneeAddress);
    payload.append('admissionJustification[signeeMobile]', formData.familySigneeMobile);
    payload.append('admissionJustification[signeeEmail]', formData.familySigneeEmail);
    payload.append('admissionJustification[relationshipToApplicant]', formData.familyRelationship);

    // --- LEGAL SIGN-OFF SUBMISSION BARRIER ---
    payload.append('legalDeclaration[hasCertifiedTrueData]', formData.hasAdoptedSignature);
    payload.append('legalDeclaration[signatureName]', formData.familySigneeName || "");
    payload.append('legalDeclaration[verifiedAt]', new Date().toISOString());

    // Main structural identification assets 
    if (formData.passportPhotoFile) payload.append('passportPhotoFile', formData.passportPhotoFile);
    if (formData.birthCertFile) payload.append('birthCertFile', formData.birthCertFile);

    // FIXED: Explicit distinctive field keys mapped to guarantee clean backend interception
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
    
    // NEW ACADEMIC ASSET PARSING
    if (formData.kpseaResultSlipFile) payload.append('kpseaResultSlipFile', formData.kpseaResultSlipFile);
    if (formData.juniorSchoolTranscriptFile) payload.append('juniorSchoolTranscriptFile', formData.juniorSchoolTranscriptFile);

    try {
      const response = await fetch('http://localhost:5000/api/applications', {
        method: 'POST',
        body: payload
      });
      const result = await response.json();

      if (response.ok) {
        const explicitTargetCentre = view === 'sbc' ? "Starehe Boys' Centre" : "Starehe Girls' Centre";
        alert(`🎉 Success! Application Submitted Successfully!\n\nYour application has been received by ${explicitTargetCentre}.\nTracking Reference ID: ${result.applicationId || 'SUCCESS-NET'}`);
        setView('landing');
        setCurrentStep(0);
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
        <main id="center">
          <div className="progress-metadata-bar">
            {/* AUTOMATICALLY DYNAMIC: Evaluates step length cleanly to show Step X of 6 */}
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
          />
        </main>
      )}

      <Footer />
    </div>
  );
}

export default App;