import React from 'react';

// Recibimos los props para controlar la navegación (We receive props to control navigation)
function Family({ onNext, onBack }) {
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onNext(); // Go to Step 5: Review
  };

  return (
    <form className="form-grid" onSubmit={handleSubmit}>
      
      {/* PLACEHOLDER CARD */}
      <fieldset className="form-section">
        <legend>Section A: Household Demographic Context</legend>
        <div className="placeholder-container">
          <h4>Family Information Component</h4>
          <p>
            *Esta sección está en desarrollo.* (This section is under development). 
            It will collect details about the applicant's family background, including parents' names, 
            occupations, and financial status for school sponsorship context.
          </p>
        </div>
      </fieldset>

      {/* Navigation action bar — zero inline styles */}
      <div className="form-actions-container split-buttons">
        <button type="button" className="back-btn" onClick={onBack}>
          ← Back
        </button>
        <button type="submit" className=" next-btn">
          Next: Review Application →
        </button>
      </div>

    </form>
  );
}

export default Family;