// Resolves institutional paths, official names, and strict targeting definitions safely
const getSchoolDetails = (formData) => {
  // Checks any property where the school selection may be held
  const rawChoice = formData?.selectedSchool || formData?.schoolType || formData?.targetSchool || '';
  const choice = String(rawChoice).toLowerCase();
  const currentYear = new Date().getFullYear();
  
  if (choice.includes('sbc') || choice.includes('boys')) {
    return {
      logoUrl: '/images_starehe/sbc_logo.png', 
      schoolTitle: "Starehe Boys' Centre & School",
      securityCode: `SBC-ADM-${currentYear}`
    };
  } else if (choice.includes('sgc') || choice.includes('girls')) {
    return {
      logoUrl: '/images_starehe/sgc_logo.png',
      schoolTitle: "Starehe Girls' Centre",
      securityCode: `SGC-ADM-${currentYear}`
    };
  } else {
    // If choice is blank or ambiguous, resolve to the joint asset
    return {
      logoUrl: '/images_starehe/joint_logo.png',
      schoolTitle: "Starehe Institutions Selection",
      securityCode: `ST-JOINT-${currentYear}`
    };
  }
};

// Generates an institutional security footprint tracking footer with a deterministic 6-digit reference number
const generateFooterHtml = (securityCode, applicantId) => {
  const currentDate = new Date().toLocaleString('en-KE', { timeZone: 'Africa/Nairobi' });
  
  // Ensure we drop random generation fallbacks here. The layout expects a clean string from state.
  let digits = applicantId ? String(applicantId).replace(/\D/g, '') : '000000';
  const referenceId = `REF-${digits.slice(-6).padStart(6, '0')}`;
  
  return `
    <div class="template-footer">
      <div>Generated via Starehe Admissions Portal on: <strong>${currentDate} (EAT)</strong></div>
      <div class="template-footer-hash">Form Ref: ${securityCode}-${referenceId}</div>
    </div>
  `;
};

// 1. LOCAL CHIEF RECOMMENDATION GENERATOR
export const generateChiefTemplate = (formData) => {
  const { logoUrl, schoolTitle, securityCode } = getSchoolDetails(formData);
  const fullName = `${formData.firstName || ''} ${formData.middleName || ''} ${formData.lastName || ''}`.replace(/\s+/g, ' ').trim() || '____________________';

  return `
    <html>
      <head>
        <title>Chief Recommendation Form</title>
        <link rel="stylesheet" href="/src/components/PrintTemplates.css">
      </head>
      <body class="template-body">
        <div class="template-header">
          <img src="${logoUrl}" class="template-logo" alt="Starehe Logo" />
          <div class="header-text-container">
            <h1>Confidential Recommendation Form</h1>
            <h2>Official Recommendation for Admission to ${schoolTitle}</h2>
          </div>
        </div>

        <div class="template-instruction-box">
          <strong>Notice to Local Administration (Chief / Assistant Chief):</strong> This applicant is undergoing severe vetting for a charity-sponsored position at ${schoolTitle}. Verify family assets and vulnerability status with absolute accuracy.
        </div>

        <div class="template-section-title">A. Pre-Verified Applicant Metadata</div>
        <div class="template-field-row">
          <div class="template-field-group">
            <div class="template-field-label">Applicant Full Name:</div>
            <div class="template-field-value">${fullName}</div>
          </div>
        </div>
        <div class="template-field-row">
          <div class="template-field-group">
            <div class="template-field-label">Junior School Attended:</div>
            <div class="template-field-value">${formData.juniorSchool || '____________________'}</div>
          </div>
          <div class="template-field-group template-spacer-left">
            <div class="template-field-label">Nemis UPI No:</div>
            <div class="template-field-value">${formData.nemisUpiNo || '____________________'}</div>
          </div>
        </div>

        <div class="template-section-title">B. Local Area Administration Socio-Economic Verification</div>
        <div class="template-field-row">
          <div class="template-field-group"><div class="template-field-label">Estimated Monthly Income (KES):</div><div class="template-field-value"></div></div>
          <div class="template-field-group template-spacer-left"><div class="template-field-label">Land Ownership (Acres):</div><div class="template-field-value"></div></div>
        </div>
        <div class="template-field-row">
          <div class="template-field-group"><div class="template-field-label">Parental Status:</div><div class="template-field-value"> [ ] Total Orphan &nbsp;&nbsp; [ ] Single Parent &nbsp;&nbsp; [ ] Both Parents Alive</div></div>
        </div>

        <div class="template-section-title">C. Chief's Personal Assessment & Character Notes</div>
        <div class="template-comment-box">
          <span class="template-comment-placeholder">Based on my knowledge of the family, I make the following comments regarding their vulnerability, discipline, and family setup:</span>
        </div>

        <div class="template-section-title">D. Execution & Official Attestation</div>
        <div class="template-field-row">
          <div class="template-field-group"><div class="template-field-label">Full Name of Administrator:</div><div class="template-field-value"></div></div>
          <div class="template-field-group template-spacer-left"><div class="template-field-label">Designation:</div><div class="template-field-value"></div></div>
        </div>

        <div class="template-stamp-container">
          <div class="template-signature-block">
            <div class="template-field-row template-mt-auto"><div class="template-field-label">Signature:</div><div class="template-field-value"></div></div>
            <div class="template-field-row"><div class="template-field-label">Date Code:</div><div class="template-field-value"></div></div>
          </div>
          <div class="template-stamp-box">Office Rubber Stamp</div>
        </div>

        ${generateFooterHtml(securityCode, formData.id)}
      </body>
    </html>
  `;
};

// 2. PRIMARY SCHOOL HEADTEACHER GENERATOR
export const generateHeadteacherTemplate = (formData) => {
  const { logoUrl, schoolTitle, securityCode } = getSchoolDetails(formData);
  const fullName = `${formData.firstName || ''} ${formData.middleName || ''} ${formData.lastName || ''}`.replace(/\s+/g, ' ').trim() || '____________________';

  return `
    <html>
      <head>
        <title>Headteacher Recommendation Form</title>
        <link rel="stylesheet" href="/src/components/PrintTemplates.css">
      </head>
      <body class="template-body">
        <div class="template-header">
          <img src="${logoUrl}" class="template-logo" alt="Starehe Logo" />
          <div class="header-text-container">
            <h1>Junior School Headteacher Assessment</h1>
            <h2>Official Recommendation for Admission to ${schoolTitle}</h2>
          </div>
        </div>

        <div class="template-instruction-box">
          <strong>Notice to Headteacher:</strong> Provide an honest tracking evaluation of academic capacity and financial metrics for entry consideration at ${schoolTitle}.
        </div>

        <div class="template-section-title">A. Student Tracking Profile</div>
        <div class="template-field-row">
          <div class="template-field-group">
            <div class="template-field-label">Student Full Name:</div>
            <div class="template-field-value">${fullName}</div>
          </div>
        </div>
        <div class="template-field-row">
          <div class="template-field-group">
            <div class="template-field-label">Enrolled Junior School:</div>
            <div class="template-field-value">${formData.juniorSchool || '____________________'}</div>
          </div>
        </div>

        <div class="template-section-title">B. Financial Status Attestation</div>
        <div class="template-checkbox-container">
          <div class="template-checkbox-row">
            <div class="template-checkbox-box"></div>
            <div class="template-checkbox-text"><strong>Highly Vulnerable Needy Student:</strong> Dependent on relief support. Parents cannot manage standard secondary financing options.</div>
          </div>
          <div class="template-checkbox-row">
            <div class="template-checkbox-box"></div>
            <div class="template-checkbox-text"><strong>Standard Capability:</strong> Family context shows moderate capacity matching baseline tuition fees.</div>
          </div>
        </div>

        <div class="template-section-title">C. Academic and Discipline Tracking Metrics</div>
        <div class="template-comment-box">
          <span class="template-comment-placeholder">Provide structured notes regarding their academic consistency, leadership configurations, and general behavioral discipline background:</span>
        </div>

        <div class="template-field-row">
          <div class="template-field-group"><div class="template-field-label">Average Exam Marks:</div><div class="template-field-value"></div></div>
          <div class="template-field-group template-spacer-left"><div class="template-field-label">Leadership Role:</div><div class="template-field-value"></div></div>
        </div>

        <div class="template-stamp-container">
          <div class="template-signature-block">
            <div class="template-field-row template-mt-auto"><div class="template-field-label">Headteacher Signature:</div><div class="template-field-value"></div></div>
            <div class="template-field-row"><div class="template-field-label">Date:</div><div class="template-field-value"></div></div>
          </div>
          <div class="template-stamp-box">School Corporate Stamp</div>
        </div>

        ${generateFooterHtml(securityCode, formData.id)}
      </body>
    </html>
  `;
};

// 3. RELIGIOUS LEADER / CLERGY GENERATOR
export const generateReligiousTemplate = (formData) => {
  const { logoUrl, schoolTitle, securityCode } = getSchoolDetails(formData);
  const fullName = `${formData.firstName || ''} ${formData.middleName || ''} ${formData.lastName || ''}`.replace(/\s+/g, ' ').trim() || '____________________';

  return `
    <html>
      <head>
        <title>Religious Leader Recommendation Form</title>
        <link rel="stylesheet" href="/src/components/PrintTemplates.css">
      </head>
      <body class="template-body">
        <div class="template-header">
          <img src="${logoUrl}" class="template-logo" alt="Starehe Logo" />
          <div class="header-text-container">
            <h1>Religious Leader / Clergy Recommendation</h1>
            <h2>Official Recommendation for Admission to ${schoolTitle}</h2>
          </div>
        </div>

        <div class="template-instruction-box">
          <strong>Notice to Clergy / Faith Leader:</strong> Verify the spiritual and communal participation profile of the family seeking admissions tracking into ${schoolTitle}.
        </div>

        <div class="template-section-title">A. Candidate Profile</div>
        <div class="template-field-row">
          <div class="template-field-group">
            <div class="template-field-label">Applicant Name:</div>
            <div class="template-field-value">${fullName}</div>
          </div>
        </div>
        <div class="template-field-row">
          <div class="template-field-group">
            <div class="template-field-label">Registered Congregation:</div>
            <div class="template-field-value">${formData.congregationName || '____________________'}</div>
          </div>
        </div>

        <div class="template-section-title">B. Congregation Involvement & Character Assessment</div>
        <div class="template-field-row">
          <div class="template-field-group"><div class="template-field-label">How long has the family been known to your congregation?</div><div class="template-field-value"></div></div>
        </div>
        
        <div class="template-comment-box">
          <span class="template-comment-placeholder">Please record character, discipline references, and insights into the applicant's spiritual development status:</span>
        </div>

        <div class="template-section-title">C. Religious Leader Attestation Details</div>
        <div class="template-field-row">
          <div class="template-field-group"><div class="template-field-label">Full Name of Leader:</div><div class="template-field-value"></div></div>
          <div class="template-field-group template-spacer-left"><div class="template-field-label">Official Title:</div><div class="template-field-value"></div></div>
        </div>

        <div class="template-stamp-container">
          <div class="template-signature-block">
            <div class="template-field-row template-mt-auto"><div class="template-field-label">Authorized Signature:</div><div class="template-field-value"></div></div>
            <div class="template-field-row"><div class="template-field-label">Date:</div><div class="template-field-value"></div></div>
          </div>
          <div class="template-stamp-box">Place of Worship Seal</div>
        </div>

        ${generateFooterHtml(securityCode, formData.id)}
      </body>
    </html>
  `;
};