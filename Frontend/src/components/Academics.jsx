import React from 'react';

function Academics({ formData, handleInputChange, handleFileChange, fileInputRefs, triggerFileSelect, onNext, onBack }) {
  
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents page reload
    onNext();          // Moves to Step 3 (Pathway)
  };

  return (
    <form className="form-grid" onSubmit={handleSubmit}>
      
      {/* SECTION 3: ACADEMIC BACKGROUND & LOCATION */}
      <fieldset className="form-section">
        <legend>Section A: Institutional Background & Location</legend>
        
        {/* ROW 1: Main Institution Details */}
        <div className="input-row">
          <div className="input-group ">
            <label>Junior School <span className="required-star">* </span></label>
            <input 
              type="text" 
              name="juniorSchool" 
              value={formData.juniorSchool || ''} 
              onChange={handleInputChange} 
              placeholder="e.g., Nairobi Junior School" 
              required 
            />
            <p className="completion-help-text">
              Enter the official name of the junior secondary institution attended.
            </p>
          </div>

          <div className="input-group">
            <label>
              Exit Year <span className="required-star">* </span>
            </label>
            <input
              type="number"
              name="yearCompleted"
              required
              value={formData.yearCompleted || ''}
              onChange={handleInputChange} 
              placeholder="e.g., 2026"
            />
            <p className="completion-help-text">
              Enter the year the applicant completed or is expected to leave this institution.
            </p>
          </div>
          
        </div>

        {/* ROW 2: Balanced Layout - Locations Grid */}
        <div className="input-row">
          <div className="input-group">
            <label>Sub-county <span className="required-star">* </span></label>
            <input 
              type="text" 
              name="schoolSubCounty" 
              value={formData.schoolSubCounty || ''} 
              onChange={handleInputChange} 
              placeholder="e.g., Kasarani" 
              required 
            />
            <p className="completion-help-text">
              Enter the administrative sub-county where the school is physically located.
            </p>
          </div>
          
          <div className="input-group">
            <label>County <span className="required-star">* </span></label>
            <input 
              type="text" 
              name="schoolCounty" 
              value={formData.schoolCounty || ''} 
              onChange={handleInputChange} 
              placeholder="e.g., Nairobi" 
              required 
            />
            <p className="completion-help-text">
              Enter the official designated county where the school is physically located.
            </p>
          </div>
        </div>
      </fieldset>

      {/* SECTION B: ACADEMIC VERIFICATION DOCUMENTS */}
      <fieldset className="form-section">
        <legend>Section B: Academic Document Uploads</legend>
        <p className="section-instructions-bar alert-bar">
          ⚠️ <strong>File Standards Policy:</strong> All uploaded items must be clear photographic images  or consolidated PDF sheets up to 5MB are accepted for validation tracking.
        </p>
        <div className="input-row">
          {/* KPSEA Result Slip Upload Card */}
          <div className="upload-card-wrapper">
            <div className="upload-info">
              <label>
                1. Grade 6 KPSEA National Result Slip <span className="required-star">* </span>
                <span className="sub-helper-label">Official KNEC provisional slip or certified school copy.</span>
              </label>
            </div>
            <input
              type="file"
              name="kpseaResultSlipFile"
              ref={fileInputRefs.kpseaResultSlipFile}
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileChange}
              className="hidden-file-input"
              required={!formData.kpseaResultSlipFile}
            />
            <button type="button" className="upload-btn" onClick={() => triggerFileSelect('kpseaResultSlipFile')}>
              {formData.kpseaResultSlipFile ? "🔄 Change File" : "📁 Choose File"}
            </button>
            {formData.kpseaResultSlipFile && <span className="file-indicator-success">✔ Staged ({formData.kpseaResultSlipFile.name})</span>}
          </div>
      

        
          {/* Junior School Transcript Upload Card */}
          <div className="upload-card-wrapper">
            <div className="upload-info">
              <label>
                2. Junior School Cumulative Transcript <span className="required-star">* </span>
                <span className="sub-helper-label">Combined Grade 7 and Grade 8 report cards or academic summary.</span>
              </label>
            </div>
            <input
              type="file"
              name="juniorSchoolTranscriptFile"
              ref={fileInputRefs.juniorSchoolTranscriptFile}
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileChange}
              className="hidden-file-input"
              required={!formData.juniorSchoolTranscriptFile}
            />
            <button type="button" className="upload-btn" onClick={() => triggerFileSelect('juniorSchoolTranscriptFile')}>
              {formData.juniorSchoolTranscriptFile ? "🔄 Change File" : "📁 Choose File"}
            </button>
            {formData.juniorSchoolTranscriptFile && <span className="file-indicator-success">✔ Staged ({formData.juniorSchoolTranscriptFile.name})</span>}
          </div>
        </div>
      </fieldset>

      {/* Button container with dual controls */}
      <div className="split-buttons form-navigation-buttons-row">
        <button type="button" className="back-btn" onClick={onBack}>
          ← Back
        </button>
        <button type="submit" className="next-btn">
          Next: Pathway Priorities →
        </button>
      </div>

    </form>
  );
}

export default Academics;