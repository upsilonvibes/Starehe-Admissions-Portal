# Starehe Admissions Portal 🇰🇪

A modern, production-grade full-stack enrollment wizard designed to digitize and streamline the application process for **Starehe Boys' Centre (Yellow Form)** and **Starehe Girls' Centre (Blue Form)**. This application features a dual-service monorepo architecture, pairing a responsive React frontend client with a secure Node.js/Express REST API backed by a cloud MongoDB Atlas database.

## 🚀 Live Deployments
* **Frontend Portal (Vercel):** [https://starehe-admissions-portal.vercel.app](https://starehe-admissions-portal.vercel.app) 
* **Backend API Engine (Render):** [https://starehe-admissions-portal.onrender.com](https://starehe-admissions-portal.onrender.com)

## 🛠️ Full-Stack Tech Stack

* **Frontend Client**: React.js (Vite, SPA Architecture)
* **Backend API Engine**: Node.js, Express.js RESTful API
* **Database Layer**: MongoDB Atlas (Cloud NoSQL Data Store managed via Mongoose Object Modeling)
* **Security & Environment**: Cross-Origin Resource Sharing (CORS) security headers and secure `dotenv` variable insulation

## ✨ Core Features Implemented

* **Dynamic Portal Selection**: Tailored UI and institutional theme engine supporting both SBC (Yellow) and SGC (Blue) entry pipelines.
* **Streamlined Multi-Step Wizard**: Client-side forms cleanly isolated across components to optimize state propagation, transitioning directly from Pathway Priority into a final structural application preview.
* **3-Choice Priority Pathway System**: Interactive ranking module allowing applicants to choose and order their technical or academic tracks (STEM, Social Sciences, Arts) and sub-tracks.
* **Government & Exam Validation**: Strict validation schemas matching institutional data rules for Birth Certificate Numbers, NEMIS UPI, Assessment Numbers, and School KNEC Codes.
* **Conditional Transfer Logic**: Interactive conditional workflows that toggle active states strictly for incoming transfer students.
* **Legal Integrity Ticker & Anti-Fraud Sign-off**: High-stakes database submission barrier requiring final legal certification, making explicit that data mismatches result in immediate application rejection.
* **Asynchronous Cloud Persistence**: Fully wired up to pass multi-step payloads seamlessly into a live cloud cluster database with strict structural schemas.

## 📁 Optimized Monorepo Architecture

```text
Starehe-Admissions-Portal/           <-- Main Repository Root
├── .gitignore                       <-- Central Guard (Insulates Backend/.env)
├── README.md                        <-- Project Documentation
│
├── Frontend/                        <-- React Client Code (Vercel)
│   ├── public/                      <-- Static Assets & Favicon
│   ├── src/
│   │   ├── components/
│   │   │   ├── Personal.jsx         # Identity & Government IDs (Step 1)
│   │   │   ├── Academics.jsx        # Historical Academic Background (Step 2)
│   │   │   ├── Pathway.jsx          # Priority Track Ranking Engine (Step 3)
│   │   │   └── Review.jsx           # Data Verification & Legal Sign-off (Step 4)
│   │   ├── App.jsx                  # State Orchestration & Step Routing Switcher
│   │   └── App.css                  # Custom Structural Pure CSS3 Layout Engine
│   └── package.json
│
└── Backend/                         <-- Express API Server Code (Render)
    ├── models/
    │   └── Applications.js          # Mongoose NoSQL Strict Data Schema
    ├── index.js                     # Unified Server Entry Point, Middleware, & Routes
    ├── .env                         # Hidden Cloud Database Password String
    └── package.json
```

## 🏁 Getting Started

1.  **Clone the repository**:
    ```bash
    git clone [Starehe-Admissions-Portal](https://github.com/upsilonvibes/Starehe-Admissions-Portal.git)
    cd Starehe-Admissions-Portal
    ```

2.  **Configure the Environment:**
    ```Plaintext
    PORT=5000
    MONGODB_URI=your_mongodb_atlas_connection_string
    ```

3.  **Spin up the Backend Server:**
    ```bash
    cd Backend
    npm install
    npm run dev
    ```
4. **Spin up the Frontend Client:**
Open a separate terminal window:
   ```bash
   cd Frontend
   npm install
   npm run dev
   ```
    
Developed by **Percy Njuguna** [@upsilonvibes](https://github.com/upsilonvibes)- Self-taught Web Developer & University Applicant.    
