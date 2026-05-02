# HygieneTracker 🧼

> **Personal Hygiene & Textile Wash Cycle Manager.**

HygieneTracker is an offline-first Progressive Web App (PWA) designed to automate and track the washing cycles of personal care items and home textiles. It replaces traditional, easily ignored alarms with a visual, state-driven dashboard.

## 🚀 The Problem it Solves

Maintaining optimal hygiene standards for items like African sponges, pillowcases, and towels requires tracking multiple, overlapping schedules (3, 7, 15, or 30 days). Relying on memory or standard daily alarms creates notification fatigue. HygieneTracker solves this by providing a unified, color-coded visual pulse of what needs washing and when.

## ✨ Key Features

- **Adaptive Visual Urgency:** Items automatically shift colors based on elapsed days:
  - 🟢 **Green:** Recently washed / Safe.
  - 🟡 **Yellow:** Approaching wash window.
  - 🟠 **Orange:** Recommended wash time.
  - 🔴 **Red:** Mandatory wash overdue.
- **Pre-configured Dermatological Cycles:**
  - Hand Towels & Pillowcases: 3-day cycle.
  - Body Towels & Bed Sheets: 7-day cycle.
  - African Sponges: 15 to 30-day cycle.
- **Offline-First PWA:** Built with Service Workers and LocalStorage. It works instantly without an internet connection.
- **Glassmorphism UI:** Premium dark-mode interface with dynamic glow effects based on the item's status.

## 🛠️ Tech Stack

- **Frontend:** Vanilla JavaScript (ES6+), HTML5, CSS3.
- **Persistence:** LocalStorage API.
- **Architecture:** Progressive Web App (PWA).
- **Icons:** Phosphor Icons.

## 📦 Installation

As a fully compliant PWA, it can be installed directly from the browser:

1. Visit the [GitHub Pages link](https://fabriziococca.github.io/HygieneTracker/).
2. On Chrome (Mobile): Tap the three dots and select **"Install App"** or **"Add to Home Screen"**.
3. On Desktop: Click the install icon in the address bar.

---

Developed with 🧉 by **Fabrizio Cocca**
