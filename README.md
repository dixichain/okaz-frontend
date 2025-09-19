# Okaz Frontend (POC)

Simple Next.js app that talks to your FastAPI backend.

## Run locally
```bash
npm install
npm run dev
# open http://localhost:3000
```

Set the backend URL:
- In your shell before running: `set NEXT_PUBLIC_API_BASE=http://127.0.0.1:8000` (Windows PowerShell: `$env:NEXT_PUBLIC_API_BASE="http://127.0.0.1:8000"`)
- Or add it in Render as an environment variable when deploying.

## Deploy on Render
- **Build command**: `npm install && npm run build`
- **Start command**: `npm start`
- **Env var**: `NEXT_PUBLIC_API_BASE=https://<your-backend-on-render>`
