import React from 'react';

// Recibimos los props académicos y de navegación (We receive academic and nav props)
function Pathway({ selections, tracks, handleSelectChange, onNext, onBack }) {
  
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents page reload
    onNext();          // Advances to Step 4 (Family Placeholder)
  };

  return (
    <form className="form-grid" onSubmit={handleSubmit}>
      
      {/* SECTION 3: PATHWAY SELECTION */}
      <fieldset className="form-section pathway-selection">
        <legend>Section A: Career Pathway Priorities</legend>
        
        <div className="info-box">
          <strong>Core Subjects:</strong> English, Kiswahili, Physical Education, and Community Service Learning
        </div>

        {selections.map((item, index) => (
          <div key={index} className="choice-box">
            <h4 className="choice-title">Choice #{item.choice}</h4>
            <div className="selection-row">
              
              {/* Pathway Dropdown */}
              <select
                value={item.pathway}
                onChange={(e) => handleSelectChange(index, 'pathway', e.target.value)}
                className="form-input" 
                required
              >
                <option value="">-- Select Pathway --</option>
                <option value="STEM">STEM</option>
                <option value="Social Sciences">Social Sciences</option>
                <option value="Arts & Sports Science">Arts & Sports Science</option>
              </select>

              {/* Track Dropdown - Only displays if a Pathway is chosen */}
              {item.pathway && tracks && tracks[item.pathway] && (
                <select
                  value={item.track}
                  onChange={(e) => handleSelectChange(index, 'track', e.target.value)}
                  className="form-input" 
                  required
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

      {/* Navigation action bar*/}
      <div className="form-actions-container split-buttons">
        <button type="button" className="back-btn" onClick={onBack}>
          ← Back
        </button>
        <button type="submit" className=" next-btn">
          Next: Family Context →
        </button>
      </div>

    </form>
  );
}

export default Pathway;