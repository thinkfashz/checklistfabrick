import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware for JSON parsing
  app.use(express.json());

  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "Backend de Casas Fabris funcionando correctamente" });
  });

  // Example API for project data (could be expanded later)
  app.get("/api/project-info", (req, res) => {
    res.json({
      company: "Casas Fabris",
      version: "1.0.0",
      status: "Production Ready"
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor de Casas Fabris corriendo en http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Error al iniciar el servidor:", err);
});
