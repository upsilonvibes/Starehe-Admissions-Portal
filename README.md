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
* **Streamlined Multi-Step Wizard**: Client-side forms cleanly isolated across components to optimize state propagation, transitioning directly from Pathway Priority into a final structural application preview.
* **Context-Aware Admission Targets**: Embedded dynamic calculation engine processing application types on the fly. Automatically targets Grade 10 enrollment for upcoming calendar cycles or computes live mid-stream transfer targets for current scholastic years without hardcoded form parameters.
* **3-Choice Priority Pathway System**: Interactive ranking module allowing applicants to choose and order their technical or academic tracks (STEM, Social Sciences, Arts) and sub-tracks.
* **Adaptive Parent/Guardian Matrix Subsystem**: Intelligently toggles baseline validation parameters (National ID, employment metrics, income brackets) depending on parent status (Alive, Deceased, Unknown/Absent) to prevent browser-level validation crashes while accurately preserving structural profiling data.
* **Dynamic Stream Justification Engine**: Context-driven narrative layouts that seamlessly adapt based on the application tier selected. Requires an exhaustive, multi-generational extended family financial review for sponsored candidates, while pivoting to institutional preference statements for fee-paying tracks.
* **Decoupled API Routing & Multi-File Cloud Pipelines**: Completely isolated endpoint orchestration handling individual multi-file parent upload fields explicitly mapped from the frontend state (`Family.jsx`). Raw binary streams are processed seamlessly via `multer` and offloaded directly to Cloudinary safely without overriding overlapping data objects.
* **Calligraphic Electronic Signature Pad**: Client-side reactive script handwriting engine that auto-renders an official electronic signature preview directly from the signee's plaintext keystrokes, paired with a mandatory legal adoption certification checkout.
* **Cross-Document Gender Validation**: Advanced asynchronous Mongoose schema hook utilizing root `this.ownerDocument()` resolution to prevent gender mismatches during the registration phase, fully aligned with native routing keys.
* **Rapid Network Fail-safe Diagnostics**: Configured with a `serverSelectionTimeoutMS` threshold to prevent application stalling and immediately catch local router firewall lookups (`querySrv ECONNREFUSED`).
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
│   │   │   ├── Pathway.jsx          # Priority Track Ranking Engine (Step 3)
│   │   │   ├── Family.jsx           # Distinct multi-file parent upload tracking & sibling matrices (Step 4)
│   │   │   └── Review.jsx           # Dynamic Stream Narratives, Document Verification Previews, & Sig Pad (Step 5)
│   │   ├── App.jsx                  # State Orchestration & Multipart FormData Payload Dispatcher
│   │   └── App.css                  # Custom Structural Pure CSS3 Layout Engine
│   └── package.json
│
└── Backend/                         <-- Express API Server Code (Render)
    ├── models/
    │   └── Application.js           # Mongoose NoSQL Strict Data Schema & Cross-Document Gender Validation Hooks
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
