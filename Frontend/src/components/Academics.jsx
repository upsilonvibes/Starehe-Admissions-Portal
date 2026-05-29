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
        
        <div className="input-group full-width">
          <label>Junior School*</label>
          <input 
            type="text" 
            name="juniorSchool" 
            value={formData.juniorSchool || ''} 
            onChange={handleInputChange} 
            placeholder="Current School Name" 
            required 
          />
        </div>
        
        <div className="input-row">
          <div className="input-group">
            <label>Sub-county*</label>
            <input 
              type="text" 
              name="subCounty" 
              value={formData.subCounty || ''} 
              onChange={handleInputChange} 
              placeholder="e.g., Westlands" 
              required 
            />
          </div>
          <div className="input-group">
            <label>County*</label>
            <input 
              type="text" 
              name="county" 
              value={formData.county || ''} 
              onChange={handleInputChange} 
              placeholder="e.g., Nairobi" 
              required 
            />
          </div>
        </div>
      </fieldset>

      {/* Button container with dual controls - zero inline styles! */}
      <div className="form-actions-container split-buttons">
        <button type="button" className="back-btn" onClick={onBack}>
          ← Back
        </button>
        <button type="submit" className="submit-btn next-btn">
          Next: Pathway Priorities →
        </button>
      </div>

    </form>
  );
}

export default Academics;