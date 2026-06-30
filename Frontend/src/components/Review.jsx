// src/components/Review.jsx
import React from 'react';

function Review({
  formData,
  view,
  onSubmit,
  onBack,
  onDownload,
  declarationChecked,
  setDeclarationChecked
}) {
  const isSBC = view === 'sbc';
  const isFeePaying = formData.applicationStream === 'feePaying';

  // 1. TOP-LEVEL RESOLUTIONS (Accessible everywhere)
  const isFatherDeceased = formData.fatherStatus === 'Deceased';
  const isMotherDeceased = formData.motherStatus === 'Deceased';

  // Convert parent incomes safely to numbers, defaulting to 0 if empty or invalid
  const fatherIncomeNum = parseFloat(formData.fatherMonthlyIncome) || 0;
  const motherIncomeNum = parseFloat(formData.motherMonthlyIncome) || 0;
  const combinedIncome = fatherIncomeNum + motherIncomeNum;

  // Determine what to display based on whether data was entered
  const hasIncomeData = formData.fatherMonthlyIncome || formData.motherMonthlyIncome;
  
  const displayIncomeString = (isFatherDeceased && isMotherDeceased)
    ? '🔒 Exempt (Both Parents Deceased)'
    : hasIncomeData 
      ? `KES ${combinedIncome.toLocaleString()}` 
      : 'Not Provided';

  // 2. GENERAL FIELDS
  const dateOfBirth = formData.dob;
  const birthCertificateNumber = formData.birthCertNo;
  const nemisUPINumber = formData.nemisUpiNo;
  const assessmentNumber = formData.assessmentNo;
  const schoolKnecCode = formData.schoolKnecCode;

  const juniorSchool = formData.juniorSchool;
  const county = formData.schoolCounty;
  const subCounty = formData.schoolSubCounty;
  const completionYear = formData.yearCompleted;

  const fatherStatus = formData.fatherStatus;
  const motherStatus = formData.motherStatus;
  const feePayer = formData.siblingFeesPayer;

  const familySigneeName = formData.familySigneeName;
  const signeeRelationship = formData.familyRelationship;
  const signeeMobile = formData.familySigneeMobile;
  const signeeEmail = formData.familySigneeEmail;

  // FIX: Look inside master formData state first, then fallback safely
  const selectionsList = formData.selections || formData.pathways || formData.pathwayChoices?.selections || [];
  const siblingsList = formData.siblings || formData.siblingsList || [];
  
  const derivedGender = formData.gender || (view === 'sbc' || formData.institutionType === 'sbc' ? 'Male' : 'Female');

  // Safely merge names
  const fName = formData.firstName || '';
  const mName = formData.middleName || '';
  const lName = formData.lastName || '';
  const computedFullName = [fName, mName, lName].filter(Boolean).join(' ').trim();

  const handleFormSubmitWrapper = (e) => {
    e.preventDefault();
    if (!declarationChecked) {
      alert("Please confirm the verification checkbox to submit your application.");
      return;
    }
    onSubmit();
  };

  // Live Audit Document Registry Builder
  const verifyDocumentRegistry = () => {
    const checklist = [
      { key: "passport", label: "Applicant Passport Photo", file: formData.passportPhotoFile, exempt: false },
      { key: "birthCert", label: "Legal Birth Certificate", file: formData.birthCertFile, exempt: false },
      { key: "resultSlip", label: "KPSEA Result Slip / Exam Record", file: formData.kpseaResultSlipFile, exempt: false },
      { key: "transcript", label: "Junior School Progress Transcript", file: formData.juniorSchoolTranscriptFile, exempt: false },
      { key: "fatherId", label: "Father's National ID Card", file: formData.fatherIdFile, exempt: isFatherDeceased },
      { key: "motherId", label: "Mother's National ID Card", file: formData.motherIdFile, exempt: isMotherDeceased },
      { key: "chief", label: "Local Chief Endorsement Form", file: formData.chiefRecommendationFile, exempt: isFeePaying },
      { key: "clergy", label: "Religious Leader Recommendation", file: formData.religiousLeaderRecommendationFile, exempt: isFeePaying },
      { key: "headteacher", label: "Primary Headteacher Assessment", file: formData.headteacherRecommendationFile, exempt: false },
    ];

    return checklist.map((item) => {
      let hasFile = !!item.file;
      let metaDetails = "";
      let rowStatusClass = hasFile ? 'valid' : 'invalid';
      let statusString = hasFile ? "Securely Uploaded" : "Missing / Action Required";

      if (item.exempt) {
        hasFile = true;
        rowStatusClass = 'valid';
        statusString = isFeePaying ? "🔒 Exempt (Fee-Paying Stream)" : "🔒 Exempt (Deceased)";
      } else if (hasFile && item.file instanceof File) {
        const sizeInMB = (item.file.size / (1024 * 1024)).toFixed(2);
        metaDetails = `(${sizeInMB} MB)`;
      }

      return (
        <div key={item.key} className={`verification-row-badge ${rowStatusClass}`}>
          <div className="doc-meta-left">
            <span className="status-icon">{item.exempt ? "🔒" : hasFile ? "✅" : "❌"}</span>
            <span className="doc-item-label">{item.label}</span>
          </div>
          <span className="doc-item-status">
            {statusString} {metaDetails}
          </span>
        </div>
      );
    });
  };

  return (
    <div className="review-step-container">
      <div className="review-notice-banner">
        <h3>📋 Review Your Details</h3>
        <p>This is a read-only preview of your application. Check all details below carefully. If anything is wrong, click the "Back" button at the bottom to fix it.</p>
      </div>

      <form onSubmit={handleFormSubmitWrapper} className="read-only-form-layout">
        {/* SECTION 1: PERSONAL DETAILS */}
        <div className="review-section-card summary-dossier-card">
          <div className="dossier-header">
            <h3>1. Personal Information</h3>
            <p>Identity profiles and structural baseline details</p>
          </div>
          <div className="dossier-grid">
            <div className="dossier-item">
              <span className="dossier-label">Target School:</span>
              <span className={`institution-badge ${isSBC ? 'sbc-yellow' : 'sgc-blue'}`}>
                {isSBC ? "Starehe Boys' Centre" : "Starehe Girls' Centre"}
              </span>
            </div>
            <div className="dossier-item">
              <span className="dossier-label">Admission Stream Category:</span>
              <span className="dossier-value stream-highlight-text">
                {isFeePaying ? "Fee-Paying Place" : "Sponsored / Needy Place"}
              </span>
            </div>
            <div className="dossier-item wide">
              <span className="dossier-label">Full Name:</span>
              <span className="dossier-value text-capitalize">
                {computedFullName || 'Not Provided'}
              </span>
            </div>
            <div className="dossier-item">
              <span className="dossier-label">Date of Birth:</span>
              <span className="dossier-value">{dateOfBirth || 'Not Provided'}</span>
            </div>
            <div className="dossier-item">
              <span className="dossier-label">Gender:</span>
              <span className="dossier-value locked-badge">{derivedGender}</span>
            </div>
            <div className="dossier-item">
              <span className="dossier-label">Birth Certificate Number:</span>
              <span className="dossier-value">{birthCertificateNumber || 'Not Provided'}</span>
            </div>
            <div className="dossier-item">
              <span className="dossier-label">NEMIS UPI Number:</span>
              <span className="dossier-value">{nemisUPINumber || 'Not Provided'}</span>
            </div>
            <div className="dossier-item">
              <span className="dossier-label">Assessment Number:</span>
              <span className="dossier-value">{assessmentNumber || 'Not Provided'}</span>
            </div>
            <div className="dossier-item">
              <span className="dossier-label">School KNEC Code:</span>
              <span className="dossier-value">{schoolKnecCode || 'Not Provided'}</span>
            </div>
          </div>
        </div>

        {/* SECTION 2: ACADEMIC BACKGROUND */}
        <div className="review-section-card summary-dossier-card">
          <div className="dossier-header">
            <h3>2. School Background</h3>
            <p>Primary registry and regional examination source statistics</p>
          </div>
          <div className="dossier-grid">
            <div className="dossier-item wide">
              <span className="dossier-label">Junior School Name:</span>
              <span className="dossier-value">{juniorSchool || 'Not Provided'}</span>
            </div>
            <div className="dossier-item">
              <span className="dossier-label">County:</span>
              <span className="dossier-value">{county || 'Not Provided'}</span>
            </div>
            <div className="dossier-item">
              <span className="dossier-label">Sub-County:</span>
              <span className="dossier-value">{subCounty || 'Not Provided'}</span>
            </div>
            <div className="dossier-item">
              <span className="dossier-label">Year Finished:</span>
              <span className="dossier-value">{completionYear || 'Not Provided'}</span>
            </div>
          </div>
        </div>

        {/* SECTION 3: PATHWAY PREFERENCES */}
<div className="review-section-card summary-dossier-card">
  <div className="dossier-header">
    <h3>3. Choice of Learning Tracks</h3>
    <p>Ranked selection for execution inside the Upper Secondary track</p>
  </div>
  <div className="review-pathways-list dossier-grid">
    <div className="dossier-item wide pathway-review-item">
      {(!formData.selections || formData.selections.length === 0) ? (
        <p className="empty-array-text">No career pathways selected.</p>
      ) : (
        formData.selections.map((item, index) => {
          const priorityRank = item.choice || (index + 1);
          return (
            <div key={`review-choice-${index}`} className="pathway-row">
              <strong>
                {priorityRank === 1 ? '1st' : priorityRank === 2 ? '2nd' : priorityRank === 3 ? '3rd' : `${priorityRank}th`} Choice:
              </strong>{' '}
              {item.pathway || 'None Selected'}
              {item.pathway && item.track && (
                <span className="track-subtext"> ({item.track})</span>
              )}
            </div>
          );
        })
      )}
    </div>
  </div>
</div>

        {/* SECTION 4: FAMILY PROFILE */}
        <div className="review-section-card summary-dossier-card">
          <div className="dossier-header">
            <h3>4. Family Information</h3>
            <p>Social background, dependency parameters, and household finances</p>
          </div>
          <div className="dossier-grid">
            <div className="dossier-item">
              <span className="dossier-label">Father Status:</span>
              <span className="dossier-value">{fatherStatus || 'Not Provided'}</span>
            </div>
            <div className="dossier-item">
              <span className="dossier-label">Mother Status:</span>
              <span className="dossier-value">{motherStatus || 'Not Provided'}</span>
            </div>
            <div className="dossier-item">
              <span className="dossier-label">Father's Monthly Income:</span>
              <span className="dossier-value">
                {isFatherDeceased
                  ? '🔒 Exempt (Deceased)'
                  : formData.fatherMonthlyIncome ? `KES ${parseFloat(formData.fatherMonthlyIncome).toLocaleString()}` : 'Not Provided'}
              </span>
            </div>
            <div className="dossier-item">
              <span className="dossier-label">Mother's Monthly Income:</span>
              <span className="dossier-value">
                {isMotherDeceased
                  ? '🔒 Exempt (Deceased)'
                  : formData.motherMonthlyIncome ? `KES ${parseFloat(formData.motherMonthlyIncome).toLocaleString()}` : 'Not Provided'}
              </span>
            </div>
            <div className="dossier-item wide">
              <span className="dossier-label">Total Combined Household Income:</span>
              <span className="dossier-value gross-income-callout">
                {displayIncomeString}
              </span>
            </div>
            <div className="dossier-item">
              <span className="dossier-label">Who Pays School Fees:</span>
              <span className="dossier-value">{feePayer || 'Not Provided'}</span>
            </div>

            <div className="review-siblings-block dossier-item wide">
      <span className="dossier-section-title">Registered Siblings</span>
      {(!formData.siblings || formData.siblings.length === 0 || !formData.siblings[0].name) ? (
        <p className="empty-array-text">No brothers or sisters added.</p>
      ) : (
        <table className="static-review-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Status / Activity</th>
              <th>Institution / Employer</th>
              <th>Financial Impact</th>
            </tr>
          </thead>
          <tbody>
            {formData.siblings.map((sibling, idx) => {
              // Quick label formatting logic based on your select inputs
              const statusLabel = 
                sibling.activityType === 'schooling' ? 'In School/College' :
                sibling.activityType === 'employed' ? 'Employed' :
                sibling.activityType === 'dependent' ? 'Dependent Unemployed' : 'N/A';

              const financeLabel = 
                sibling.activityType === 'employed' ? 'Income: KES ' : 'Fees: KES ';

              return (
                <tr key={idx}>
                  <td>{sibling.name || 'N/A'}</td>
                  <td>{sibling.age ? `${sibling.age} yrs` : 'N/A'}</td>
                  <td><span className="status-badge">{statusLabel}</span></td>
                  <td>{sibling.institutionOrEmployer || 'N/A'}</td>
                  <td>
                    {sibling.activityType === 'dependent' 
                      ? 'None' 
                      : sibling.financialAmount 
                        ? `${financeLabel}${parseFloat(sibling.financialAmount).toLocaleString()}` 
                        : 'Not Specified'
                    }
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  </div>
</div>

        {/* SECTION 5: DOCUMENTS & STATEMENTS */}
        <div className="review-section-card summary-dossier-card">
          <div className="dossier-header">
            <h3>5. Documents & Personal Statement</h3>
            <p>Binary validation check tags and verified personal statement parameters</p>
          </div>
          <div className="document-checklist-grid">
            <div className="verify-container-box">
              {verifyDocumentRegistry()}
            </div>
          </div>
          <div className="review-narrative-box">
            <span className="dossier-label block-label">Why you are applying for a place / scholarship at Starehe:</span>
            <blockquote className="static-narrative-quote">
              {formData.justificationText || "No entry narrative submitted."}
            </blockquote>
          </div>
        </div>

        {/* SECTION 6: LEGAL SIGNOFF */}
        <div className="review-section-card summary-dossier-card">
          <div className="dossier-header">
            <h3>6. Guardian Verification & Signature</h3>
            <p>Legal validation and digital binding of submitted application records</p>
          </div>
          <div className="dossier-grid">
            <div className="dossier-item">
              <span className="dossier-label">Signee Name:</span>
              <span className="dossier-value">{familySigneeName || 'Not Provided'}</span>
            </div>
            <div className="dossier-item">
              <span className="dossier-label">Relationship:</span>
              <span className="dossier-value">{signeeRelationship || 'Not Provided'}</span>
            </div>
            <div className="dossier-item">
              <span className="dossier-label">Phone Number:</span>
              <span className="dossier-value">{signeeMobile || 'Not Provided'}</span>
            </div>
            <div className="dossier-item">
              <span className="dossier-label">Signee Email:</span>
              <span className="dossier-value">{signeeEmail || 'Not Provided'}</span>
            </div>
          </div>
          <div className="signature-pad-container">
            <span className="dossier-label">Electronic Signature Preview:</span>
            <div className="signature-preview-window">
              <span className="cursive-signature-output">
                {familySigneeName || 'No Name Provided'}
              </span>
            </div>
          </div>
          <div className="legal-signoff-box">
            <div className="legal-checkbox-wrapper">
              <input
                type="checkbox"
                id="legal-adoption-check"
                checked={declarationChecked}
                onChange={(e) => setDeclarationChecked(e.target.checked)}
                required
              />
              <label htmlFor="legal-adoption-check" className="checkbox-label-text">
                I confirm that all the information provided in this comprehensive application packet is true, complete, and accurate to the best of my knowledge under the Starehe Admissions Policy.
              </label>
            </div>
          </div>
        </div>

        {/* SECTION 7: FORM ACTIONS */}
        <div className="form-actions-bar split-buttons form-actions-container">
          <button type="button" className="back-btn" onClick={onBack}>
            &larr; Back
          </button>
          <button type="button" className="upload-btn download-btn-style" onClick={onDownload}>
            🖨️ Print Complete PDF
          </button>
          <button
            type="submit"
            className={`next-btn ${!declarationChecked ? 'disabled' : ''}`}
            disabled={!declarationChecked}
          >
            Submit Final Application Packet ✔
          </button>
        </div>
      </form>
    </div>
  );
}

export default Review;