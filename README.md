# Starehe Admissions Portal 🇰🇪

A modern, React-based multi-step enrollment wizard designed to digitize and streamline the application process for **Starehe Boys' Centre (Yellow Form)** and **Starehe Girls' Centre (Blue Form)**. This system enforces strict validation for Grade 10 transitions, institutional transfers, government identification, and dynamic pathway tracking.

## 🚀 Features

* **Dynamic Portal Selection**: Tailored UI and institutional theme engine for both SBC (Yellow) and SGC (Blue) entry pipelines.
* **Modular Multi-Step Wizard Layout**: Form steps cleanly isolated across component boundaries to optimize render performance and maintain code clarity.
* **3-Choice Priority Pathway System**: Interactive ranking module allowing applicants to select and order their technical/academic pathways (STEM, Social Sciences, Arts) and specific sub-tracks.
* **Government & Exam Validation**: Integrated checks for required academic identifiers, including Birth Certificate Number, NEMIS UPI, Assessment Number, and School KNEC Codes.
* **Conditional Transfer Logic**: Smart conditional fields that activate strictly for transfer students to capture current grade and verified reasons for transfer.
* **Legal Integrity Ticker & Anti-Fraud Sign-off**: High-stakes validation barrier requiring final legal certification, making explicit that data mismatches result in immediate application rejection and slot forfeiture.
* **Choreographed Pure CSS3 Layout**: Flexbox grid engine featuring a centralized layout constraint maxed at `1100px` to prevent widescreen stretching, paired with interactive animated CSS hover fan effects on the landing view.

## 🛠️ Tech Stack

* **Frontend**: React.js (Vite)
* **State Management**: React Hooks (`useState`, `useEffect`) managed through an optimized top-down wizard architecture
* **Styling**: Pure CSS3 (Choreographed layout, media queries, CSS Keyframes)
* **Quality & Duplication Control**: Architecture ready for Stylelint and PurgeCSS validation
* **Backend**: Node.js (Planned integration for secure data persistence)

## 📁 Project Structure

```text
├── src/
│   ├── components/
│   │   ├── Personal.jsx       # Identity & Government Identification (Step 1)
│   │   ├── Academics.jsx      # Historical academic background (Step 2)
│   │   ├── Pathway.jsx        # Priority track ranking engine (Step 3)
│   │   ├── Family.jsx         # Guardian & household context (Step 4)
│   │   └── Review.jsx         # Legal declaration & high-stakes sign-off (Step 5)
│   ├── App.jsx                # Core wizard engine, centralized state, & step switcher
│   └── App.css                # Choreographed global theme layout & media queries
└── public/images_starehe/     # Institutional branding assets and design graphics
```

## 🏁 Getting Started

1.  **Clone the repository**:
    ```bash
    git clone [https://github.com/upsilonvibes/Starehe-Admissions-Portal.git](https://github.com/upsilonvibes/Starehe-Admissions-Portal.git)
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    
Developed by **Percy Njuguna** ([@upsilonvibes][https://github.com/upsilonvibes])- Self-taught Web Developer & University Applicant.    
