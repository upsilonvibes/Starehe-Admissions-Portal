import React from 'react';

function Personal({ formData, handleInputChange, onNext, onBack }) {
  
  // Intercept standard form submission to pass handle upwards
  const handleSubmit = (e) => {
    e.preventDefault(); 
    onNext();          
  };

  // Internal helper to handle binary file input changes safely
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (handleInputChange) {
      handleInputChange({
        target: {
          name,
          value: files[0] || null
        }
      });
    }
  };

  // --- Dynamic Headline Generation Logic ---
  const currentYear = new Date().getFullYear();
  const isTransfer = formData.applicationType === 'Transfer';

  // Fallback cleanly to Grade 10 if standard, or current target grade if transfer
  const targetGrade = isTransfer 
    ? (formData.currentGrade || 'Grade 10/11 Target') 
    : 'Grade 10';

  // Standard entry is for next calendar year; transfers are typically for the current academic stream
  const targetYear = isTransfer ? currentYear : currentYear + 1;

  return (
    <form className="form-grid" onSubmit={handleSubmit}>
      
      {/* SECTION A: ADMISSION TRACK */}
      <fieldset className="form-section">
        <legend>Section A: Admission Category & Type</legend>
        
        {/* Dynamic Context Headline */}
        <div className="admission-context-banner">
          <p className="admission-context-text">
            Application for Admission into <span className="highlight-text">{targetGrade}</span> in the Year <span className="highlight-text">{targetYear}</span>
          </p>
        </div>

        <div className="input-row">
          <div className="input-group">
            <label>Admission Category <span className="required-star">* </span></label>
            <select 
              name="applicationType" 
              value={formData.applicationType || 'Standard'} 
              onChange={handleInputChange} 
              required
            >
              <option value="Standard">Grade 10 Entry (Standard)</option>
              <option value="Transfer">Transfer Student</option>
            </select>
          </div>

          <div className="input-group">
            <label>Is this your first time applying to Starehe? <span className="required-star">*</span></label>
            <select 
              name="isFirstTimeApplication" 
              value={formData.isFirstTimeApplication || 'Yes'} 
              onChange={handleInputChange}
              required
            >
              <option value="Yes">Yes, this is my first attempt</option>
              <option value="No">No, I have submitted a record previously</option>
            </select>
          </div>
        </div>

        {/* Dynamic Context-Aware Re-application Logic */}
        {formData.isFirstTimeApplication === 'No' && (
          <div className="reapplication-logic animate-in">
            <div className="input-group full-width">
              <label>Reason for Re-application / Previous Status <span className="required-star">*</span></label>
              <textarea
                name="reapplicationReason"
                value={formData.reapplicationReason || ''}
                onChange={handleInputChange}
                placeholder="Please state the year of your previous attempt and explain briefly why you are reapplying (e.g., missing documents last time, academic update, deferral, etc.)..."
                required
              />
            </div>
          </div>
        )}

        {/* Dynamic Context-Aware Transfer Sub-Form Logic */}
        {formData.applicationType === 'Transfer' && (
          <div className="transfer-logic animate-in">
            <div className="input-row">
              <div className="input-group">
                <label>Current Grade Status <span className="required-star">* </span></label>
                <select 
                  name="currentGrade" 
                  value={formData.currentGrade || ''} 
                  onChange={handleInputChange} 
                  required
                >
                  <option value="">-- Select Grade --</option>
                  <option value="Grade 10">Grade 10</option>
                  <option value="Grade 11">Grade 11</option>
                </select>
              </div>
            </div>
            <div className="input-group full-width">
              <label>Reason for Transfer Request <span className="required-star">* </span></label>
              <textarea
                name="transferReason"
                value={formData.transferReason || ''}
                onChange={handleInputChange}
                placeholder="Explain briefly why you are requesting a transfer to Starehe..."
                required
              />
            </div>
          </div>
        )}
      </fieldset>

      {/* SECTION B: PERSONAL IDENTITY */}
      <fieldset className="form-section">
        <legend>Section B: Student Identity</legend>
        <div className="input-row">
          <div className="input-group">
            <label>First Name <span className="required-star">* </span></label>
            <input 
              type="text" 
              name="firstName" 
              value={formData.firstName || ''} 
              onChange={handleInputChange} 
              placeholder="e.g., Alex" 
              required 
            />
          </div>
          <div className="input-group">
            <label>Middle Name(s)</label>
            <input 
              type="text" 
              name="middleName" 
              value={formData.middleName || ''} 
              onChange={handleInputChange} 
              placeholder="e.g., Morgan" 
            />
          </div>
          <div className="input-group">
            <label>Last Name (Surname) <span className="required-star">* </span></label>
            <input 
              type="text" 
              name="lastName" 
              value={formData.lastName || ''} 
              onChange={handleInputChange} 
              placeholder="e.g., Jordan" 
              required 
            />
          </div>
        </div>
        
        <div className="input-row">
          <div className="input-group">
            <label>Date of Birth <span className="required-star">* </span></label>
            <input 
              type="date" 
              name="dob" 
              value={formData.dob || ''} 
              onChange={handleInputChange} 
              required 
            />
          </div>
          <div className="input-group">
            <label>Gender <span className="required-star">* </span></label>
            <select 
              name="gender" 
              value={formData.gender || ''} 
              onChange={handleInputChange} 
              required
            >
              <option value="">Select Gender</option>
              <option 
                value="Male" 
                disabled={formData.institutionType === 'sgc'}
              >
                Male {formData.institutionType === 'sgc' ? '(Restricted to SBC)' : ''}
              </option>
              <option 
                value="Female" 
                disabled={formData.institutionType === 'sbc'}
              >
                Female {formData.institutionType === 'sbc' ? '(Restricted to SGC)' : ''}
              </option>
            </select>
          </div>
          <div className="input-group">
            <label>Religion <span className="required-star">* </span></label>
            <select 
              name="religion" 
              value={formData.religion || ''} 
              onChange={handleInputChange} 
              required
            >
              <option value="">Select Religion</option>
              <option value="Christian">Christian</option>
              <option value="Muslim">Muslim</option>
              <option value="Hindu">Hindu</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="input-group">
            <label>Nationality <span className="required-star">* </span></label>
            <input 
              type="text" 
              name="nationality" 
              value={formData.nationality || 'Kenyan'} 
              onChange={handleInputChange} 
              placeholder="e.g., Kenyan" 
              required 
            />
          </div>
        </div>
      </fieldset>

      {/* SECTION C: OFFICIAL IDENTIFICATION */}
      <fieldset className="form-section">
        <legend>Section C: Government & Exam Identification</legend>
        <div className="input-row">
          <div className="input-group">
            <label>Birth Certificate No <span className="required-star">* </span></label>
            <input 
              type="text" 
              name="birthCertNo" 
              value={formData.birthCertNo || ''} 
              onChange={handleInputChange} 
              placeholder="e.g., 12345678" 
              required 
            />
          </div>
          <div className="input-group">
            <label>NEMIS UPI Number <span className="required-star">* </span></label>
            <input 
              type="text" 
              name="nemisUpiNo" 
              value={formData.nemisUpiNo || ''} 
              onChange={handleInputChange} 
              placeholder="e.g., ABC123D" 
              required 
            />
          </div>
        </div>
        <div className="input-row">
          <div className="input-group">
            <label>Assessment Number <span className="required-star">* </span></label>
            <input 
              type="text" 
              name="assessmentNo" 
              value={formData.assessmentNo || ''} 
              onChange={handleInputChange} 
              placeholder="e.g., 600001001" 
              required 
            />
          </div>
          <div className="input-group">
            <label>School KNEC Code <span className="required-star">* </span></label>
            <input 
              type="text" 
              name="schoolKnecCode" 
              value={formData.schoolKnecCode || ''} 
              onChange={handleInputChange} 
              placeholder="e.g., 20401001001" 
              required 
            />
          </div>
        </div>
      </fieldset>

      {/* SECTION D: GEOGRAPHIC AREA OF RESIDENCE */}
      <fieldset className="form-section">
        <legend>Section D: Geographic Residence</legend>
        <div className="input-row">
          <div className="input-group">
            <label>Home County <span className="required-star">* </span></label>
            <input 
              type="text" 
              name="county" 
              value={formData.county || ''} 
              onChange={handleInputChange} 
              placeholder="e.g., Nairobi" 
              required 
            />
          </div>
          <div className="input-group">
            <label>Sub-County <span className="required-star">* </span></label>
            <input 
              type="text" 
              name="subCounty" 
              value={formData.subCounty || ''} 
              onChange={handleInputChange} 
              placeholder="e.g., Starehe" 
              required 
            />
          </div>
        </div>
      </fieldset>

      {/* SECTION E: MANDATORY INITIAL ATTACHMENTS */}
      <fieldset className="form-section">
        <legend>Section E: Primary Document Uploads</legend>
        <p className="section-instructions-bar alert-bar">
          ⚠️ <strong>File Standards Policy:</strong> All uploaded items must be clear photographic images  or consolidated PDF sheets up to 5MB are accepted for validation tracking.
        </p>
        <div className="input-row ">
          
          <div className="input-group upload-card-wrapper">
            <div className="upload-info">
            <label htmlFor="passportPhotoFile">
              1. Passport Size Photograph <span className="required-star">* </span>
              <span className="sub-helper-label">Taken within the last 2 months against a plain background.</span>
            </label>
            </div>
            <input 
              type="file" 
              id="passportPhotoFile" 
              name="passportPhotoFile" 
              accept=".jpg,.jpeg,.png"
              onChange={handleFileChange} 
              required={!formData.passportPhotoFile}
            />
            <button type="button" className="upload-btn" onClick={() => triggerFileSelect('passportPhotoFile')}>
                {formData.passportPhotoFile ? "🔄 Change File" : "📁 Choose File"}
              </button>
              {formData.passportPhotoFile && <span className="file-indicator-success">✔ Staged ({formData.passportPhotoFile.name})</span>}
          </div>

          <div className=" upload-card-wrapper">
             <div className="upload-info">
            <label htmlFor="birthCertFile">
              2. Birth Certificate Copy <span className="required-star">* </span>
              <span className="sub-helper-label">Clear scanned image or PDF copy of the full document.</span>
            </label>
            </div>
            <input 
              type="file" 
              id="birthCertFile" 
              name="birthCertFile" 
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileChange} 
              required={!formData.birthCertFile}
            />
            <button type="button" className="upload-btn" onClick={() => triggerFileSelect('birthCertFile')}>
                {formData.birthCertFile ? "🔄 Change File" : "📁 Choose File"}
              </button>
              {formData.birthCertFile && <span className="file-indicator-success">✔ Staged ({formData.birthCertFile.name})</span>}
          </div>


        </div>
      </fieldset>

      {/* FORM NAVIGATION CONTROLLERS */}
      <div className="form-actions-container split-buttons">
        <button type="button" className="back-btn" onClick={onBack}>
          ← Back to Selection
        </button>
        <button type="submit" className="next-btn">
          Next: Academic Background →
        </button>
      </div>

    </form>
  );
}

export default Personal;