import { useState, useEffect } from 'react';
import './App.css';
// === IMPORT PATHS FIXED & VERIFIED ===
import Header from './components/Header';
import Footer from './components/Footer';
import Personal from './components/Personal';
import Academics from './components/Academics';
import Pathway from './components/Pathway';
import Family from './components/Family';
import Review from './components/Review';

function App() {
  // ===  THE STATE ENGINE MANAGEMENT ===
  const [view, setView] = useState('landing'); // Modes: 'landing', 'sbc', 'sgc'
  const [currentStep, setCurrentStep] = useState(0);        // Controls multi-step workflow pagination (1-5)
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
    county: '',
    religion: '',
    nationality: '',
    applicationType: 'Standard',
    transferReason: '',
    currentGrade: 'Grade 9'
  });

  // Multi-choice priority selection map
  const [selections, setSelections] = useState([
    { choice: 1, pathway: '', track: '' },
    { choice: 2, pathway: '', track: '' },
    { choice: 3, pathway: '', track: '' }
  ]);

  // Pathway Track Lookups
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
  // Master definitions array - Add or reorder here anytime!
  const FORM_STEPS = [
    { id: 'personal', title: 'Personal Identity', component: Personal },
    { id: 'academics', title: 'Academic Background', component: Academics },
    { id: 'pathway', title: 'Pathway Priorities', component: Pathway },
    { id: 'family', title: 'Family Information', component: Family },
    // Future additions seamlessly slot in right here:
    // { id: 'activities',title: 'Co-Curricular Talents',   component: Activities },
    // { id: 'checklist', title: 'Document Verification',   component: Checklist },
    { id: 'review', title: 'Final Declaration', component: Review }
  ];
  // Automatically snaps viewports safely to the top header on layout view state step switches
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [currentStep, view]);
  // Run health-check ping to local Express backend on component mount
  useEffect(() => {
    fetch('https://starehe-admissions-portal.onrender.com/api/status')
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
      if (field === 'pathway') updated[index].track = ''; // Reset child choice
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
      setView('landing'); // Dropping back to selection if retreating past Step 1
    }
  };

  // Compiles partial datasets and executes a POST request into MongoDB Atlas via Render
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("🚀 Initializing live document payload submission sequence...");

    const submissionPayload = {
      ...formData,
      institutionType: view === 'sbc' ? "Starehe Boys' Centre" : "Starehe Girls' Centre", // Maps to your required field
    legalDeclaration: {
      signOff: true, // Confirms the legal declaration check to the backend
      verifiedAt: new Date()
    },
      pathwayChoices: selections
    };

    try {
      const response = await fetch('https://starehe-admissions-portal.onrender.com/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(submissionPayload)
      });

      const result = await response.json();

      if (response.ok) {
        console.log("🎯 Cloud Synced Successfully! Entry reference saved to database:", result);
        alert(`Application successfully secured in the MongoDB Atlas Cloud! Portal Frame Context: ${view.toUpperCase()}`);
        setView('landing');
        setCurrentStep(0);
      } else {
        console.error("❌ Database validation engine bounced the record:", result);
        alert(`Backend Refusal: ${result.message || "Check your console logs for structure errors."}`);
      }
    } catch (error) {
      console.error("💥 Network interface failure contacting Render engine:", error);
      alert("Pipeline Error: Failed to broadcast data packet over the network to Render.");
    }
  };

  // Active step processing switch helper
  const ActiveStepComponent = FORM_STEPS[currentStep].component;

  return (
    <div className="app-layout">
      <Header view={view} serverStatus={serverStatus} />

      {view !== 'landing' && (
        <main id="center">

          {/* CONTROL LABELS ONLY HANDLED HERE — NO REPETITIONS! */}
          <div className="progress-metadata-bar">
            <span className="step-badge">Step {currentStep + 1} of {FORM_STEPS.length}</span>
            <h2 className="step-main-title">{FORM_STEPS[currentStep].title}</h2>
          </div>

          {/* Active Wizard Step Panel */}
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

      {/* Landing page choice container if no portal context is selected */}
      {view === 'landing' && (
        <section id="center" className="landing-selection-card">
          <p>Select an institution to begin your application:</p>
          <div className="button-group">
            <button className="btn-sbc" onClick={() => { setView('sbc'); setCurrentStep(0); }}>
              Starehe Boys' Centre
            </button>
            <button className="btn-sgc" onClick={() => { setView('sgc'); setCurrentStep(0); }}>
              Starehe Girls' Centre
            </button>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}

export default App;