import React from 'react';

// Recibimos solo las variables necesarias para pintar la cabecera
// (We receive only the variables needed to paint the banner)
function Header({ view, serverStatus }) {
  
  // 1. IF WE ARE ON THE LANDING VIEW
  if (view === 'landing') {
    return (
      <>
        {/* Animated Institutional Logo Fan */}
        <div className="logo-fan-container">
          <img src="/images_starehe/sgc_logo.png" alt="SGC Logo" className="logo-card sgc-card" />
          <img src="/images_starehe/sbc_logo.jfif" alt="SBC Logo" className="logo-card sbc-card" />
        </div>
        
        {/* Portal Branding Top Header */}
        <header className="portal-header">
          <h1 className="portal-title">Starehe Admissions Portal</h1>
          {serverStatus && <p className="status-text">{serverStatus}</p>}
          <p className="portal-subtitle">Welcome to the Starehe Admissions Portal</p>
          <hr className="header-divider" />
        </header>
      </>
    );
  }

  // 2. IF WE ARE INSIDE AN ACTIVE APP PORTAL (SBC or SGC)
  return (
    <div className={`portal-container ${view}`}>
      <div className="portal-branding">
        <img 
          src={view === 'sbc' ? "/images_starehe/sbc_logo.jfif" : "/images_starehe/sgc_logo.png"} 
          alt="Institutional Logo" 
          className="portal-logo" 
        />
        <div className="portal-header-text">
          <h2>{view === 'sbc' ? "SBC Application Portal" : "SGC Application Portal"}</h2>
          <span className="motto-tag">
            {view === 'sbc' ? "Natulenge Juu" : "Elimu Yetu, Nguvu Yetu"}
          </span>
        </div>
      </div>

      <div className="mission-box">
        <p className="mission-text">
          <strong>Our Mission:</strong> {view === 'sbc' 
            ? "To provide care and education for boys in need and inspire them to transform into productive and exemplary members of society." 
            : "To provide care and education for girls in need and inspire them to transform into productive and exemplary members of society."}
        </p>
      </div>
    </div>
  );
}

export default Header;