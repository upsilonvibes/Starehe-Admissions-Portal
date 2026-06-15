import React, { useState } from 'react';

function Review({ formData, view, onSubmit, onBack }) {
  const [declarationChecked, setDeclarationChecked] = useState(false);

  // Safely extract names or fallback if missing
  const applicantName = formData.personalInfo?.fullName || 'Not Provided';
  const isSBC = view === 'sbc';

  const handleFinalSubmitClick = (e) => {
    e.preventDefault();
    if (!declarationChecked) {
      alert("You must explicitly verify the accuracy confirmation declaration box before submission clearance.");
      return;
    }
    onSubmit(); 
  };

  return (
    <form className="form-grid" onSubmit={handleFinalSubmitClick}>
      
      {/* SECTION 1: APPLICANT DOSSIER SUMMARY */}
      <div className="summary-dossier-card">
        <div className="dossier-header">
          <h3>📋 Application Summary Review</h3>
          <p>Please confirm all details match your official documents before final submission.</p>
        </div>

        <div className="dossier-grid">
          {/* Target Institution */}
          <div className="dossier-item wide">
            <span className="dossier-label">Target Institution:</span>
            <span className={`dossier-value institution-badge ${isSBC ? 'sbc-yellow' : 'sgc-blue'}`}>
              {isSBC ? "Starehe Boys' Centre (Yellow Form Pipeline)" : "Starehe Girls' Centre (Blue Form Pipeline)"}
            </span>
          </div>

          {/* Personal Information Group */}
          <div className="dossier-section-title">Personal Information</div>
          
          <div className="dossier-item">
            <span className="dossier-label">Full Legal Name:</span>
            <span className="dossier-value">{applicantName}</span>
          </div>
          
          <div className="dossier-item">
            <span className="dossier-label">Gender:</span>
            <span className="dossier-value">{formData.personalInfo?.gender || 'Not Provided'}</span>
          </div>

          <div className="dossier-item">
            <span className="dossier-label">Birth Certificate No:</span>
            <span className="dossier-value">{formData.personalInfo?.birthCertificateNumber || 'N/A'}</span>
          </div>

          <div className="dossier-item">
            <span className="dossier-label">NEMIS UPI / Assessment No:</span>
            <span className="dossier-value">{formData.personalInfo?.nemisUPI || 'N/A'}</span>
          </div>

          {/* Academic Background Group */}
          <div className="dossier-section-title">Academic Background</div>
          
          <div className="dossier-item wide">
            <span className="dossier-label">Junior School Attended:</span>
            <span className="dossier-value">{formData.academicBackground?.juniorSchool || 'Not Provided'}</span>
          </div>

          {/* Pathway Track Options Group */}
          <div className="dossier-section-title">Selected Pathway Preferences</div>
          
          <div className="dossier-item wide pathway-review-item">
            <div className="pathway-row"><strong>1st Choice:</strong> {formData.pathwayChoices?.choice1?.pathwayName} — <span className="track-subtext">{formData.pathwayChoices?.choice1?.trackName}</span></div>
            <div className="pathway-row"><strong>2nd Choice:</strong> {formData.pathwayChoices?.choice2?.pathwayName} — <span className="track-subtext">{formData.pathwayChoices?.choice2?.trackName}</span></div>
            <div className="pathway-row"><strong>3rd Choice:</strong> {formData.pathwayChoices?.choice3?.pathwayName} — <span className="track-subtext">{formData.pathwayChoices?.choice3?.trackName}</span></div>
          </div>
        </div>
      </div>

      {/* SECTION 2: FINAL LEGAL INTEGRITY SIGN-OFF */}
      <fieldset className="form-section legal-signoff-box">
        <legend>Official Declaration</legend>
        <div className="verification-alert">
          <div className="legal-checkbox-wrapper">
            <input 
              type="checkbox" 
              id="integrity-declaration-checkbox"
              checked={declarationChecked}
              onChange={(e) => setDeclarationChecked(e.target.checked)}
              required
            />
            <label htmlFor="integrity-declaration-checkbox" className="checkbox-label-text">
              <strong>I hereby certify:</strong> The information provided across this multi-step registry matches my legal identity documents precisely. I explicitly acknowledge that providing false information, mismatched records, or fraudulent statements will result in the <strong>immediate rejection of this application and forfeiture of any admission offer</strong> to the institution.
            </label>
          </div>
        </div>
      </fieldset>

      {/* Form Navigation Controls */}
      <div className="form-actions-container split-buttons">
        <button type="button" className="back-btn" onClick={onBack}>
          ← Back
        </button>
        <button 
          type="submit" 
          className={`submit-btn final-submit-btn ${!declarationChecked ? 'disabled-btn' : ''}`}
          disabled={!declarationChecked}
        >
          Submit Final Application ✔
        </button>
      </div>

    </form>
  );
}

export default Review;