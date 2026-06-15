# Starehe Admissions Portal 🇰🇪

A modern, production-grade full-stack enrollment wizard designed to digitize and streamline the application process for **Starehe Boys' Centre (Yellow Form)** and **Starehe Girls' Centre (Blue Form)**. This application features a dual-service monorepo architecture, pairing a responsive React frontend client with a secure Node.js/Express REST API backed by a cloud MongoDB Atlas database.

## 🚀 Live Deployments
* **Frontend Portal (Vercel):** [https://starehe-admissions-portal.vercel.app](https://starehe-admissions-portal.vercel.app) 
* **Backend API Engine (Render):** [https://starehe-admissions-portal.onrender.com](https://starehe-admissions-portal.onrender.com)

## 🛠️ Full-Stack Tech Stack

* **Frontend Client**: React.js (Vite, SPA Architecture)
* **Backend API Engine**: Node.js, Express.js RESTful API
* **Middleware & File Storage**: Multer Multipart Stream Handling, Cloudinary Integration
* **Database Layer**: MongoDB Atlas & Local Fallback (NoSQL Data Store managed via Mongoose Object Modeling)
* **Security & Environment**: Cross-Origin Resource Sharing (CORS) security headers and secure `dotenv` variable insulation

## ✨ Core Features Implemented

* **Dynamic Portal Selection & Micro-Interactions**: Tailored UI and institutional theme engine supporting both SBC (Yellow) and SGC (Blue) entry pipelines, including interactive animated logo arrays with reactive hover transitions.
* **Streamlined Multi-Step Wizard**: Client-side forms cleanly isolated across components to optimize state propagation, transitioning directly from Pathway Priority into a final structural application preview.
* **Context-Aware Admission Targets**: Embedded dynamic calculation engine processing application types on the fly. Automatically targets regular Grade 10 enrollment for upcoming calendar cycles or computes live mid-stream transfer targets for current scholastic years without hardcoded form parameters.
* **3-Choice Priority Pathway System**: Interactive ranking module allowing applicants to choose and order their technical or academic tracks (STEM, Social Sciences, Arts) and sub-tracks.
* **Multipart Binary Document Streaming**: Fully integrated `FormData` pipeline that leverages `multer` to securely ingest and store raw binary attachments (Passport Photos and Birth Certificates).
* **Cross-Document Gender Validation**: Advanced asynchronous Mongoose schema hook utilizing root `this.ownerDocument()` resolution to prevent gender mismatches during the registration phase, fully aligned with native routing keys.
* **Rapid Network Fail-safe Diagnostics**: Configured with a `serverSelectionTimeoutMS` threshold to prevent application stalling and immediately catch local router firewall lookups (`querySrv ECONNREFUSED`).
* **Government & Exam Validation**: Strict validation schemas matching institutional data rules for Birth Certificate Numbers, NEMIS UPI, Assessment Numbers, and School KNEC Codes.
* **Conditional Transfer & Re-Application Workflows**: Interactive conditional fields that toggle active states and request specific text justifications strictly for incoming transfer students or historical re-applicants.
* **Legal Integrity Ticker & Anti-Fraud Sign-off**: High-stakes database submission barrier requiring final legal certification, making explicit that data mismatches result in immediate application rejection.

## 📁 Optimized Monorepo Architecture

```text
Starehe-Admissions-Portal/           <-- Main Repository Root
├── .gitignore                       <-- Central Guard (Insulates Backend/.env & uploads/)
├── README.md                        <-- Project Documentation
│
├── Frontend/                        <-- React Client Code (Vercel)
│   ├── public/                      <-- Static Assets & Favicon
│   ├── src/
│   │   ├── components/
│   │   │   ├── Personal.jsx         # Identity & Government IDs with Context Target Banner (Step 1)
│   │   │   ├── Academics.jsx        # Historical Academic Background (Step 2)
│   │   │   ├── Pathway.jsx          # Priority Track Ranking Engine (Step 3)
│   │   │   └── Review.jsx           # Data Verification & Legal Sign-off (Step 4)
│   │   ├── App.jsx                  # State Orchestration & Multipart FormData Payload Dispatcher
│   │   └── App.css                  # Custom Structural Pure CSS3 Layout Engine
│   └── package.json
│
└── Backend/                         <-- Express API Server Code (Render)
    ├── models/
    │   └── applications.js          # Mongoose NoSQL Strict Data Schema & Owner Validation Hooks
    ├── uploads/                     # Temporary Local Storage Buffer for Inbound Specimen Images
    ├── server.js                    # Unified Server Entry Point, Multer Middleware, & Aligned Form Routing
    ├── .env                         # Hidden Cloud Database Password String & Port Configs
    └── package.json
```

## 🏁 Getting Started

1.  **Clone the repository**:
    ```bash
    git clone [Starehe-Admissions-Portal](https://github.com/upsilonvibes/Starehe-Admissions-Portal.git)
    cd Starehe-Admissions-Portal
    ```

2.  **Configure the Environment Variables:**
    Create a .env file inside the Backend/ directory:
    ```Plaintext
    PORT=5000
# For local offline sandbox development:
   MONGODB_URI=mongodb://127.0.0.1:27017/starehe_admissions_portal
# For cloud cluster production environments:
   # MONGODB_URI=mongodb+srv://upsilonvibes:<password>@cluster0.nkkl6xm.mongodb.net/starehe_admissions_portal
    

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
    
Developed with 💙 by **Percy Njuguna** [@upsilonvibes](https://github.com/upsilonvibes)- Upcoming Full-Stack Web Developer. Paso a paso, se llega lejos.    
