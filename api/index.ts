import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware for JSON parsing
app.use(express.json());

// API routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Backend de Casas Fabris funcionando correctamente" });
});

// Example API for project data
app.get("/api/project-info", (req, res) => {
  res.json({
    company: "Casas Fabris",
    version: "1.0.0",
    status: "Production Ready"
  });
});

// For Vercel, we export the app
// For local dev, we might still want to use Vite middleware, but Vercel handles that differently.
// In Vercel, the frontend is built separately.

export default app;
