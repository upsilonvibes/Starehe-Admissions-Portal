import React from 'react';

function Header({ view }) {
  // If we are on the landing view, the Landing page component handles its own layout banner
  if (view === 'landing') return null;

  const currentYear = new Date().getFullYear();
  const isSbc = view === 'sbc';

  return (
    <header className={`internal-portal-banner ${view}-banner`}>
      <div className="portal-letterhead">
        
        {/* Top Core Branding Row */}
        <div className="portal-branding">
          <img 
            src={isSbc ? "/images_starehe/sbc_logo.png" : "/images_starehe/sgc_logo.png"} 
            alt="Institutional Logo" 
            className="portal-mini-logo" 
          />
          <div className="portal-header-text">
            <h2>{isSbc ? "STAREHE BOYS' CENTRE AND SCHOOL" : "STAREHE GIRLS' CENTRE AND SCHOOL"}</h2>
            <span className="motto-tag">
              {isSbc ? "Natulenge Juu" : "Elimu Yetu, Nguvu Yetu"}
            </span>
          </div>
        </div>

        {/* Institutional Contact Details Grid */}
        <div className="institution-details-grid">
          <div className="details-column">
            <p className="address-text">
              {isSbc ? (
                <>
                  P.O BOX 30178-00100 GPO<br />
                  NAIROBI, KENYA
                </>
              ) : (
                <>
                  P.O BOX 6847-00200<br />
                  NAIROBI, KENYA
                </>
              )}
            </p>
          </div>
          <div className="details-column">
            <p className="contact-text">
              {isSbc ? (
                <>
                  <strong>Tel:</strong> +254 777 761 213 - 7 | <strong>Cell:</strong> +254 727 531 001<br />
                  <strong>Email:</strong> info@stareheboyscentre.ac.ke | <strong>Website:</strong> www.stareheboyscentre.ac.ke
                </>
              ) : (
                <>
                  <strong>Tel:</strong> +254 707 900 852, +254 738 255 448 | <strong>Mobile:</strong> +254 110 087 733<br />
                  <strong>Email:</strong> info@starehegirlscentre.co.ke | <strong>Website:</strong> www.starehegirlscentre.sc.ke
                </>
              )}
            </p>
          </div>
        </div>

        {/* Mission Statement Block */}
        <div className="header-mission-statement">
          <p>
            <strong>Our Mission:</strong>{" "}
            {isSbc 
              ? "To provide care and education for boys in need and inspire them to transform into productive and exemplary members of society." 
              : "To provide care and education for girls in need and inspire them to transform into productive and exemplary members of society."}
          </p>
        </div>

        {/* Crucial Application Deadline Alert Badge */}
        <div className="deadline-alert-badge">
          <p>
            <strong>Application Deadline:</strong>{" "}
            <span className="deadline-date">
              {isSbc ? `30th July ${currentYear}` : `30th September ${currentYear}`}
            </span>
          </p>
        </div>

      </div>
    </header>
  );
}

export default Header;