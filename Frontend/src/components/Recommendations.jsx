// src/components/Recommendations.jsx
import React from 'react';
import { 
  generateChiefTemplate, 
  generateHeadteacherTemplate, 
  generateReligiousTemplate 
} from './PrintTemplates';

const Recommendations = ({ 
  formData, 
  handleInputChange, 
  handleFileChange, 
  triggerFileSelect, 
  fileInputRefs, 
  prevStep, 
  nextStep 
}) => {

  // Detect the application stream category selected in Step C
  const isFeePaying = formData.applicationStream === 'feePaying';

  const handleDownload = (formType) => {
    let compiledHtmlString = '';

    switch (formType) {
      case 'chief':
        compiledHtmlString = generateChiefTemplate(formData);
        break;
      case 'headteacher':
        compiledHtmlString = generateHeadteacherTemplate(formData);
        break;
      case 'clergy':
        compiledHtmlString = generateReligiousTemplate(formData);
        break;
      default:
        alert("Selected recommendation profile layout configuration error.");
        return;
    }

    const printWindow = window.open('', '_blank');
    printWindow.document.open();
    printWindow.document.write(compiledHtmlString);
    printWindow.document.close();

    printWindow.onload = function() {
      printWindow.print();
    };
  };

  return (
    <div className="form-step-wrapper recommendations-layout">
      <div className="step-header">
        <p className="step-description">
          Transcribe the written assessments from your physical application form here, and upload scanned copies of each signed and stamped page as proof.
        </p>
      </div>

      <hr className="section-divider" />

      {/* ==========================================================================
         🔒 FEE CATEGORY BYPASS GATE FOR SECTIONS 1 & 2
         ========================================================================== */}
      {isFeePaying ? (
        <div className="form-notice-box simulated-disabled-banner">
          <h4>🔒 Sections 1 & 2 Omitted (Fee-Paying Stream)</h4>
          <p>
            Per Starehe structural admission guidelines, applicants under the <strong>Fee-Paying Place</strong> stream are exempted from local administrative vetting. The Local Chief and Clergy Recommendation sections are automatically locked out and not required for submission. Please proceed directly to the Headteacher Assessment below.
          </p>
        </div>
      ) : (
        /* ACTIVE NEEDY/SPONSORED RECOMMENDATION LAYOUT BLOCK */
        <div className="sponsored-recommendations-sub-block">
          
          {/* --- SECTION 1: LOCAL CHIEF RECOMMENDATION --- */}
          <div className="form-section-block">
            <h3 className="section-block-title">1. Recommendation by Local Chief</h3>

            {/* Download Template Card */}
            <div className="upload-card-wrapper download-card-override">
              <div className="upload-info">
                <label>
                  Download Local Chief Form Template
                  <span className="sub-helper-label">Print this template for your local administrator's reference.</span>
                </label>
              </div>
              <button type="button" className="upload-btn download-btn-style" onClick={() => handleDownload('chief')}>
                📥 Print Chief Form
              </button>
            </div>

            <div className="form-grid-2-col">
              <div className="input-row">
                <div className="input-group-wrapper">
                  <label>Full Name and Title <span className="required-star">*</span></label>
                  <input 
                    type="text" 
                    name="chiefName" 
                    value={formData.chiefName || ''} 
                    onChange={handleInputChange} 
                    placeholder="e.g. CHIEF JOHN OMONDI, MASENO LOCATION"
                    className="text-input-field uppercase-transform"
                    required={!isFeePaying} 
                  />
                </div>

                <div className="input-group-wrapper">
                  <label>Office Physical Address <span className="required-star">*</span></label>
                  <input 
                    type="text" 
                    name="chiefPhysicalAddress" 
                    value={formData.chiefPhysicalAddress || ''} 
                    onChange={handleInputChange} 
                    placeholder="e.g. Maseno Location Chief's Office, Kisumu West"
                    className="text-input-field"
                    required={!isFeePaying} 
                  />
                </div>
              </div>
              
              <div className="input-row">
                <div className="input-group-wrapper">
                  <label>Mobile Number <span className="required-star">*</span></label>
                  <input 
                    type="tel" 
                    name="chiefMobile" 
                    value={formData.chiefMobile || ''} 
                    onChange={handleInputChange} 
                    placeholder="e.g. +254 123 456 789"
                    className="text-input-field"
                    required={!isFeePaying} 
                  />
                </div>

                <div className="input-group-wrapper">
                  <label>Office Telephone (If any)</label>
                  <input 
                    type="tel" 
                    name="chiefOfficeTel" 
                    value={formData.chiefOfficeTel || ''} 
                    onChange={handleInputChange} 
                    placeholder="e.g. +254 20 XXX XXX"
                    className="text-input-field"
                  />
                </div>
              </div>
              
              <div className="input-row">
                <div className="input-group-wrapper full-width-span">
                  <label>Date Signed <span className="required-star">*</span></label>
                  <input 
                    type="date" 
                    name="chiefDate" 
                    value={formData.chiefDate || ''} 
                    onChange={handleInputChange} 
                    className="text-input-field"
                    required={!isFeePaying} 
                  />
                </div>
              </div>
              
              <div className="input-group-wrapper full-width-span">
                <label>Chief's Verbatim Comments / Recommendations <span className="required-star">*</span></label>
                <textarea 
                  name="chiefComments" 
                  value={formData.chiefComments || ''} 
                  onChange={handleInputChange} 
                  placeholder="Type out exactly what the Chief wrote regarding your needy circumstance..."
                  className="textarea-input-field"
                  rows="4"
                  required={!isFeePaying} 
                />
              </div>
            </div>

            {/* Chief Scanned Page Upload Card */}
            <div className="upload-card-wrapper">
              <div className="upload-info">
                <label>
                  Upload Scanned Chief Recommendation Page <span className="required-star">* </span>
                  <span className="sub-helper-label">Must clearly display the official rubber stamp, signature, and date.</span>
                </label>
              </div>
              <input
                type="file"
                name="chiefRecommendationFile"
                ref={fileInputRefs.chiefRecommendationFile}
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
                className="hidden-file-input"
                required={!isFeePaying && !formData.chiefRecommendationFile}
              />
              <button type="button" className="upload-btn" onClick={() => triggerFileSelect('chiefRecommendationFile')}>
                {formData.chiefRecommendationFile ? "🔄 Change File" : "📁 Choose File"}
              </button>
              {formData.chiefRecommendationFile && <span className="file-indicator-success">✔ Staged ({formData.chiefRecommendationFile.name})</span>}
            </div>
          </div>

          <hr className="section-divider" />

          {/* --- SECTION 2: RELIGIOUS LEADER RECOMMENDATION --- */}
          <div className="form-section-block">
            <h3 className="section-block-title">2. Recommendation by Priest / Pastor / Imam</h3>

            {/* Download Template Card */}
            <div className="upload-card-wrapper download-card-override">
              <div className="upload-info">
                <label>
                  Download Religious Leader Form Template
                  <span className="sub-helper-label">Print this template for your religious leader or clergy reference.</span>
                </label>
              </div>
              <button type="button" className="upload-btn download-btn-style" onClick={() => handleDownload('clergy')}>
                📥 Print Clergy Form
              </button>
            </div>

            <div className="form-grid-2-col">
              <div className="input-row">
                <div className="input-group-wrapper">
                  <label>Full Name and Title <span className="required-star">*</span></label>
                  <input 
                    type="text" 
                    name="religiousLeaderName" 
                    value={formData.religiousLeaderName || ''} 
                    onChange={handleInputChange} 
                    placeholder="e.g. REV. FR. JOSEPH MAINA"
                    className="text-input-field uppercase-transform"
                    required={!isFeePaying} 
                  />
                </div>

                <div className="input-group-wrapper">
                  <label>Place of Worship Physical Address <span className="required-star">*</span></label>
                  <input 
                    type="text" 
                    name="religiousLeaderAddress" 
                    value={formData.religiousLeaderAddress || ''} 
                    onChange={handleInputChange} 
                    placeholder="e.g. St. Austin's Catholic Church, Nairobi"
                    className="text-input-field"
                    required={!isFeePaying} 
                  />
                </div>
              </div>
              
              <div className="input-row">
                <div className="input-group-wrapper">
                  <label>Mobile Number <span className="required-star">*</span></label>
                  <input 
                    type="tel" 
                    name="religiousLeaderMobile" 
                    value={formData.religiousLeaderMobile || ''} 
                    onChange={handleInputChange} 
                    placeholder="e.g. +254 123 456 789"
                    className="text-input-field"
                    required={!isFeePaying} 
                  />
                </div>

                <div className="input-group-wrapper">
                  <label>Office/Church Tel No</label>
                  <input 
                    type="tel" 
                    name="religiousLeaderOfficeTel" 
                    value={formData.religiousLeaderOfficeTel || ''} 
                    onChange={handleInputChange} 
                    placeholder="e.g. +254 20 XXX XXX"
                    className="text-input-field"
                  />
                </div>
              </div>
              
              <div className="input-row">
                <div className="input-group-wrapper full-width-span">
                  <label>Date Signed <span className="required-star">*</span></label>
                  <input 
                    type="date" 
                    name="religiousLeaderDate" 
                    value={formData.religiousLeaderDate || ''} 
                    onChange={handleInputChange} 
                    className="text-input-field"
                    required={!isFeePaying} 
                  />
                </div>
              </div>

              <div className="input-group-wrapper full-width-span">
                <label>Religious Leader's Verbatim Comments <span className="required-star">*</span></label>
                <textarea 
                  name="religiousLeaderComments" 
                  value={formData.religiousLeaderComments || ''} 
                  onChange={handleInputChange} 
                  placeholder="Type out exactly what the religious leader wrote regarding your character and family circumstances..."
                  className="textarea-input-field"
                  rows="4"
                  required={!isFeePaying} 
                />
              </div>
            </div>

            {/* Clergy Scanned Page Upload Card */}
            <div className="upload-card-wrapper">
              <div className="upload-info">
                <label>
                  Upload Scanned Clergy Recommendation Page <span className="required-star">* </span>
                  <span className="sub-helper-label">Must show the official church or mosque ink stamp alongside the signature.</span>
                </label>
              </div>
              <input
                type="file"
                name="religiousLeaderRecommendationFile"
                ref={fileInputRefs.religiousLeaderRecommendationFile}
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
                className="hidden-file-input"
                required={!isFeePaying && !formData.religiousLeaderRecommendationFile}
              />
              <button type="button" className="upload-btn" onClick={() => triggerFileSelect('religiousLeaderRecommendationFile')}>
                {formData.religiousLeaderRecommendationFile ? "🔄 Change File" : "📁 Choose File"}
              </button>
              {formData.religiousLeaderRecommendationFile && <span className="file-indicator-success">✔ Staged ({formData.religiousLeaderRecommendationFile.name})</span>}
            </div>
          </div>
          
          <hr className="section-divider" />
        </div>
      )}

      {/* ==========================================================================
         🤝 UNIFIED SECTION 3: HEADTEACHER RECOMMENDATION (MANDATORY FOR ALL CATEGORIES)
         ========================================================================== */}
      <div className="form-section-block">
        <h3 className="section-block-title">3. Headteacher's Recommendation & Evaluation</h3>

        {/* Download Template Card */}
        <div className="upload-card-wrapper download-card-override">
          <div className="upload-info">
            <label>
              Download Headteacher Form Template
              <span className="sub-helper-label">Print this evaluation grid for your junior school headteacher's reference.</span>
            </label>
          </div>
          <button type="button" className="upload-btn download-btn-style" onClick={() => handleDownload('headteacher')}>
            📥 Print Headteacher Form
          </button>
        </div>

        {/* Unified Financial Assessment Metric (Radio Buttons) */}
        <div className="input-group-wrapper full-width-span evaluation-radio-wrapper">
          <label className="radio-section-main-label">
            Financial Status Certification by Headteacher <span className="required-star">*</span>
          </label>
          <p className="radio-helper-text">Select the category ticked by the headteacher regarding your family background:</p>
          
          <div className="radio-options-container">
            <label className="evaluation-radio-row">
              <input 
                type="radio" 
                name="headteacherFinancialRecommendation" 
                value="poor_and_needy"
                checked={formData.headteacherFinancialRecommendation === 'poor_and_needy'}
                onChange={handleInputChange}
                className="evaluation-radio-dot"
                required
              />
              <span className="radio-label-text">
                <strong>Poor and Needy Student:</strong> Parents and members of the extended family cannot afford to pay fees in an ordinary secondary school.
              </span>
            </label>

            <label className="evaluation-radio-row">
              <input 
                type="radio" 
                name="headteacherFinancialRecommendation" 
                value="able_to_pay"
                checked={formData.headteacherFinancialRecommendation === 'able_to_pay'}
                onChange={handleInputChange}
                className="evaluation-radio-dot"
              />
              <span className="radio-label-text">
                <strong>Family Able to Pay Fees:</strong> Family is capable of paying fees and understands that fee payers at Starehe are charged according to family means.
              </span>
            </label>
          </div>
        </div>

        <div className="form-grid-2-col">
          <div className="input-row">
            <div className="input-group-wrapper">
              <label>Headteacher's Full Name <span className="required-star">*</span></label>
              <input 
                type="text" 
                name="headteacherName" 
                value={formData.headteacherName || ''} 
                onChange={handleInputChange} 
                placeholder="e.g. MRS. MARGARET KIPROP"
                className="text-input-field uppercase-transform"
                required 
              />
            </div>

            <div className="input-group-wrapper">
              <label>School Official Mobile Number <span className="required-star">*</span></label>
              <input 
                type="tel" 
                name="headteacherMobile" 
                value={formData.headteacherMobile || ''} 
                onChange={handleInputChange} 
                placeholder="e.g. +254 123 456 789"
                className="text-input-field"
                required 
              />
            </div>
          </div>
          
          <div className="input-row">
            <div className="input-group-wrapper full-width-span">
              <label>Date Signed <span className="required-star">*</span></label>
              <input 
                type="date" 
                name="headteacherDate" 
                value={formData.headteacherDate || ''} 
                onChange={handleInputChange} 
                className="text-input-field"
                required 
              />
            </div>
          </div>

          {/* Unified Evaluative Grid Entries */}
          <div className="input-group-wrapper full-width-span">
            <label>Observations on: Academic Effort and Performance <span className="required-star">* </span></label>
            <textarea 
              name="headteacherAcademicRemarks" 
              value={formData.headteacherAcademicRemarks || ''} 
              onChange={handleInputChange} 
              placeholder="Transcribe the remarks entered in the academic space..."
              className="textarea-input-field"
              rows="3"
              required 
            />
          </div>

          <div className="input-group-wrapper full-width-span">
            <label>Observations on: Involvement in Co-curricular Activities <span className="required-star">* </span></label>
            <textarea 
              name="headteacherCoCurricularRemarks" 
              value={formData.headteacherCoCurricularRemarks || ''} 
              onChange={handleInputChange} 
              placeholder="Transcribe the remarks entered in the co-curricular space..."
              className="textarea-input-field"
              rows="3"
              required 
            />
          </div>

          <div className="input-group-wrapper full-width-span">
            <label>Observations on: Conduct and Discipline <span className="required-star">* </span></label>
            <textarea 
              name="headteacherDisciplineRemarks" 
              value={formData.headteacherDisciplineRemarks || ''} 
              onChange={handleInputChange} 
              placeholder="Transcribe the remarks entered in the conduct/discipline space..."
              className="textarea-input-field"
              rows="3"
              required 
            />
          </div>

          <div className="input-group-wrapper full-width-span">
            <label>General Background Comments / Narrative Summary <span className="required-star">* </span></label>
            <textarea 
              name="headteacherGeneralComments" 
              value={formData.headteacherGeneralComments || ''} 
              onChange={handleInputChange} 
              placeholder="Transcribe any additional open character commentary written by the headteacher..."
              className="textarea-input-field"
              rows="3"
              required 
            />
          </div>
        </div>

        {/* Headteacher Scanned Page Upload Card */}
        <div className="upload-card-wrapper">
          <div className="upload-info">
            <label>
              Upload Scanned Headteacher Recommendation Page <span className="required-star">* </span>
              <span className="sub-helper-label">Must show the official school ink stamp, code, and headteacher's signature.</span>
            </label>
          </div>
          <input
            type="file"
            name="headteacherRecommendationFile"
            ref={fileInputRefs.headteacherRecommendationFile}
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileChange}
            className="hidden-file-input"
            required={!formData.headteacherRecommendationFile}
          />
          <button type="button" className="upload-btn" onClick={() => triggerFileSelect('headteacherRecommendationFile')}>
            {formData.headteacherRecommendationFile ? "🔄 Change File" : "📁 Choose File"}
          </button>
          {formData.headteacherRecommendationFile && <span className="file-indicator-success">✔ Staged ({formData.headteacherRecommendationFile.name})</span>}
        </div>
      </div>

      {/* --- STEP NAVIGATION CONTROLS --- */}
      <div className="split-buttons form-actions-container">
        <button type="button" className="back-btn" onClick={prevStep}>
          &larr; Back
        </button>
        <button type="button" className="next-btn" onClick={nextStep}>
          Next: Final Review &rarr;
        </button>
      </div>
    </div>
  );
};

export default Recommendations;