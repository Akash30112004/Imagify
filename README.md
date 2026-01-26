# Imagify

AI image generation web app built with a React (Vite) frontend and a Node/Express + MongoDB backend.

- **Frontend**: React 19 + Vite + Tailwind CSS
- **Backend**: Node.js + Express
- **Database**: MongoDB (Atlas)
- **Image API**: Clipdrop (Text-to-Image)

## Preview

> Add screenshots/GIFs here once deployed.

- Live App: _(add Netlify URL)_
- API: https://imagify-api-g2gc.onrender.com

## Architecture (high level)

```mermaid
flowchart LR
  U[User / Browser] -->|HTTPS| FE[Frontend (Netlify)]
  FE -->|HTTPS /api/*| API[Backend API (Render)]
  API -->|Mongoose| DB[(MongoDB Atlas)]
  API -->|Clipdrop API Key| CD[Clipdrop Text-to-Image]
```

## Repository Structure

```
client/   # Vite + React frontend
server/   # Express API
render.yaml      # Render Blueprint (optional)
netlify.toml     # Netlify build + SPA routing config
```

## Environment Variables

### Backend (`server` on Render)

Set these in **Render → Service → Environment**:

- `MONGODB_URI` – MongoDB Atlas URI **without** a db name (the app appends `/imagify`)
  - Example: `mongodb+srv://USER:PASS@cluster.xxxxx.mongodb.net`
- `JWT_SECRET` – any long random secret
- `CLIPDROP_API_KEY` – your Clipdrop API key

### Frontend (`client` on Netlify)

Set this in **Netlify → Site configuration → Environment variables**:

- `VITE_BACKEND_URL` – Render API base URL
  - Example: `https://imagify-api-g2gc.onrender.com`

> Note: Vite env vars are baked at build-time. After changing env vars, redeploy on Netlify.

## Local Development

### 1) Backend

From `server/`:

```bash
npm install
npm run server
```

Backend runs on: `http://localhost:4000`

### 2) Frontend

From `client/`:

```bash
npm install
npm run dev
```

Frontend runs on the Vite dev URL shown in the terminal.

### Local `.env` examples

Frontend (`client/.env`):

```dotenv
VITE_BACKEND_URL=http://localhost:4000
```

Backend (`server/.env`) **(do not commit)**:

```dotenv
MONGODB_URI=mongodb+srv://USER:PASS@cluster.xxxxx.mongodb.net
JWT_SECRET=your_secret
CLIPDROP_API_KEY=your_clipdrop_key
```

## API Endpoints

Base URL: `/api`

| Method | Route | Auth | Description |
|---|---|---:|---|
| POST | `/user/register` | No | Register user |
| POST | `/user/login` | No | Login user |
| GET | `/user/credits` | Yes (token header) | Get credits + user |
| POST | `/image/generate-image` | Yes (token header) | Generate image from prompt |

**Auth header**

Requests use a custom header named `token`:

- `token: <jwt>`

## Deployment

### Backend: Render (Web Service)

**Option A — Render UI (no YAML required)**

- New → **Web Service**
- Root Directory: `server`
- Build: `npm install`
- Start: `npm start`
- Add env vars: `MONGODB_URI`, `JWT_SECRET`, `CLIPDROP_API_KEY`

**Option B — Render Blueprint**

This repo includes [render.yaml](render.yaml). In Render:

- New → **Blueprint** → select repo → deploy

### Frontend: Netlify

This repo includes [netlify.toml](netlify.toml) and SPA fallback routing.

- New site from Git
- Base directory: `client`
- Build command: `npm run build`
- Publish directory: `dist`
- Env var: `VITE_BACKEND_URL=https://imagify-api-g2gc.onrender.com`

## Troubleshooting

### Netlify shows “Page not found” on refresh

Ensure SPA redirect is enabled:

- [netlify.toml](netlify.toml) contains a `/* -> /index.html` rewrite.
- `client/public/_redirects` exists.

### Frontend can’t reach backend (404 or wrong URL)

Check DevTools → Network:

- Request URL must be: `https://imagify-api-g2gc.onrender.com/api/...`
- If you see `//api/...` or calls to the Netlify domain, fix `VITE_BACKEND_URL` and redeploy.

### Render is slow on first request

Render free tier services can sleep; first request may take ~20–60s.

## Tech Stack

- React, Vite, Tailwind CSS
- Node.js, Express, Mongoose
- MongoDB Atlas

## License

Add a license if you plan to open-source this.
