import React, { useState } from 'react';

function Review({ formData, selections, view, onSubmit, onBack }) {
  const [declarationChecked, setDeclarationChecked] = useState(false);

  // Ready-to-go diagnostic validation metrics array
  const anomalies = [];
  if (!formData.firstName || !formData.lastName) anomalies.push("Missing foundational applicant tracking name fields.");
  if (formData.applicationType === 'Transfer' && !formData.transferReason) anomalies.push("Application track set to 'Transfer' but no narrative reason was detailed.");
  
  const hasErrors = anomalies.length > 0;

  const handleFinalSubmitClick = (e) => {
    e.preventDefault();
    if (!declarationChecked) {
      alert("You must explicitly verify the accuracy confirmation declaration box before submission clearance.");
      return;
    }
    onSubmit(e);
  };

  return (
    <form className="form-grid" onSubmit={handleFinalSubmitClick}>
      
      {/* SECTION A: LIVE ANOMALY RADAR / ERROR CATCHER */}
      <fieldset className="form-section diagnostic-audit-panel">
        <legend>Section A: Pre-Flight Integrity Check</legend>
        <div className={`status-banner ${hasErrors ? 'danger-alert' : 'success-alert'}`}>
          <h4>{hasErrors ? "⚠️ System Anomalies Detected" : "✔ Document Structure Integrity Cleared"}</h4>
          {hasErrors ? (
            <ul className="anomaly-error-list">
              {anomalies.map((err, idx) => <li key={idx}>{err}</li>)}
            </ul>
          ) : (
            <p>All core state structures, identity variables, and track configurations are structurally aligned for database staging.</p>
          )}
        </div>
      </fieldset>

      {/* SECTION B: FINAL LEGAL INTEGRITY SIGN-OFF */}
      <fieldset className="form-section summary-review-box">
        <legend>Section B: Declaration & Sign-Off</legend>
        <div className="placeholder-container verification-alert">
          <h4>Review Application Status</h4>
          <p>
            You are processing an application to <strong>{view === 'sbc' ? "Starehe Boys' Centre" : "Starehe Girls' Centre"}</strong> as a <strong>{formData.applicationType || 'Standard'} Entry</strong> applicant.
          </p>
          
          {/* Legal Acknowledgement Ticker System */}
          <div className="legal-checkbox-wrapper">
            <input 
              type="checkbox" 
              id="integrity-declaration-checkbox"
              checked={declarationChecked}
              onChange={(e) => setDeclarationChecked(e.target.checked)}
              required
            />
            <label htmlFor="integrity-declaration-checkbox" className="checkbox-label-text">
              <strong>I hereby certify:</strong> The information provided across this multi-step registry matches my legal identity documents precisely. I explicitly acknowledge that providing false information, mismatched records, or fraudulent statements will result in the <strong>immediate rejection of this application and forfeiture of any admission offer</strong> to the institution, alongside potential legal prosecution.
            </label>
          </div>
        </div>
      </fieldset>

      {/* Clean Form Navigation Controls */}
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