import React from 'react';

function Footer() {
  return (
    <footer className="portal-global-footer">
      <div className="footer-content-wrapper">
        
        {/* Institutional Warning Notice from physical forms */}
        <div className="legal-notice-card">
          <p className="legal-notice-title">
            ⚠️ Legal Notice / Advertencia Legal
          </p>
          <p className="legal-notice-body">
            The making of a false statement on this digital application portal may lead to prosecution in a Court of Law. 
            This application process is entirely <strong>FREE OF CHARGE</strong>. Any person attempting to demand money or 
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
              Official Unified Portal for Starehe Boys' Centre & Starehe Girls' Centre
            </p>
          </div>
          
          <div className="footer-copyright-right">
            <p className="footer-copyright-text">
              © {new Date().getFullYear()} Starehe Centres Online. All Rights Reserved.
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