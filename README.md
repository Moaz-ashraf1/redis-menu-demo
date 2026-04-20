# 🔴 Redis Caching Demo — Menu API

A hands-on demonstration of **Redis caching** integrated with a **Node.js + TypeScript + Express** REST API. Built to understand the Cache-Aside pattern from the ground up — from a cold cache miss to a warm cache hit.

---

## 💡 What This Project Demonstrates

- How Redis sits as a **speed layer** between the client and the data source
- The **Cache-Aside pattern**: check cache → on miss, fetch data and populate cache → on hit, serve instantly
- **TTL-based expiration** to keep cached data fresh automatically
- Clean separation of concerns: routes, services, and data layers
- Docker-based Redis setup for a consistent, reproducible environment

---

## 🏗️ Architecture

```
Client Request
      │
      ▼
 Express Route
      │
      ├──► Redis (Cache Hit?) ──► YES ──► Return instantly ✅
      │
      └──► NO (Cache Miss)
              │
              ▼
         menuData.ts (In-memory data source)
              │
              ▼
         Save to Redis (with TTL)
              │
              ▼
         Return to Client ✅
```

---

## 🛠️ Tech Stack

| Technology | Role |
|---|---|
| Node.js + TypeScript | Runtime & type safety |
| Express | HTTP server & routing |
| ioredis | Redis client for Node.js |
| Redis 7 (Alpine) | In-memory cache store |
| Docker + Docker Compose | Redis container orchestration |

---

## 📁 Project Structure

```
redis-menu-demo/
├── src/
│   ├── data/
│   │   └── menuData.ts        # Static menu data (simulates a DB)
│   ├── services/
│   │   └── redisService.ts    # Generic get/set/delete cache helpers
│   ├── routes/
│   │   └── menuRoutes.ts      # GET /menu — cache-aside logic lives here
│   └── index.ts               # Express app entry point
├── docker-compose.yml          # Spins up Redis container
├── .env                        # PORT and REDIS_URL config
├── tsconfig.json
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [Docker](https://www.docker.com/) + Docker Compose

### 1. Clone the repository

```bash
git clone https://github.com/Moaz-ashraf1/redis-menu-demo.git
cd redis-menu-demo
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
# .env
PORT=3000
REDIS_URL=redis://localhost:6379
```

### 4. Start Redis via Docker

```bash
docker compose up -d
```

### 5. Run the development server

```bash
npm run dev
```

Server runs at `http://localhost:3000`

---

## 🔁 How to Test the Cache

### First request — Cache Miss
```bash
curl http://localhost:3000/menu
```

**Response:**
```json
{
  "source": "data",
  "data": [...]
}
```

**Terminal output:**
```
🔴 Cache MISS — From Data
```

### Second request — Cache Hit
```bash
curl http://localhost:3000/menu
```

**Response:**
```json
{
  "source": "cache",
  "data": [...]
}
```

**Terminal output:**
```
🟢 Cache HIT  — From Redis
```

---

## 🔍 Inspect Redis Directly

```bash
# Enter Redis CLI inside the container
docker exec -it redis-menu redis-cli

# List all cached keys
KEYS *

# View the cached menu JSON
GET menu:all

# Check remaining TTL in seconds
TTL menu:all
```

---

## ⚙️ Key Concepts Covered

**Cache-Aside Pattern**
The application is responsible for loading data into the cache. On a cache miss, the app fetches from the data source, writes to Redis, then returns the result.

**TTL (Time To Live)**
Every cached key expires automatically after a set duration (configurable via `MENU_TTL` in `menuRoutes.ts`). No manual cleanup needed.

**Cache Invalidation**
When the underlying data changes, the relevant Redis key should be deleted so the next request fetches fresh data and repopulates the cache. This is the natural next step beyond this demo.

---

## 📌 Environment Variables

| Variable | Description | Default |
|---|---|---|
| `PORT` | Express server port | `3000` |
| `REDIS_URL` | Redis connection string | `redis://localhost:6379` |

---

## 🗺️ What's Next

This project is the foundation. The next steps toward a production-ready caching layer include:

- [ ] Cache Invalidation on data update
- [ ] Per-category caching (`menu:category:burgers`)
- [ ] Redis in a multi-service Docker Compose setup (alongside PostgreSQL)
- [ ] Cache warming on server startup
- [ ] Monitoring cache hit/miss ratio

---

## 👤 Author

**Moaz** — Junior Backend Developer
Self-taught

---

## 📄 License

MIT
