# SmartBasket 🛒

> **AI-Powered Smart Shopping Platform** — A production-grade enterprise web application for modern smart retail.

<p align="center">
  <a href="https://github.com/Kunjalb29/SmartBasket/stargazers">
    <img src="https://img.shields.io/github/stars/Kunjalb29/SmartBasket?style=for-the-badge&logo=github&color=7c3aed&labelColor=1a1f35" alt="GitHub Stars"/>
  </a>
  <a href="https://github.com/Kunjalb29/SmartBasket/network/members">
    <img src="https://img.shields.io/github/forks/Kunjalb29/SmartBasket?style=for-the-badge&logo=github&color=06b6d4&labelColor=1a1f35" alt="GitHub Forks"/>
  </a>
  <a href="https://github.com/Kunjalb29/SmartBasket/archive/refs/heads/main.zip">
    <img src="https://img.shields.io/badge/⬇_Download-ZIP-10b981?style=for-the-badge&labelColor=1a1f35" alt="Download ZIP"/>
  </a>
  <a href="https://github.com/Kunjalb29/SmartBasket/commits/main">
    <img src="https://img.shields.io/github/commit-activity/t/Kunjalb29/SmartBasket?style=for-the-badge&color=f59e0b&labelColor=1a1f35&label=Total%20Commits" alt="Total Commits"/>
  </a>
  <a href="https://github.com/Kunjalb29/SmartBasket/graphs/traffic">
    <img src="https://img.shields.io/badge/license-MIT-blue?style=for-the-badge&labelColor=1a1f35" alt="License"/>
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/github/repo-size/Kunjalb29/SmartBasket?style=flat-square&color=7c3aed&label=Repo%20Size" alt="Repo Size"/>
  <img src="https://img.shields.io/github/last-commit/Kunjalb29/SmartBasket?style=flat-square&color=10b981&label=Last%20Updated" alt="Last Commit"/>
  <img src="https://img.shields.io/github/issues/Kunjalb29/SmartBasket?style=flat-square&color=f59e0b&label=Open%20Issues" alt="Issues"/>
  <img src="https://img.shields.io/badge/version-2.0.0-violet?style=flat-square" alt="Version"/>
  <img src="https://img.shields.io/badge/build-passing-brightgreen?style=flat-square" alt="Build"/>
</p>

<p align="center">
  <a href="https://github.com/Kunjalb29/SmartBasket/archive/refs/heads/main.zip">
    <strong>⬇️ Download Project (ZIP)</strong>
  </a>
  &nbsp;·&nbsp;
  <a href="https://github.com/Kunjalb29/SmartBasket">
    <strong>⭐ Star on GitHub</strong>
  </a>
  &nbsp;·&nbsp;
  <a href="https://github.com/Kunjalb29/SmartBasket/fork">
    <strong>🍴 Fork this Project</strong>
  </a>
</p>

---

## 🚀 Overview

SmartBasket is a full-stack AI-powered shopping assistant platform that helps users shop smarter, track nutrition, compare products, and receive personalized AI recommendations — built to look and feel like a billion-dollar SaaS product.

### ✨ Features

| Feature | Description |
|---------|-------------|
| 🤖 **AI Assistant** | Natural language shopping assistant with product recommendations |
| 🥗 **Nutrition Tracking** | Real-time calorie and macro tracking per cart item |
| 📊 **Analytics Dashboard** | Revenue, spending, health trends with interactive charts |
| 🔍 **Product Scanner** | Barcode scanning for instant product info |
| ❤️ **Wishlist** | Save and manage favorite products |
| ⚖️ **Product Comparison** | Side-by-side comparison with AI insights |
| 🎯 **Smart Cart** | Intelligent cart with health scoring |
| 🔔 **Notifications** | Price drops, budget alerts, AI insights |
| 🌙 **Dark Mode** | Premium dark-first design with glassmorphism |

---

## ⬇️ Download & Install

> **Anyone can download and run this project for free!**

### Option 1 — Download ZIP (No Git required)

1. Click the button below to download the project as a ZIP file:

   **👉 [Download SmartBasket ZIP](https://github.com/Kunjalb29/SmartBasket/archive/refs/heads/main.zip)**

2. Extract the ZIP to a folder on your computer
3. Follow the [Quick Start](#-quick-start) steps below

---

### Option 2 — Clone with Git

```bash
# Clone the repository
git clone https://github.com/Kunjalb29/SmartBasket.git

# Navigate into the project
cd SmartBasket
```

---

### Option 3 — GitHub CLI

```bash
gh repo clone Kunjalb29/SmartBasket
```

---

## 📊 Project Stats

<p align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=Kunjalb29&repo=SmartBasket&show_icons=true&theme=radical&hide_border=true&bg_color=1a1f35&title_color=a78bfa&icon_color=06b6d4&text_color=94a3b8" alt="GitHub Stats"/>
</p>

<p align="center">
  <img src="https://img.shields.io/github/downloads/Kunjalb29/SmartBasket/total?style=for-the-badge&logo=github&color=7c3aed&labelColor=1a1f35&label=Total%20Downloads" alt="Total Downloads"/>
</p>

> 📈 **Clones and views are tracked by GitHub** — Visit the [Traffic insights](https://github.com/Kunjalb29/SmartBasket/graphs/traffic) page to see real-time stats.

---

## 🛠️ Tech Stack

### Frontend
- **React 19** + **TypeScript** + **Vite 6**
- **Tailwind CSS v4** — Utility-first styling
- **Framer Motion** — Smooth animations
- **Zustand** — State management with persistence
- **Recharts** — Data visualization
- **React Router v7** — Client-side routing
- **react-hot-toast** — Notifications

### Backend
- **Spring Boot 3.4** — REST API
- **PostgreSQL 16** — Primary database
- **Redis 7** — Caching & sessions
- **JWT** — Authentication
- **Docker** — Containerization

---

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- npm 10+
- Git (optional — you can use ZIP download instead)

### Frontend Development

```bash
# Step 1: Enter the frontend folder
cd SmartBasket/frontend

# Step 2: Install dependencies
npm install

# Step 3: Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser. 🎉

### Full Stack with Docker

```bash
# Copy environment config
cp .env.example .env

# Edit .env with your values, then start all services
docker-compose up -d

# View logs
docker-compose logs -f
```

---

## 📁 Project Structure

```
SmartBasket/
├── frontend/          # React + Vite frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Route page components
│   │   ├── store/         # Zustand state stores
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utilities, services, constants
│   │   ├── types/         # TypeScript type definitions
│   │   └── data/          # Mock data
│   └── package.json
├── backend/           # Spring Boot REST API
│   ├── src/main/java/com/smartbasket/api/
│   │   ├── controller/    # REST controllers
│   │   ├── service/       # Business logic
│   │   ├── model/         # JPA entities
│   │   ├── repository/    # Data repositories
│   │   ├── security/      # JWT auth & filters
│   │   └── config/        # App configuration
│   └── pom.xml
├── database/          # SQL schemas and seed data
│   ├── schema.sql
│   └── seed.sql
├── docker-compose.yml
├── .env.example
└── README.md
```

---

## 🧠 Design Philosophy

1. **Premium-first** — Every interaction should feel $1B
2. **AI-native** — AI features are core, not add-ons
3. **Health-first** — Nutrition data on every product
4. **Mobile-responsive** — Works beautifully on all screen sizes
5. **Performance** — <2s initial load, 60fps animations

---

## 🎨 Design System

- **Colors**: Violet-to-cyan gradient, dark slate palette
- **Typography**: Inter (UI), Space Grotesk (headings), JetBrains Mono (code)
- **Glassmorphism**: Frosted glass cards with subtle borders
- **Animations**: Framer Motion micro-interactions throughout

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. **Fork** the project — [Fork SmartBasket](https://github.com/Kunjalb29/SmartBasket/fork)
2. Create your feature branch: `git checkout -b feat/amazing-feature`
3. Commit your changes: `git commit -m 'feat: add amazing feature'`
4. Push to the branch: `git push origin feat/amazing-feature`
5. Open a **Pull Request**

---

## 📄 License

MIT License — This project is **free to download, use, modify, and distribute**.

See [LICENSE](LICENSE) for full details.

---

<p align="center">
  <strong>⬇️ <a href="https://github.com/Kunjalb29/SmartBasket/archive/refs/heads/main.zip">Download SmartBasket Now</a> — It's Free!</strong>
</p>

<p align="center">Built with ❤️ by the SmartBasket Engineering Team</p>
