import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [view, setView] = useState('landing');
  const [serverStatus, setServerStatus] = useState("Connecting to Brain...");

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

  const handleSelectChange = (index, field, value) => {
    const newSelections = [...selections];
    newSelections[index][field] = value;
    if (field === 'pathway') newSelections[index].track = '';
    setSelections(newSelections);
    setFormData(prev => ({ ...prev, finalChoices: newSelections }));
  };

  useEffect(() => {
    fetch('http://localhost:5000/api/status')
      .then(res => res.json())
      .then(data => setServerStatus(data.message))
      .catch(() => setServerStatus("Backend Offline ❌"));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  if (view === 'landing') {
    return (
      <section id="center">

        {/* Starehe Apply Logo*/}
        <div className="logo-fan-container">
          <img src="/images_starehe/sgc_logo.png" alt="SGC Logo" className="logo-card sgc-card" />
          <img src="/images_starehe/sbc_logo.jfif" alt="SBC Logo" className="logo-card sbc-card" />
        </div>
        <header className="portal-header">
  <h1 className="portal-title">Starehe Admissions Portal</h1>
  
  {serverStatus && <p className="status-text">{serverStatus}</p>}
  <p className="portal-subtitle">Welcome to the Starehe Admissions Portal</p>
  <hr className="header-divider" />
</header>
        <div className="card">
          <p>Select an institution to begin:</p>
          <button className="btn-sbc" onClick={() => setView('sbc')}>Starehe Boys' Centre</button>
          <button className="btn-sgc" onClick={() => setView('sgc')}>Starehe Girls' Centre</button>
        </div>

      </section>
    );
  }

  return (
    <section id="center">
      <button className="back-btn" onClick={() => setView('landing')}>← Back to Selection</button>

      <div className={`portal-container ${view}`}>
  <div className="portal-branding">
    <img 
      src={view === 'sbc' ? "/images_starehe/sbc_logo.jfif" : "/images_starehe/sgc_logo.png"} 
      alt="Institutional Logo" 
      className="portal-logo" 
    />
    <div className="portal-header-text">
      <h2>{view === 'sbc' ? "SBC Application Portal" : "SGC Application Portal"}</h2>
      <span className="motto-tag">
        {view === 'sbc' ? "Natulenge Juu" : "Elimu Yetu, Nguvu Yetu"}
      </span>
    </div>
  </div>

  <div className="mission-box">
    <p className="mission-text">
      <strong>Our Mission:</strong> {view === 'sbc' 
        ? "To provide care and education for boys in need and inspire them to transform into productive and exemplary members of society." 
        : "To provide care and education for girls in need and inspire them to transform into productive and exemplary members of society."}
    </p>
  </div>
</div>

      <div className="form-content">
        <h3>Part I: Details of the {view === 'sbc' ? 'Boy' : 'Girl'}</h3>

        <form className="form-grid" onSubmit={(e) => {
  e.preventDefault();
  // Include the pathway selections in the final submission
  const finalSubmission = { ...formData, pathwayChoices: selections };
  console.log("Final Data:", finalSubmission);
  alert("Application Submitted Successfully!");
}}>

  {/* SECTION 1: PERSONAL IDENTITY */}
  <fieldset className="form-section">
    <legend>I. Student Identity</legend>
    <div className="input-row">
      <div className="input-group">
        <label>First Name*</label>
        <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="e.g., Alex" required />
      </div>
      <div className="input-group">
        <label>Middle Name(s)</label>
        <input type="text" name="middleName" value={formData.middleName} onChange={handleInputChange} placeholder="e.g., Morgan" />
      </div>
      <div className="input-group">
        <label>Last Name (Surname)*</label>
        <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="e.g., Jordan" required />
      </div>
    </div>
    
    <div className="input-row">
      <div className="input-group">
        <label>Date of Birth*</label>
        <input type="date" name="dob" value={formData.dob} onChange={handleInputChange} required />
      </div>
      <div className="input-group">
        <label>Religion*</label>
        <select name="religion" value={formData.religion} onChange={handleInputChange} required>
          <option value="">Select Religion</option>
          <option value="Christian">Christian</option>
          <option value="Muslim">Muslim</option>
          <option value="Hindu">Hindu</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="input-group">
        <label>Nationality*</label>
        <input type="text" name="nationality" value={formData.nationality} onChange={handleInputChange} placeholder="e.g., Kenyan" required />
      </div>
    </div>
  </fieldset>

  {/* SECTION 2: OFFICIAL IDENTIFICATION */}
  <fieldset className="form-section">
    <legend>II. Government & Exam Identification</legend>
    <div className="input-row">
      <div className="input-group">
        <label>Birth Certificate No*</label>
        <input type="text" name="birthCertNo" value={formData.birthCertNo} onChange={handleInputChange} placeholder="e.g., 12345678" required />
      </div>
      <div className="input-group">
        <label>NEMIS UPI Number*</label>
        <input type="text" name="nemisUpiNo" value={formData.nemisUpiNo} onChange={handleInputChange} placeholder="e.g., ABC123D" required />
      </div>
    </div>
    <div className="input-row">
      <div className="input-group">
        <label>Assessment Number*</label>
        <input type="text" name="assessmentNo" value={formData.assessmentNo} onChange={handleInputChange} placeholder="e.g., 600001001" required />
      </div>
      <div className="input-group">
        <label>School KNEC Code*</label>
        <input type="text" name="schoolKnecCode" value={formData.schoolKnecCode} onChange={handleInputChange} placeholder="e.g., 20401001001" required />
      </div>
    </div>
  </fieldset>

  {/* SECTION 3: ACADEMIC BACKGROUND */}
  <fieldset className="form-section">
    <legend>III. Academic Background & Location</legend>
    <div className="input-group full-width">
      <label>Junior School*</label>
      <input type="text" name="juniorSchool" value={formData.juniorSchool} onChange={handleInputChange} placeholder="Current School Name" required />
    </div>
    <div className="input-row">
      <div className="input-group">
        <label>Sub-county*</label>
        <input type="text" name="subCounty" value={formData.subCounty} onChange={handleInputChange} placeholder="e.g., Westlands" required />
      </div>
      <div className="input-group">
        <label>County*</label>
        <input type="text" name="county" value={formData.county} onChange={handleInputChange} placeholder="e.g., Nairobi" required />
      </div>
    </div>
  </fieldset>

  {/* SECTION 4: PATHWAY SELECTION */}
  <fieldset className="form-section pathway-selection">
    <legend>IV. Pathway & Track Priorities</legend>
    <div className="info-box">
      <strong>Core Subjects:</strong> English, Kiswahili, Physical Education, and Community Service Learning
    </div>

    {selections.map((item, index) => (
      <div key={index} className="choice-box">
        <h4 className="choice-title">Choice #{item.choice}</h4>
        <div className="selection-row">
          <select
            value={item.pathway}
            onChange={(e) => handleSelectChange(index, 'pathway', e.target.value)}
            className="form-input" required
          >
            <option value="">-- Select Pathway --</option>
            <option value="STEM">STEM</option>
            <option value="Social Sciences">Social Sciences</option>
            <option value="Arts & Sports Science">Arts & Sports Science</option>
          </select>

          {item.pathway && (
            <select
              value={item.track}
              onChange={(e) => handleSelectChange(index, 'track', e.target.value)}
              className="form-input" required
            >
              <option value="">-- Select Track --</option>
              {tracks[item.pathway].map(t => (
                <option key={t.id} value={t.name}>{t.name}</option>
              ))}
            </select>
          )}
        </div>
      </div>
    ))}
  </fieldset>

  {/* SECTION 5: APPLICATION LOGIC */}
  <fieldset className="form-section">
    <legend>V. Application Type</legend>
    <div className="input-group">
      <label>Admission Category*</label>
      <select name="applicationType" value={formData.applicationType} onChange={handleInputChange} required>
        <option value="Standard">Grade 10 Entry</option>
        <option value="Transfer">Transfer Student</option>
      </select>
    </div>

    {formData.applicationType === 'Transfer' && (
      <div className="transfer-logic animate-in">
        <div className="input-group">
          <label>Current Grade*</label>
          <select name="currentGrade" value={formData.currentGrade} onChange={handleInputChange} required>
            <option value="">-- Select Grade --</option>
            <option value="Grade 10">Grade 10</option>
            <option value="Grade 11">Grade 11</option>
          </select>
        </div>
        <div className="input-group">
          <label>Reason for Transfer*</label>
          <textarea
            name="transferReason"
            value={formData.transferReason}
            onChange={handleInputChange}
            placeholder="Explain briefly..."
            required
          />
        </div>
      </div>
    )}
  </fieldset>

  <button type="submit" className="submit-btn">Submit Application</button>
</form>
      </div>
    </section>
  );
}

export default App;