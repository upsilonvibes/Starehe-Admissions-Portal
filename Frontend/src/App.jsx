import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Landing from './components/Landing'; // Import our new modular page
import Personal from './components/Personal';
import Academics from './components/Academics';
import Pathway from './components/Pathway';
import Family from './components/Family';
import Review from './components/Review';

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
    schoolCounty:'',
    schoolSubCounty:'',
    county: '',
    religion: '',
    nationality: '',
    applicationType: 'Standard',
    transferReason: '',
    currentGrade: 'Grade 9',
    isFirstTimeApplication: 'Yes', 
    reapplicationReason: '',       
    passportPhotoFile: null,       
    birthCertFile: null
  });

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

  const FORM_STEPS = [
    { id: 'personal', title: 'Personal Identity', component: Personal },
    { id: 'academics', title: 'Academic Background', component: Academics },
    { id: 'pathway', title: 'Pathway Priorities', component: Pathway },
    { id: 'family', title: 'Family Information', component: Family },
    { id: 'review', title: 'Final Declaration', component: Review }
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

    payload.append('legalDeclaration[hasCertifiedTrueData]', true);
    payload.append('legalDeclaration[signatureName]', `${formData.firstName} ${formData.lastName}`.trim());
    payload.append('legalDeclaration[verifiedAt]', new Date().toISOString());

    if (formData.passportPhotoFile) payload.append('passportPhotoFile', formData.passportPhotoFile);
    if (formData.birthCertFile) payload.append('birthCertFile', formData.birthCertFile);

    try {
      const response = await fetch('http://localhost:5000/api/applications', {
        method: 'POST',
        body: payload
      });
      const result = await response.json();

      if (response.ok) {
        const explicitTargetCentre = view === 'sbc' ? "Starehe Boys' Centre" : "Starehe Girls' Centre";
        alert(`🎉 ¡Éxito! Application Submitted Successfully!\n\nYour application has been received by ${explicitTargetCentre}.\nTracking Reference ID: ${result.applicationId || 'SUCCESS-NET'}`);
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
      {/* Renders institutional details only when inside a pathway step */}
      <Header view={view} />

      {view === 'landing' ? (
        <Landing 
          serverStatus={serverStatus} 
          onSelectTrack={handleSelectSchoolTrack} 
        />
      ) : (
        <main id="center">
          <div className="progress-metadata-bar">
            <span className="step-badge">Step {currentStep + 1} of {FORM_STEPS.length}</span>
            <h2 className="step-main-title">{FORM_STEPS[currentStep].title}</h2>
          </div>

          <ActiveStepComponent
            formData={formData}
            handleInputChange={handleInputChange}
            selections={selections}
            tracks={tracks}
            handleSelectChange={handleSelectChange}
            view={view}
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