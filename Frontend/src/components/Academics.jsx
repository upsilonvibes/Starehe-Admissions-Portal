import React from 'react';

// Recibimos los props desde App.jsx (We receive props from App.jsx)
function Academics({ formData, handleInputChange, onNext, onBack }) {
  
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
          <div className="input-group full-width">
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

      {/* Button container with dual controls */}
      <div className="form-actions-container split-buttons">
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