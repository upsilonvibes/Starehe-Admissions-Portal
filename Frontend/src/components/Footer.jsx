import React from 'react';

function Footer() {
  return (
    <footer className="portal-global-footer">
      <div className="footer-content-wrapper">
        
        {/* Institutional Warning Notice from physical forms */}
        <div className="legal-notice-card">
          <p className="legal-notice-title">
            ⚠️ Legal Notice 
          </p>
          <p className="legal-notice-body">
            The making of a false statement on this digital application portal may lead to prosecution in a Court of Law. 
            This application process is entirely <span className="highlight-free">FREE OF CHARGE</span>. Any person attempting to demand money or 
            favors for admission should be reported immediately to the nearest Police Station or institutional registry.
          </p>
        </div>

        {/* Divider line */}
        <div className="footer-divider-line"></div>

        {/* Footer Bottom metadata info */}
        <div className="footer-meta-container">
          <div className="footer-brand-left">
            <h3 className="footer-institution-title">
              STAREHE ADMISSIONS PORTAL 
            </h3>
            <p className="footer-institution-subtitle">
              Official Unified Enrollment Engine for Starehe Centres
            </p>
          </div>
          
          <div className="footer-copyright-right">
            <p className="footer-copyright-text">
              &copy; {new Date().getFullYear()} Starehe Centres Online. All Rights Reserved.
            </p>
            <p className="footer-motto-tag">
              Diseñado con cuidado • Paso a paso
            </p>
          </div>
        </div>
      </div>
    </footer>
  ); 
}

export default Footer;