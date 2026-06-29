import React, { useState } from 'react';

function Pathway({ selections = [], tracks = {}, handleSelectChange, onNext, onBack }) {
  const [validationError, setValidationError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError('');

    // Extract all chosen pathways, ignoring unselected blank fields
    const chosenPathways = selections.map(s => s.pathway).filter(Boolean);

    // Create a Set to find unique entries
    const uniquePathways = new Set(chosenPathways);

    // If the Set size is smaller than the array length, we have a duplicate!
    if (uniquePathways.size !== chosenPathways.length) {
      setValidationError('⚠️ Error: You cannot select the same Career Pathway more than once. Please choose unique priorities for each choice.');
      return; // Stops the form from advancing
    }

    if (onNext) onNext();          
  };

  const allPathways = ["STEM", "Social Sciences", "Arts & Sports Science"];

  return (
    <form className="form-grid" onSubmit={handleSubmit}>
      
      {/* SECTION 3: PATHWAY SELECTION */}
      <fieldset className="form-section pathway-selection">
        <legend>Section A: Career Pathway Priorities</legend>
        
        <div className="info-box">
          <strong>Core Mandatory Subjects:</strong> English, Kiswahili, Mathematics & Community Service Learning (CSL)
        </div>

        {/* Validation Error Banner */}
        {validationError && (
          <div className="form-notice-box urgent error-banner">
            <p>{validationError}</p>
          </div>
        )}

        {selections.map((item, index) => {
          const availableTracks = tracks[item.pathway] || [];
          
          return (
            <div key={`choice-row-${index}`} className="choice-box">
              <h4 className="choice-title">Choice #{item.choice}</h4>
              <div className="selection-row">
                
                {/* Pathway Dropdown */}
                <select
                  value={item.pathway || ''}
                  onChange={(e) => {
                    handleSelectChange(index, 'pathway', e.target.value);
                    handleSelectChange(index, 'track', ''); // Reset track safely
                  }}
                  className="form-input" 
                  required
                >
                  <option value="">-- Select Pathway --</option>
                  {allPathways.map(pathway => (
                    <option key={pathway} value={pathway}>{pathway}</option>
                  ))}
                </select>

                {/* Track Dropdown - Dynamic render block */}
                {item.pathway && availableTracks.length > 0 && (
                  <select
                    value={item.track || ''}
                    onChange={(e) => handleSelectChange(index, 'track', e.target.value)}
                    className="form-input track-select-fade-in" 
                    required
                  >
                    <option value="">-- Select Specific Track --</option>
                    {availableTracks.map((t) => (
                      <option key={t.id || t.name} value={t.name}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                )}
                
              </div>
            </div>
          );
        })}
      </fieldset>

      {/* Navigation action bar */}
      <div className="form-actions-container split-buttons">
        <button type="button" className="back-btn" onClick={onBack}>
          &larr; Back
        </button>
        <button type="submit" className="next-btn">
          Next: Family Context &rarr;
        </button>
      </div>

    </form>
  );
}

export default Pathway;