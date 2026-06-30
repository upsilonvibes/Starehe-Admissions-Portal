# Starehe Admissions Portal 🇰🇪

A modern, production-grade full-stack enrollment wizard designed to digitize and streamline the application process for **Starehe Boys' Centre (Yellow Form)** and **Starehe Girls' Centre (Blue Form)**. This application features a dual-service monorepo architecture, pairing a responsive React frontend client with a secure Node.js/Express REST API backed by a cloud MongoDB Atlas database.

## 🚀 Live Deployments
* **Frontend Portal (Vercel):** [https://starehe-admissions-portal.vercel.app](https://starehe-admissions-portal.vercel.app) 
* **Backend API Engine (Render):** [https://starehe-admissions-portal.onrender.com](https://starehe-admissions-portal.onrender.com)

## 🛠️ Full-Stack Tech Stack

* **Frontend Client**: React.js (Vite, SPA Architecture)
* **Backend API Engine**: Node.js, Express.js RESTful API (Decoupled Router Layout)
* **Middleware & File Storage**: Multer Multipart Stream Handling, Cloudinary Cloud Asset Integration
* **Database Layer**: MongoDB Atlas & Local Fallback (NoSQL Data Store managed via Mongoose Object Modeling)
* **Security & Environment**: Cross-Origin Resource Sharing (CORS) security headers and secure `dotenv` variable insulation

## ✨ Core Features Implemented

* **Dynamic Portal Selection & Micro-Interactions**: Tailored UI and institutional theme engine supporting both SBC (Yellow) and SGC (Blue) entry pipelines, including interactive animated logo arrays with reactive hover transitions.
* **6-Stage Unified Lifecycle Wizard**: Form workflow isolated cleanly across specialized modular sub-components to optimize React state propagation, transitioning smoothly from initial personal identity rules all the way to final declarations.
* **Synchronized State & Progress Engine**: Features a central step-advance interceptor in `App.jsx` that automatically flushes and flattens independent component state hooks (`selections` and `siblingsList`) down into the global `formData` payload upon moving forward, preventing array state fragmentation.
* **Deterministic Tracking Generator**: Embedded client-side lock engine that generates a strict 6-digit tracking string (`String(Math.floor(100000 + Math.random() * 900000))`). It forces instant generation to trap matching reference IDs early, ensuring local state variables and asynchronous server payloads are fully synchronized even if print previews are bypassed.
* **Context-Aware Admission Targets**: Embedded dynamic calculation engine processing application types on the fly. Automatically targets Grade 10 enrollment for upcoming calendar cycles or computes live mid-stream transfer targets for current scholastic years without hardcoded form parameters.
* **3-Choice Priority Pathway System**: Interactive ranking module allowing applicants to choose and order their academic tracks (STEM, Social Sciences, Arts & Sports Science) and sub-tracks, backed by unique selection validation.
* **Adaptive Parent/Guardian Matrix Subsystem**: Intelligently toggles baseline validation parameters (National ID, employment metrics, income brackets) depending on parent status (Alive, Deceased, Unknown/Absent) to prevent browser-level validation crashes while accurately preserving structural profiling data.
* **Multi-Tier Endorsement & Recommendation Subsystem**: Integrates strict local authority tracking via `Recommendations.jsx` mapping specific sections for Local Chiefs, Religious Leaders, and Primary Headteachers. This tracks custom remarks, academic forecasts, disciplinary reviews, and financial certificates alongside distinct physical and telephonic contact records.
* **Isolated Multi-File Cloud Pipelines**: Completely isolated endpoint orchestration handling individual multi-file uploads explicitly mapped from frontend form fields. Raw binary streams for parent metadata and official recommendations are processed seamlessly via `multer` and offloaded directly to Cloudinary without overriding overlapping data objects.
* **Native Context Print Template Window Injection**: Independent template engine hook capable of converting local form states instantly into standardized physical paper templates, injecting a new printing window context directly through native browser operations.
* **Calligraphic Electronic Signature Pad**: Client-side reactive script handwriting engine that auto-renders an official electronic signature preview directly from the signee's plaintext keystrokes, paired with a mandatory legal adoption certification checkout.
* **Cross-Document Gender Validation**: Advanced asynchronous Mongoose schema hook utilizing root `this.ownerDocument()` resolution to prevent gender mismatches during the registration phase, fully aligned with native routing keys.
* **Government & Exam Validation**: Strict validation schemas matching institutional data rules for Birth Certificate Numbers, NEMIS UPI, Assessment Numbers, and School KNEC Codes.

## 📁 Optimized Monorepo Architecture

```text
Starehe-Admissions-Portal/           <-- Main Repository Root
├── .gitignore                       <-- Central Guard (Insulates Backend/.env)
├── README.md                        <-- Project Documentation (This File)
│
├── Frontend/                        <-- React Client Code (Vercel)
│   ├── public/                      <-- Static Assets & Favicon
│   ├── src/
│   │   ├── components/
│   │   │   ├── Personal.jsx         # Identity, Personal Certifications, & Global Restrictions Guard (Step 1)
│   │   │   ├── Academics.jsx        # Historical Academic Background & Exam Track Records (Step 2)
│   │   │   ├── Pathway.jsx          # Priority Track Ranking Engine with local duplicates block (Step 3)
│   │   │   ├── Family.jsx           # Distinct multi-file parent upload tracking & sibling matrices (Step 4)
│   │   │   ├── Recommendations.jsx  # Chief, Clergy, and Headteacher text blocks & file tracking matrices (Step 5)
│   │   │   ├── Review.jsx           # Dynamic Stream Narratives, Document Verification Previews, & Sig Pad (Step 6)
│   │   │   ├── PrintTemplate.jsx    # Standardized calligraphic physical paper HTML structural compiler
│   │   │   └── PrintTemplate.css    # Strict print-media stylesheets (@media print) for exact form rendering
│   │   ├── App.jsx                  # State Orchestration, Reference Tracking Synchronizer, & FormData Dispatcher
│   │   └── App.css                  # Custom Structural Pure CSS3 Layout Engine
│   └── package.json
│
└── Backend/                         <-- Express API Server Code (Render)
    ├── models/
    │   └── Application.js           # Mongoose Strict Schema with Deep Nested Endorsement Validation Models
    ├── routes/
    │   └── applications.js          # Cloudinary Engine, Multer Field Matrix, and Submission Controller Route Logic
    ├── server.js                    # Lean Orchestrator and Global Middleware/Database Gateway Config Entry File
    ├── .env                         # Hidden Cloud Asset Credentials & Database Password Strings
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
    ```
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
    
Developed with 💙 by [Percy Njuguna](https://github.com/upsilonvibes)- Upcoming Full-Stack Web Developer. Paso a paso, se llega lejos.    
