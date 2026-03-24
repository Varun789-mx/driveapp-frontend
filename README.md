# R2-Store — Frontend

A modern cloud storage web application frontend built on top of **Cloudflare R2** object storage. Upload, manage, and access your files through a clean, minimal UI — deployed live at [r2-store.vercel.app](https://r2-store.vercel.app).

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 |
| Language | TypeScript 5.9 |
| Build Tool | Vite 8 |
| Styling | Tailwind CSS v4 |
| HTTP Client | Axios |
| Notifications | react-hot-toast |
| Icons | lucide-react |
| Package Manager | Bun |
| Deployment | Vercel |

---

## Features

- 📁 File upload and management via Cloudflare R2
- 🔔 Real-time toast notifications for upload/delete feedback
- 🎨 Clean, responsive UI with Tailwind CSS v4
- ⚡ Blazing fast dev experience with Vite HMR
- 🔒 Environment-based API configuration

---

## Project Structure
```
driveapp-frontend/
├── public/                  # Static assets
├── src/                     # Application source
│   └── main.tsx             # App entry point
├── .env                     # Environment variables (see below)
├── index.html               # HTML shell — app title: R2-Store
├── vite.config.ts           # Vite + React + Tailwind config
├── tsconfig.json            # TypeScript project config
├── package.json             # Dependencies & scripts
└── bun.lock                 # Bun lockfile
```

---

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) installed
- A Cloudflare R2 bucket and backend API (see [backend repo](#))

### Installation
```bash
# Clone the repository
git clone https://github.com/Varun789-mx/driveapp-frontend.git
cd driveapp-frontend

# Install dependencies
bun install
```

### Environment Variables

Create a `.env` file in the root of the project:
```env
VITE_API_URL=https://your-backend-api-url.com
```

> All Vite env variables must be prefixed with `VITE_` to be exposed to the client.

### Running Locally
```bash
bun run dev
```

The app will be available at `http://localhost:5173`.

### Building for Production
```bash
bun run build
```

Output is generated in the `dist/` folder, ready for deployment.

### Preview Production Build
```bash
bun run dev
```

---

## Available Scripts

| Command | Description |
|---|---|
| `bun run dev` | Start the Vite development server with HMR |
| `bun run build` | Type-check and build for production |

---

## Deployment

This project is deployed on **Vercel**. Any push to `main` triggers an automatic deployment.

Live URL: **[r2-store.vercel.app](https://r2-store.vercel.app)**

To deploy your own instance:

1. Fork this repository
2. Import it into [Vercel](https://vercel.com)
3. Add your `VITE_API_URL` in the Vercel environment variables settings
4. Deploy

---

## Related

- 🔗 Backend repo — *(link your backend repo here)*
- ☁️ [Cloudflare R2 Docs](https://developers.cloudflare.com/r2/)

---

## License

MIT
