# 🩺 Health Information System Frontend

This is the React + TypeScript frontend for the Health Information System project. It allows users to manage clients (patients), health programs, and enrollments via a clean, modern UI.

## 🚀 Features

- Register and view clients (patients)
- Create and view health programs (e.g., HIV, TB)
- Enroll clients in programs
- Responsive, accessible UI built with Tailwind CSS
- Connects to the FastAPI backend

## 🛠️ Tech Stack

- **Framework:** React 18 + TypeScript
- **Styling:** Tailwind CSS
- **HTTP Client:** Axios
- **Build Tool:** Vite

## 📦 Project Structure

```
client/
├── public/             # Static assets
├── src/
│   ├── assets/         # Images and icons
│   ├── components/     # Reusable UI components
│   ├── hooks/          # Custom React hooks
│   ├── pages/          # Page components (routing targets)
│   ├── services/       # API service modules
│   ├── types/          # TypeScript types/interfaces
│   ├── App.tsx         # Main app component
│   └── main.tsx        # Entry point
├── index.html
├── package.json
└── vite.config.ts
```

## 🧑‍💻 Getting Started

### Prerequisites

- Node.js 18+
- npm

### Setup

1. **Install dependencies:**
   ```sh
   npm install
   ```

2. **Start the development server:**
   ```sh
   npm run dev
   ```

3. **Open your browser at:**  
   [http://localhost:5173](http://localhost:5173)

> **Note:** The frontend expects the backend API to be running (see [../server/README.md](../server/README.md)).

## 📁 Useful Scripts

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run preview` — Preview production build

## 📚 Documentation

- [Backend (FastAPI) README](../server/README.md)
- [Project Root README](../README.md)