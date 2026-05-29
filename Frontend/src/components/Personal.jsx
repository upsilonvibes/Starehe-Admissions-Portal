import React from 'react';

// We accept states and handlers passed down as props from App.jsx
function Personal({ formData, handleInputChange, onNext, onBack }) {
  
  // Triggers when the user clicks the "Next" button
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the browser from reloading the page
    onNext();          // Advances the wizard to Step 2
  };

  return (
    <form className="form-grid" onSubmit={handleSubmit}>
      
      {/* SECTION A: ADMISSION TRACK (MOVED FROM REVIEW) */}
      <fieldset className="form-section">
        <legend>Section A: Admission Category & Type</legend>
        
        <div className="input-group">
          <label>Admission Category*</label>
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

        {/* Dynamic Context-Aware Transfer Sub-Form Logic */}
        {formData.applicationType === 'Transfer' && (
          <div className="transfer-logic animate-in">
            <div className="input-row">
              <div className="input-group">
                <label>Current Grade Status*</label>
                <select 
                  name="currentGrade" 
                  value={formData.currentGrade || 'Grade 9'} 
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
              <label>Reason for Transfer Request*</label>
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
            <label>First Name*</label>
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
            <label>Last Name (Surname)*</label>
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
            <label>Date of Birth*</label>
            <input 
              type="date" 
              name="dob" 
              value={formData.dob || ''} 
              onChange={handleInputChange} 
              required 
            />
          </div>
          <div className="input-group">
            <label>Religion*</label>
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
            <label>Nationality*</label>
            <input 
              type="text" 
              name="nationality" 
              value={formData.nationality || ''} 
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
            <label>Birth Certificate No*</label>
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
            <label>NEMIS UPI Number*</label>
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
          <div className="input-row">
          <div className="input-group">
            <label>Assessment Number*</label>
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
            <label>School KNEC Code*</label>
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
        </div>
      </fieldset>
<div className="form-actions-container split-buttons">
        <button type="button" className="back-btn" onClick={onBack}>
          ← Back to Selection
        </button>
        <button type="submit" className="submit-btn next-btn">
          Next: Academic Background →
        </button>
      </div>

    </form>
  );
}

export default Personal;