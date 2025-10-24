# Pokémon Browser — React + TypeScript + Vite

A responsive Pokémon Browser app built with **React + TypeScript + Tailwind CSS**, featuring pagination, load-more view, and Pokémon detail pages. Includes **React Query (with Suspense)** and **ErrorBoundary** for runtime safety.

---

## 🚀 Features

- ⚛️ React + TypeScript (strict mode)
- 🌈 Tailwind CSS for fully responsive UI
- 🔁 React Query for data fetching + caching
- ⏳ React Suspense for loading states
- 💥 ErrorBoundary for runtime error handling
- 🧭 React Router for navigation
- 🧩 Modular structure (API, components, pages, types)

---

## 🧱 Project Structure

```
src/
  api/            → API calls & query client
  components/     → Reusable UI components
  pages/          → Pagination, Load More, Detail pages
  types/          → TypeScript interfaces
  App.tsx         → App routes & layout
  main.tsx        → Entry point with providers
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone or extract the project

If downloaded as ZIP, extract it and open the folder in VS Code.

Or clone it from your repo:

```bash
git clone https://github.com/yourusername/pokemon-browser.git
cd pokemon-browser
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Start the development server

```bash
npm run dev
```

Your app will be available at:  
👉 **http://localhost:5173**

### 4️⃣ Build for production

```bash
npm run build
npm run preview
```

This compiles the app and serves it locally for testing.

### 5️⃣ Deploy (optional)

You can deploy to **Vercel**, **Netlify**, or **Cloudflare Pages** directly from GitHub.

---

## 📘 Tech Stack

| Tool | Purpose |
|------|----------|
| **React** | UI library |
| **TypeScript** | Type-safe coding |
| **Tailwind CSS** | Styling & responsive layouts |
| **Vite** | Fast build tool |
| **React Router** | Navigation |
| **React Query** | Data fetching + caching |
| **PokéAPI** | Public Pokémon API |

---

## 💡 Notes

- The app is **fully responsive** (mobile → tablet → desktop).
- Pokémon data fetched from `https://pokeapi.co/api/v2/pokemon`.
- You can easily extend this with **React Suspense boundaries**, **search functionality**, or **favorites**.

---

## 🧑‍💻 Author

Built for the Frontend React Assessment task — with focus on clean structure, scalability, and user experience.
