# COSMOS — Animated Web

An interactive space exploration website built with React, TypeScript, Three.js, and Node.js.

## Screenshots

> Screenshot placeholders — add images to `docs/screenshots/` when available.


- **Solar System** — Fullscreen `cosmos.mp4` video background with planet navigation grid
- **Planet Pages** — React Three Fiber scenes with realistic lighting, atmosphere, bloom, stars, and orbit controls
- **Constellation Explorer** — Interactive night sky with zodiac constellations, hover tooltips, and glow animations
- **Settings** — i18n (English/Ukrainian), theme, graphics quality, animation toggles, FPS counter
- **Dynamic Navigation** — Auto-generated routes from a single `shared/planets.ts` config
- **REST API** — Versioned backend (`/api/v1`) with clean architecture
- **Docker** — One-command startup with hot reload in development

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| Frontend | React 19, TypeScript, Vite, Tailwind CSS 4, Framer Motion |
| 3D | Three.js, React Three Fiber, Drei, Postprocessing |
| Backend | Node.js, Express 5, TypeScript, Zod |
| DevOps | Docker Compose, Nginx (production) |
| Tooling | ESLint, Prettier, Husky, lint-staged |

## Project Structure

```
animated-web/
├── client/              # React frontend (Vite)
│   ├── src/
│   │   ├── components/  # Navbar, Loader, PlanetScene, etc.
│   │   ├── pages/       # SolarSystem, Planet, Constellation, Settings
│   │   ├── i18n/        # English & Ukrainian translations
│   │   └── store/       # Zustand settings store
│   └── public/assets/   # Video assets (cosmos.mp4, etc.)
├── server/              # Express API
│   └── src/
│       ├── config/      # Environment validation
│       ├── controllers/
│       ├── middleware/
│       ├── repositories/
│       ├── routes/v1/
│       ├── services/
│       └── utils/
├── shared/              # Shared TypeScript config
│   ├── planets.ts       # Single source of truth for planets
│   ├── constellations.ts
│   └── types.ts
├── docker/              # Dockerfiles & compose configs
├── configs/             # Prettier & shared configs
└── scripts/             # Development scripts
```

## Installation

### Prerequisites

- Node.js 22+
- npm 10+
- Docker & Docker Compose (optional)

### Local Setup

```bash
git clone <repository-url>
cd animated-web

# Install all dependencies
npm install
npm install --prefix client
npm install --prefix server

# Start development (client + server)
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:3000
- Health check: http://localhost:3000/api/health

## Docker

Start the entire application with one command:

```bash
docker compose up --build
```

This starts:
- **client** on port 5173 (Vite dev server with hot reload)
- **server** on port 3000 (nodemon with hot reload)

Production build:

```bash
npm run docker:prod
# or
docker compose -f docker/docker-compose.prod.yml up --build
```

## Development

```bash
# Frontend only
npm run dev:client

# Backend only
npm run dev:server

# Run tests
npm test

# Lint
npm run lint

# Format
npm run format
```

### Environment Variables

**Server** (`server/.env`):

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3000` | Server port |
| `NODE_ENV` | `development` | Environment |
| `ALLOWED_ORIGINS` | `http://localhost:5173` | CORS origins (comma-separated) |
| `LOG_LEVEL` | `info` | Log level |

**Client**:

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_BASE_URL` | `http://localhost:3000/api/v1` | API base URL |

## Production

```bash
npm run build
```

Builds both client (static assets) and server (compiled TypeScript).

## API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/v1/health` | Versioned health check |
| GET | `/api/v1/planets` | List all planets |
| GET | `/api/v1/planets/:id` | Get planet by ID or slug |
| GET | `/api/v1/planets/metrics` | Analytics metrics |

## Roadmap

- [x] Interactive Solar System page with video background
- [x] React Three Fiber planet rendering
- [x] Constellation explorer
- [x] Settings with i18n (EN/UK)
- [x] Dynamic planet routing
- [x] Docker Compose setup
- [x] Clean backend architecture
- [ ] NASA API integration
- [ ] Real texture maps for planets
- [ ] WebGL2 particle effects
- [ ] PWA / offline support
- [ ] User accounts & favorites

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please run `npm run lint` and `npm test` before submitting.

## License

ISC

---

## Main Author 

# Solo Full-Stack Developer Melnyk Oleksandr
# Planet Designer x Main Designer Zinchenko Daryna

*"The universe is under no obligation to make sense to you."* — Neil deGrasse Tyson
