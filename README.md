# SmartBasket 🛒

> **AI-Powered Smart Shopping Platform** — A production-grade enterprise web application for modern smart retail.

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](/) [![License](https://img.shields.io/badge/license-MIT-blue)](/) [![Version](https://img.shields.io/badge/version-2.0.0-violet)](/)

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

## 🛠️ Tech Stack

### Frontend
- **React 19** + **TypeScript** + **Vite 6**
- **Tailwind CSS v4** — Utility-first styling
- **Framer Motion** — Smooth animations
- **Zustand** — State management with persistence
- **Recharts** — Data visualization
- **React Router v7** — Client-side routing
- **react-hot-toast** — Notifications

### Backend (Planned)
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
- Git

### Frontend Development

```bash
# Clone the repository
git clone https://github.com/your-org/smartbasket.git
cd smartbasket/frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Full Stack with Docker

```bash
# Copy environment config
cp .env.example .env

# Edit .env with your values
# Start all services
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
├── backend/           # Spring Boot API (coming soon)
├── database/          # SQL schemas and migrations
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

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

---

<p align="center">Built with ❤️ by the SmartBasket Engineering Team</p>
