import React, { useRef } from 'react';

function Family({
  formData = {},
  handleInputChange,
  siblingsList = [],
  setSiblingsList,
  onNext,
  onBack,
  onSubmit
}) {

  // Create references for file inputs to support uniform click handling
  const fileInputRefs = {
    fatherIdFile: useRef(null),
    fatherPayslipFile: useRef(null),
    fatherBusinessFile: useRef(null),
    fatherTitleDeedFile: useRef(null),
    fatherDeathCertFile: useRef(null),
    motherIdFile: useRef(null),
    motherPayslipFile: useRef(null),
    motherBusinessFile: useRef(null),
    motherTitleDeedFile: useRef(null),
    motherDeathCertFile: useRef(null)
  };

  // Triggers hidden input clicks programmatically
  const triggerFileSelect = (inputName) => {
    if (fileInputRefs[inputName]?.current) {
      fileInputRefs[inputName].current.click();
    }
  };

  // Safe file parsing engine updating the main application state
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      handleInputChange({
        target: {
          name: name,
          value: files[0]
        }
      });
    }
  };

  // Sibling dynamic matrix modifier engine
  const handleSiblingChange = (index, field, value) => {
    const updated = [...siblingsList];
    updated[index][field] = value;
    setSiblingsList(updated);
  };

  const addSiblingRow = () => {
    setSiblingsList([
      ...siblingsList,
      { name: '', gender: '', age: '', schoolOrOccupation: '', incomeOrFeesPaid: '' }
    ]);
  };

  const removeSiblingRow = (index) => {
    if (siblingsList.length === 1) {
      setSiblingsList([{ name: '', gender: '', age: '', schoolOrOccupation: '', incomeOrFeesPaid: '' }]);
    } else {
      setSiblingsList(siblingsList.filter((_, i) => i !== index));
    }
  };
// Prevent generic form reload errors and guide step transitions safely
  const handleFormSubmission = (e) => {
    e.preventDefault();
    
    // Prioritize moving to the next step view over final master submission
    if (onNext) {
      onNext();
    } else if (onSubmit) {
      onSubmit(e);
    }
  };

  return (
    <form className="family-form-container" onSubmit={handleFormSubmission}>

      {/* ========================================================== */}
      {/* SECTION A: BACKGROUND INFO (FATHER & MOTHER MATRICES)      */}
      {/* ========================================================== */}
      <fieldset className="form-section">
        <legend>Section A: Parents / Guardians Background Status</legend>

        {/* Important Disclaimer Notice */}
        <div className="form-notice-box urgent">
          <p>
            <strong>Note:</strong> The application will only be considered if this section is properly and fully filled and all requisite supporting documents are provided.
          </p>
        </div>

        {/* FATHER'S MATRIX SUBSYSTEM */}
        <div className="parent-sub-profile">
          <h3 className="sub-profile-title">I. Father / Male Guardian Details</h3>

          <div className="input-row">
            <div className="input-group">
              <label>Full Name {formData.fatherStatus === 'Alive' && <span className="required-star">* </span>}</label>
              <input
                type="text"
                name="fatherName"
                value={formData.fatherName || ''}
                onChange={handleInputChange}
                placeholder="As it appears on ID card"
                required={formData.fatherStatus === 'Alive'}
              />
            </div>
            <div className="input-group">
              <label>Status <span className="required-star">* </span></label>
              <select name="fatherStatus" value={formData.fatherStatus || 'Alive'} onChange={handleInputChange}>
                <option value="Alive">Alive</option>
                <option value="Deceased">Deceased</option>
                <option value="Unknown">Unknown / Absent</option>
              </select>
            </div>
          </div>

          <div className="input-row">
            <div className="input-group">
              <label>Marital Status {formData.fatherStatus === 'Alive' && <span className="required-star">* </span>}</label>
              <select
                name="fatherMarital"
                value={formData.fatherMarital || ''}
                onChange={handleInputChange}
                required={formData.fatherStatus === 'Alive'}
              >
                <option value="">-- Select Status --</option>
                <option value="Married">Married</option>
                <option value="Divorced">Divorced</option>
                <option value="Separated">Separated</option>
                <option value="Single Parent">Single Parent</option>
                <option value="Widowed">Widowed</option>
              </select>
            </div>

            <div className="input-group">
              <label>Nationality {formData.fatherStatus === 'Alive' && <span className="required-star">* </span>}</label>
              <input
                type="text"
                name="fatherNationality"
                value={formData.fatherNationality || 'Kenyan'}
                onChange={handleInputChange}
                required={formData.fatherStatus === 'Alive'}
              />
            </div>
          </div>

          <div className="input-row">
            <div className="input-group">
              <label>National ID / Alien or Refugee ID No. {formData.fatherStatus === 'Alive' && <span className="required-star">* </span>}</label>
              <input
                type="text"
                name="fatherIdNo"
                value={formData.fatherIdNo || ''}
                onChange={handleInputChange}
                required={formData.fatherStatus === 'Alive'}
              />
            </div>

            <div className="input-group">
              <label>Employment / Job Details {formData.fatherStatus === 'Alive' && <span className="required-star">* </span>}</label>
              <input
                type="text"
                name="fatherEmployment"
                value={formData.fatherEmployment || ''}
                onChange={handleInputChange}
                placeholder="e.g. Casual Laborer, Teacher, None"
                required={formData.fatherStatus === 'Alive'}
              />
            </div>
          </div>

          <div className="input-row">
            <div className="input-group">
              <label>Business Particulars (If Any) {formData.fatherStatus === 'Alive' && <span className="required-star">* </span>}</label>
              <input
                type="text"
                name="fatherBusiness"
                value={formData.fatherBusiness || ''}
                onChange={handleInputChange}
                placeholder="e.g. Small retail kiosk, None"
                required={formData.fatherStatus === 'Alive'}
              />
            </div>

            <div className="input-group">
              <label>Acreage / Land Assets Owned {formData.fatherStatus === 'Alive' && <span className="required-star">* </span>}</label>
              <input
                type="text"
                name="fatherLand"
                value={formData.fatherLand || ''}
                onChange={handleInputChange}
                placeholder="e.g. 0.5 Acres, None"
                required={formData.fatherStatus === 'Alive'}
              />
            </div>
          </div>

          <div className="input-row">
            <div className="input-group">
              <label>Other Miscellaneous Income Sources</label>
              <input
                type="text"
                name="fatherOtherIncome"
                value={formData.fatherOtherIncome || ''}
                onChange={handleInputChange}
                placeholder="e.g. Side hustles, None"
              />
            </div>
            <div className="input-group">
              <label>Average Monthly Income (KES) {formData.fatherStatus === 'Alive' && <span className="required-star">* </span>}</label>
              <input
                type="number"
                name="fatherMonthlyIncome"
                value={formData.fatherMonthlyIncome || ''}
                onChange={handleInputChange}
                placeholder="10000"
                required={formData.fatherStatus === 'Alive'}
              />
            </div>
          </div>

          <div className="input-row">
            <div className="input-group">
              <label>Physical Home Address Details {formData.fatherStatus === 'Alive' && <span className="required-star">* </span>}</label>
              <input
                type="text"
                name="fatherAddress"
                value={formData.fatherAddress || ''}
                onChange={handleInputChange}
                placeholder="County, Sub-County, Village/Estate"
                required={formData.fatherStatus === 'Alive'}
              />
            </div>
            <div className="input-group">
              <label>House Ownership Description {formData.fatherStatus === 'Alive' && <span className="required-star">* </span>}</label>
              <input
                type="text"
                name="fatherHouse"
                value={formData.fatherHouse || ''}
                onChange={handleInputChange}
                placeholder="e.g. Rented Mud, Owned Permanent"
                required={formData.fatherStatus === 'Alive'}
              />
            </div>
          </div>
        </div>

        <hr className="section-divider" />

        {/* MOTHER'S MATRIX SUBSYSTEM */}
        <div className="parent-sub-profile">
          <h3 className="sub-profile-title">II. Mother / Female Guardian Details</h3>

          <div className="input-row">
            <div className="input-group">
              <label>Full Name {formData.motherStatus === 'Alive' && <span className="required-star">* </span>}</label>
              <input
                type="text"
                name="motherName"
                value={formData.motherName || ''}
                onChange={handleInputChange}
                placeholder="As it appears on ID card"
                required={formData.motherStatus === 'Alive'}
              />
            </div>
            <div className="input-group">
              <label>Status <span className="required-star">* </span></label>
              <select name="motherStatus" value={formData.motherStatus || 'Alive'} onChange={handleInputChange} required>
                <option value="Alive">Alive</option>
                <option value="Deceased">Deceased</option>
                <option value="Unknown">Unknown / Absent</option>
              </select>
            </div>
          </div>

          <div className="input-row">
            <div className="input-group">
              <label>Marital Status {formData.motherStatus === 'Alive' && <span className="required-star">* </span>}</label>
              <select
                name="motherMarital"
                value={formData.motherMarital || ''}
                onChange={handleInputChange}
                required={formData.motherStatus === 'Alive'}
              >
                <option value="">-- Select Status --</option>
                <option value="Married">Married</option>
                <option value="Divorced">Divorced</option>
                <option value="Separated">Separated</option>
                <option value="Single Parent">Single Parent</option>
                <option value="Widowed">Widowed</option>
              </select>
            </div>
            <div className="input-group">
              <label>Nationality {formData.motherStatus === 'Alive' && <span className="required-star">* </span>}</label>
              <input
                type="text"
                name="motherNationality"
                value={formData.motherNationality || 'Kenyan'}
                onChange={handleInputChange}
                required={formData.motherStatus === 'Alive'}
              />
            </div>
          </div>

          <div className="input-row">
            <div className="input-group">
              <label>National ID / Alien or Refugee ID No. {formData.motherStatus === 'Alive' && <span className="required-star">* </span>}</label>
              <input
                type="text"
                name="motherIdNo"
                value={formData.motherIdNo || ''}
                onChange={handleInputChange}
                required={formData.motherStatus === 'Alive'}
              />
            </div>

            <div className="input-group">
              <label>Employment / Job Details {formData.motherStatus === 'Alive' && <span className="required-star">* </span>}</label>
              <input
                type="text"
                name="motherEmployment"
                value={formData.motherEmployment || ''}
                onChange={handleInputChange}
                placeholder="e.g. Housewife, Businesswoman, Tailor"
                required={formData.motherStatus === 'Alive'}
              />
            </div>
          </div>

          <div className="input-row">
            <div className="input-group">
              <label>Business Particulars (If Any) {formData.motherStatus === 'Alive' && <span className="required-star">* </span>}</label>
              <input
                type="text"
                name="motherBusiness"
                value={formData.motherBusiness || ''}
                onChange={handleInputChange}
                placeholder="e.g. Market stall, None"
                required={formData.motherStatus === 'Alive'}
              />
            </div>

            <div className="input-group">
              <label>Acreage / Land Assets Owned {formData.motherStatus === 'Alive' && <span className="required-star">* </span>}</label>
              <input
                type="text"
                name="motherLand"
                value={formData.motherLand || ''}
                onChange={handleInputChange}
                placeholder="e.g. None, 1 Acre"
                required={formData.motherStatus === 'Alive'}
              />
            </div>
          </div>

          <div className="input-row">
            <div className="input-group">
              <label>Other Miscellaneous Income Sources</label>
              <input
                type="text"
                name="motherOtherIncome"
                value={formData.motherOtherIncome || ''}
                onChange={handleInputChange}
                placeholder="e.g. Merry-go-round chamas, None"
              />
            </div>
            <div className="input-group">
              <label>Average Monthly Income (KES) {formData.motherStatus === 'Alive' && <span className="required-star">* </span>}</label>
              <input
                type="number"
                name="motherMonthlyIncome"
                value={formData.motherMonthlyIncome || ''}
                onChange={handleInputChange}
                placeholder="10000"
                required={formData.motherStatus === 'Alive'}
              />
            </div>
          </div>

          <div className="input-row">
            <div className="input-group">
              <label>Physical Home Address Details {formData.motherStatus === 'Alive' && <span className="required-star">* </span>}</label>
              <input
                type="text"
                name="motherAddress"
                value={formData.motherAddress || ''}
                onChange={handleInputChange}
                required={formData.motherStatus === 'Alive'}
              />
            </div>
            <div className="input-group">
              <label>House Ownership Description {formData.motherStatus === 'Alive' && <span className="required-star">* </span>}</label>
              <input
                type="text"
                name="motherHouse"
                value={formData.motherHouse || ''}
                onChange={handleInputChange}
                placeholder="e.g., Owned / Rented"
                required={formData.motherStatus === 'Alive'}
              />
            </div>
          </div>
        </div>
      </fieldset>
      {/* ========================================================== */}
      {/* SECTION B: SIBLING REGISTER TABLE                          */}
      {/* ========================================================== */}
      <fieldset className="form-section">
        <legend>Section B: Sibling Structural Breakdown Register</legend>
        <p className="section-instructions-bar">
          Provide accurate profiling data for <strong>all</strong> brothers, sisters, or dependent relatives living under your care and support system.
        </p>

        <div className="table-responsive-wrapper">
          <table className="siblings-data-table">
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Gender</th>
                <th>Age</th>
                <th>Current School / Occupation</th>
                <th>Estimated Annual Fees / Income Contribution</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {siblingsList.map((sibling, idx) => (
                <tr key={idx}>
                  <td>
                    <input
                      type="text"
                      value={sibling.name || ''}
                      onChange={(e) => handleSiblingChange(idx, 'name', e.target.value)}
                      placeholder="Name"
                      required
                    />
                  </td>
                  <td>
                    <select value={sibling.gender || ''} onChange={(e) => handleSiblingChange(idx, 'gender', e.target.value)} required>
                      <option value="">-- Select --</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </td>
                  <td>
                    <input
                      type="number"
                      value={sibling.age || ''}
                      onChange={(e) => handleSiblingChange(idx, 'age', e.target.value)}
                      placeholder="Age"
                      required
                    />
                  </td>
                  <td>
                    {/* Shortened placeholder to prevent text content container breakage */}
                    <input
                      type="text"
                      value={sibling.schoolOrOccupation || ''}
                      onChange={(e) => handleSiblingChange(idx, 'schoolOrOccupation', e.target.value)}
                      placeholder="Institution/Activity"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={sibling.incomeOrFeesPaid || ''}
                      onChange={(e) => handleSiblingChange(idx, 'incomeOrFeesPaid', e.target.value)}
                      placeholder="KES Amount"
                    />
                  </td>
                  <td>
                    <button type="button" className="btn-table-remove" onClick={() => removeSiblingRow(idx)}>
                      ✕
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button type="button" className="btn-secondary-add-row" onClick={addSiblingRow}>
          ➕ Add Another Sibling Row
        </button>

        {/* Added full-width-row helper framework class here */}
        <div className="input-row separate-top-padding full-width-row">
          <div className="input-group">
            <label>Who currently meets the secondary/higher learning fee liabilities for your siblings?</label>
            <input
              type="text"
              name="siblingFeesPayer"
              value={formData.siblingFeesPayer || ''}
              onChange={handleInputChange}
              placeholder="e.g. Mother, Well-wisher"
            />
          </div>
        </div>
      </fieldset>

      {/* ========================================================== */}
      {/* SECTION C: NARRATIVE EXPLANATION NUGGET                    */}
      {/* ========================================================== */}
      <fieldset className="form-section">
        <legend>Section C: Family Background & Justification Narrative</legend>

        {/* Author Identity & Guardianship Instruction Notice */}
        <div className="form-notice-box urgent">
          <p>
            <strong>Crucial Instruction:</strong> This page must be completed <strong>only by the parent or legal guardian</strong> (where the parents are deceased). Any legal document proving guardianship must be attached in the supporting documents section.
          </p>
        </div>

        {/* 1. Application Stream / Category Selection */}
        <div className="input-group">
          <label htmlFor="applicationStream">
            Type of Placement Being Applied For <span className="required-star">* </span>
          </label>
          <select
            id="applicationStream"
            name="applicationStream"
            value={formData.applicationStream || ''}
            onChange={handleInputChange}
            required
          >
            <option value="">-- Select Application Stream --</option>
            <option value="sponsored">Free Boarding / Sponsored Place (Need-Based)</option>
            <option value="feePaying">Fee-Paying Place</option>
          </select>
        </div>

        {/* 2. Dynamic Narrative Input Groups based on Stream Selection */}
        {formData.applicationStream === 'sponsored' && (
          <div className="input-group text-area-group stream-fade-in">
            <label htmlFor="justificationText">
              Provide a full and clear explanation of your family's distress. Explicitly state why the entire extended family matrix (including working siblings, grandparents, uncles, and aunts) is genuinely unable to raise the fees to send the applicant to an ordinary secondary school: <span className="required-star">*</span>
            </label>
            <textarea
              id="justificationText"
              name="justificationText"
              rows="8"
              value={formData.justificationText || ''}
              onChange={handleInputChange}
              placeholder="Provide a comprehensive breakdown of extended family financial limitations, socio-economic hardships, or vulnerabilities..."
              required
            />
          </div>
        )}

        {formData.applicationStream === 'feePaying' && (
          <div className="input-group text-area-group stream-fade-in">
            <label htmlFor="justificationText">
              Provide a comprehensive statement explaining why Starehe is specifically preferred over other public or private secondary schools for your child: <span className="required-star">*</span>
            </label>
            <textarea
              id="justificationText"
              name="justificationText"
              rows="8"
              value={formData.justificationText || ''}
              onChange={handleInputChange}
              placeholder="Explain your preferences regarding academic traditions, character formation, or institutional values..."
              required
            />
          </div>
        )}
      </fieldset>



      {/* ========================================================== */}
      {/* SECTION D: DOCUMENT ASSET SUBMISSION ARCHITECTURE (UNIFORM)*/}
      {/* ========================================================== */}
      <fieldset className="form-section">
        <legend>Section D: Verification Document Attachments Vault</legend>
        <p className="section-instructions-bar alert-bar">
          ⚠️ <strong>File Standards Policy:</strong> All uploaded items must be clear photographic images  or consolidated PDF sheets up to 5MB are accepted for validation tracking.
        </p>

        {/* FATHER'S DOCUMENTS ATTACHMENT VAULT */}
        <div className="upload-group-title-banner">I. Father / Male Guardian Assets Verification</div>
        <div className="input-row">
          {/* Father ID Upload Card */}
          <div className="upload-card-wrapper">
            <div className="upload-info">
              <label>
                1. National ID / Alien / Refugee Card <span className="required-star">*</span>
                <span className="sub-helper-label">Front and Back face scanned into a clear frame.</span>
              </label>
            </div>
            <input
              type="file"
              name="fatherIdFile"
              ref={fileInputRefs.fatherIdFile}
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileChange}
              className="hidden-file-input"
            />
            <button type="button" className="upload-btn" onClick={() => triggerFileSelect('fatherIdFile')}>
              {formData.fatherIdFile ? "🔄 Change File" : "📁 Choose File"}
            </button>
            {formData.fatherIdFile && <span className="file-indicator-success">✔ Staged ({formData.fatherIdFile.name})</span>}
          </div>

          {/* Father Payslip Upload Card */}
          <div className="upload-card-wrapper">
            <div className="upload-info">
              <label>
                2. Most Recent Formal Payslip
                <span className="sub-helper-label">Required if formal sector employment matrix is selected.</span>
              </label>
            </div>
            <input
              type="file"
              name="fatherPayslipFile"
              ref={fileInputRefs.fatherPayslipFile}
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileChange}
              className="hidden-file-input"
            />
            <button type="button" className="upload-btn" onClick={() => triggerFileSelect('fatherPayslipFile')}>
              {formData.fatherPayslipFile ? "🔄 Change File" : "📁 Choose File"}
            </button>
            {formData.fatherPayslipFile && <span className="file-indicator-success">✔ Staged ({formData.fatherPayslipFile.name})</span>}
          </div>
        </div>

        {/* Father Business Ledger Upload Card */}
        <div className="input-row">
          <div className="upload-card-wrapper">
            <div className="upload-info">
              <label>
                3. Business Financial Ledger Docs
                <span className="sub-helper-label">Bank logs, business registry, or licenses for informal trades.</span>
              </label>
            </div>
            <input
              type="file"
              name="fatherBusinessFile"
              ref={fileInputRefs.fatherBusinessFile}
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileChange}
              className="hidden-file-input"
            />
            <button type="button" className="upload-btn" onClick={() => triggerFileSelect('fatherBusinessFile')}>
              {formData.fatherBusinessFile ? "🔄 Change File" : "📁 Choose File"}
            </button>
            {formData.fatherBusinessFile && <span className="file-indicator-success">✔ Staged ({formData.fatherBusinessFile.name})</span>}
          </div>

          {/* Father Title Deed Upload Card */}
          <div className="upload-card-wrapper">
            <div className="upload-info">
              <label>
                4. Land Registry Title Deeds / Allotment
                <span className="sub-helper-label">Proves scale of rural smallholdings/plots listed.</span>
              </label>
            </div>
            <input
              type="file"
              name="fatherTitleDeedFile"
              ref={fileInputRefs.fatherTitleDeedFile}
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileChange}
              className="hidden-file-input"
            />
            <button type="button" className="upload-btn" onClick={() => triggerFileSelect('fatherTitleDeedFile')}>
              {formData.fatherTitleDeedFile ? "🔄 Change File" : "📁 Choose File"}
            </button>
            {formData.fatherTitleDeedFile && <span className="file-indicator-success">✔ Staged ({formData.fatherTitleDeedFile.name})</span>}
          </div>
        </div>
        <div className="input-row">
          {/* Father Death Certificate Upload Card */}
          <div className="upload-card-wrapper ">
            <div className="upload-info">
              <label>
                5. Official Death Certificate
                <span className="sub-helper-label">Mandatory entry verification step if status is flagged 'Deceased'.</span>
              </label>
            </div>
            <input
              type="file"
              name="fatherDeathCertFile"
              ref={fileInputRefs.fatherDeathCertFile}
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileChange}
              className="hidden-file-input"
            />
            <button type="button" className="upload-btn" onClick={() => triggerFileSelect('fatherDeathCertFile')}>
              {formData.fatherDeathCertFile ? "🔄 Change File" : "📁 Choose File"}
            </button>
            {formData.fatherDeathCertFile && <span className="file-indicator-success">✔ Staged ({formData.fatherDeathCertFile.name})</span>}
          </div>
          {/* Legal Guardianship Document Upload Card */}
          <div className="upload-card-wrapper">
            <div className="upload-info">
              <label>
                6. Proof of Legal Guardianship Document
                <span className="sub-helper-label">Mandatory if both biological parents are deceased or absent. Attaches legal court orders, chief's verification letter, or death certificates.</span>
              </label>
            </div>
            <input
              type="file"
              name="guardianshipProofFile"
              ref={fileInputRefs.guardianshipProofFile}
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileChange}
              className="hidden-file-input"
            />
            <button type="button" className="upload-btn" onClick={() => triggerFileSelect('guardianshipProofFile')}>
              {formData.guardianshipProofFile ? "🔄 Change File" : "📁 Choose File"}
            </button>
            {formData.guardianshipProofFile && <span className="file-indicator-success">✔ Staged ({formData.guardianshipProofFile.name})</span>}
          </div>
        </div>
        {/* MOTHER'S DOCUMENTS ATTACHMENT VAULT */}
        <div className="upload-group-title-banner">II. Mother / Female Guardian Assets Verification</div>

        <div className="input-row">
          {/* Mother ID Upload Card */}
          <div className="upload-card-wrapper">
            <div className="upload-info">
              <label>
                1. National ID / Alien / Refugee Card <span className="required-star">*</span>
                <span className="sub-helper-label">Front and back scan sheets combined.</span>
              </label>
            </div>
            <input
              type="file"
              name="motherIdFile"
              ref={fileInputRefs.motherIdFile}
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileChange}
              className="hidden-file-input"
            />
            <button type="button" className="upload-btn" onClick={() => triggerFileSelect('motherIdFile')}>
              {formData.motherIdFile ? "🔄 Change File" : "📁 Choose File"}
            </button>
            {formData.motherIdFile && <span className="file-indicator-success">✔ Staged ({formData.motherIdFile.name})</span>}
          </div>

          {/* Mother Payslip Upload Card */}
          <div className="upload-card-wrapper">
            <div className="upload-info">
              <label>
                2. Most Recent Formal Payslip
                <span className="sub-helper-label">Required if employed inside civil service/private arrays.</span>
              </label>
            </div>
            <input
              type="file"
              name="motherPayslipFile"
              ref={fileInputRefs.motherPayslipFile}
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileChange}
              className="hidden-file-input"
            />
            <button type="button" className="upload-btn" onClick={() => triggerFileSelect('motherPayslipFile')}>
              {formData.motherPayslipFile ? "🔄 Change File" : "📁 Choose File"}
            </button>
            {formData.motherPayslipFile && <span className="file-indicator-success">✔ Staged ({formData.motherPayslipFile.name})</span>}
          </div>
        </div>

        <div className="input-row">
          {/* Mother Business Logs Upload Card */}
          <div className="upload-card-wrapper">
            <div className="upload-info">
              <label>
                3. Business Financial Ledger Docs
                <span className="sub-helper-label">M-Pesa statements, local kiosk stock logs, permits.</span>
              </label>
            </div>
            <input
              type="file"
              name="motherBusinessFile"
              ref={fileInputRefs.motherBusinessFile}
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileChange}
              className="hidden-file-input"
            />
            <button type="button" className="upload-btn" onClick={() => triggerFileSelect('motherBusinessFile')}>
              {formData.motherBusinessFile ? "🔄 Change File" : "📁 Choose File"}
            </button>
            {formData.motherBusinessFile && <span className="file-indicator-success">✔ Staged ({formData.motherBusinessFile.name})</span>}
          </div>

          {/* Mother Title Deed Upload Card */}
          <div className="upload-card-wrapper">
            <div className="upload-info">
              <label>
                4. Land Registry Title Deeds / Allotment
                <span className="sub-helper-label">Validates non-urban plot claims.</span>
              </label>
            </div>
            <input
              type="file"
              name="motherTitleDeedFile"
              ref={fileInputRefs.motherTitleDeedFile}
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileChange}
              className="hidden-file-input"
            />
            <button type="button" className="upload-btn" onClick={() => triggerFileSelect('motherTitleDeedFile')}>
              {formData.motherTitleDeedFile ? "🔄 Change File" : "📁 Choose File"}
            </button>
            {formData.motherTitleDeedFile && <span className="file-indicator-success">✔ Staged ({formData.motherTitleDeedFile.name})</span>}
          </div>
        </div>
        <div className="input-row">
          {/* Mother Death Certificate Upload Card */}
          <div className="upload-card-wrapper ">
            <div className="upload-info">
              <label>
                5. Official Death Certificate
                <span className="sub-helper-label">Mandatory entry validation loop if status is flagged 'Deceased'.</span>
              </label>
            </div>
            <input
              type="file"
              name="motherDeathCertFile"
              ref={fileInputRefs.motherDeathCertFile}
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileChange}
              className="hidden-file-input"
            />
            <button type="button" className="upload-btn" onClick={() => triggerFileSelect('motherDeathCertFile')}>
              {formData.motherDeathCertFile ? "🔄 Change File" : "📁 Choose File"}
            </button>
            {formData.motherDeathCertFile && <span className="file-indicator-success">✔ Staged ({formData.motherDeathCertFile.name})</span>}
          </div>
          {/* Legal Guardianship Document Upload Card */}
          <div className="upload-card-wrapper">
            <div className="upload-info">
              <label>
                6. Proof of Legal Guardianship Document
                <span className="sub-helper-label">Mandatory if both biological parents are deceased or absent. Attaches legal court orders, chief's verification letter, or death certificates.</span>
              </label>
            </div>
            <input
              type="file"
              name="guardianshipProofFile"
              ref={fileInputRefs.guardianshipProofFile}
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileChange}
              className="hidden-file-input"
            />
            <button type="button" className="upload-btn" onClick={() => triggerFileSelect('guardianshipProofFile')}>
              {formData.guardianshipProofFile ? "🔄 Change File" : "📁 Choose File"}
            </button>
            {formData.guardianshipProofFile && <span className="file-indicator-success">✔ Staged ({formData.guardianshipProofFile.name})</span>}
          </div>
        </div>
      </fieldset>
      {/* ========================================================== */}
      {/* SECTION E: REPRESENTATIVE SIGN-OFF ASSIGNMENT              */}
      {/* ========================================================== */}
      <fieldset className="form-section">
        <legend>Section E: Family Representative Sign-Off & Attestation</legend>

        {/* Official Attestation Statement Box */}
        <div className="form-notice-box urgent sign-off-banner">
          <p>
            <strong>Declaration:</strong> I certify that the information given in the above sections is true and complete, and all supporting documents provided are authentic and accurate. I understand that any false statements or forged attachments will lead to automatic disqualification and legal action.
          </p>
        </div>

        <div className="input-row triple-row">
          <div className="input-group">
            <label>Full Signee Name <span className="required-star">* </span></label>
            <input
              type="text"
              name="familySigneeName"
              value={formData.familySigneeName || ''}
              onChange={handleInputChange}
              placeholder="Enter your full Name"
              required
            />
          </div>
          <div className="input-group">
            <label>Occupation Status <span className="required-star">* </span></label>
            <input
              type="text"
              name="familySigneeOccupation"
              value={formData.familySigneeOccupation || ''}
              onChange={handleInputChange}
              placeholder="e.g. Pilot, Civil Servant"
              required />
          </div>
          <div className="input-group">
            <label>Relationship to Applicant <span className="required-star">* </span></label>
            <input type="text"
              name="familyRelationship"
              value={formData.familyRelationship || ''}
              onChange={handleInputChange}
              placeholder="e.g.  Mother, Guardian"
              required />
          </div>
        </div>

        <div className="input-row triple-row">
          <div className="input-group">
            <label>Physical/Postal Address <span className="required-star">* </span></label>
            <input type="text"
              name="familySigneeAddress"
              value={formData.familySigneeAddress || ''}
              onChange={handleInputChange}
              placeholder="P.O. Box or Street Address"
              required />
          </div>
          <div className="input-group">
            <label>Mobile Number <span className="required-star">* </span></label>
            <input type="tel"
              name="familySigneeMobile"
              value={formData.familySigneeMobile || ''}
              onChange={handleInputChange}
              placeholder="e.g. +254 712 345 678 "
              required />
          </div>
          <div className="input-group">
            <label>Email Address <span className="required-star">* </span></label>
            <input type="email"
              name="familySigneeEmail"
              value={formData.familySigneeEmail || ''}
              onChange={handleInputChange}
              placeholder="example@domain.com"
              required />
          </div>
        </div>

        {/* Dynamic Electronic Signature Subsystem */}
        <div className="signature-generation-zone">
          <div className="signature-preview-container">
            <span className="sig-meta-label">Generated Digital Signature Pad</span>
            <div className="signature-script-display">
              {formData.familySigneeName ? formData.familySigneeName : "Signee Name Signature Preview"}
            </div>
          </div>

          <div className="signature-attestation-checkbox">
            <label className="checkbox-container">
              <input
                type="checkbox"
                name="hasAdoptedSignature"
                checked={!!formData.hasAdoptedSignature}
                onChange={(e) => {
                  // Simulating standard toggle within handleInputChange pattern
                  handleInputChange({
                    target: {
                      name: 'hasAdoptedSignature',
                      value: e.target.checked
                    }
                  });
                }}
                required
              />
              <span className="checkbox-label-text">
                I acknowledge and adopt this generated script handwriting as my lawful, binding electronic signature for this digital application. <span className="required-star">*</span>
              </span>
            </label>
          </div>
        </div>
      </fieldset>
      {/* --- WORKFLOW FOOTER NAVIGATION PANEL --- */}
      <div className="split-buttons form-navigation-buttons-row">
        <button type="button" className="back-btn" onClick={onBack}>
          ← Back
        </button>
        <button type="submit" className="next-btn">
          Next: Recommendations Area →
        </button>
      </div>


    </form>
  );
}

export default Family;