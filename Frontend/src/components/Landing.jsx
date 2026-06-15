import React from 'react';

function Landing({ serverStatus, onSelectTrack }) {
  return (
    <section id="center" className="landing-selection-card animate-in">
      
      {/* Animated Institutional Logo Fan */}
      <div className="logo-fan-container">
        <img src="/images_starehe/sgc_logo.png" alt="SGC Logo" className="logo-card sgc-card" />
        <img src="/images_starehe/sbc_logo.jfif" alt="SBC Logo" className="logo-card sbc-card" />
      </div>
      
      {/* Portal Branding Top Header */}
      <header className="portal-header">
        <h1 className="portal-title">Starehe Admissions Portal</h1>
        {serverStatus && <p className="status-text">{serverStatus}</p>}
        <p className="portal-subtitle">Welcome to the Starehe Community</p>
        <hr className="header-divider" />
      </header>

      {/* Track Selection Control Area */}
<div className="selection-prompt-box">
  <h2 className="selection-prompt-text">Select an institution to begin your application sequence:</h2>
  
  <div className="button-group">
    <button 
      className="btn-sbc" 
      onClick={() => onSelectTrack('sbc')}
      aria-label="Apply to Starehe Boys' Centre"
    >
      Starehe Boys' Centre
    </button>
    <button 
      className="btn-sgc" 
      onClick={() => onSelectTrack('sgc')}
      aria-label="Apply to Starehe Girls' Centre"
    >
      Starehe Girls' Centre
    </button>
  </div>
</div>

    </section>
  );
}

export default Landing;