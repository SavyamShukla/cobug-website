# COBUG Landing Page & Download Portal

Official, production-grade landing page for **COBUG** (*Collab. Build. Grow.*) featuring prominent Windows desktop download integration with direct GitHub release links.

---

## 🚀 Live Release Download
- **Executable Link:** [COBUG-Setup-0.1.0-x64.exe](https://github.com/SavyamShukla/cobug-app/releases/download/v1.0.0/COBUG-Setup-0.1.0-x64.exe)
- **Target OS:** Windows 10 / Windows 11 (64-bit Architecture)
- **Official GitHub Repository:** [SavyamShukla/cobug-app](https://github.com/SavyamShukla/cobug-app)

---

## 📁 Directory Structure
```text
cobug-website/
├── index.html               # Main landing page with hero, features, showcase, specs, and FAQ
├── style.css                # Custom luxury dark theme styling, glow effects & animations
├── script.js                 # Gallery tabs, FAQ accordion, download toast, and clipboard helpers
├── README.md                # Documentation and deployment guide
└── assets/
    ├── COBUG_C_Master.svg   # Official 3D isometric interlocking 'C' icon
    ├── COBUG_Full_Logo.svg  # Master brand logo with tagline
    ├── COBUG_Full_Logo_Dark.svg # Dark theme SVG logo
    ├── COBUG_Logo_Unveil.mp4# Official cinematic launch video
    └── screenshots/         # Verified application UI screenshots
        ├── cobug_ui_auth_modal.png
        ├── cobug_ui_desktop_tools.png
        ├── cobug_ui_dashboard.png
        └── cobug_ui_projects.png
```

---

## 💻 How to Open & Test Locally

### Option 1: Direct Double-Click
Double-click `index.html` to open directly in Google Chrome, Microsoft Edge, or any modern web browser.

### Option 2: Local Web Server (Node.js)
```bash
npx serve .
# Or via Python:
python -m http.server 3000
```
Open `http://localhost:3000` in your browser.

---

## 🌐 1-Click Deployment

### Deploy to GitHub Pages:
1. Push `cobug-website` to a GitHub repository (e.g., `cobug-app` under the `gh-pages` branch or root).
2. Go to **Repository Settings** &rarr; **Pages** &rarr; Select `main` branch root &rarr; Click **Save**.

### Deploy to Vercel / Netlify:
- Simply drag and drop the `cobug-website` folder onto [vercel.com](https://vercel.com) or [netlify.com](https://netlify.com) for instant global edge deployment.
