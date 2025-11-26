import express from "express";
import path from "path";
import loginHandler from "./api/login";
import { getLogins, clearLogins } from "./api/logins";

const app = express();
const PORT = 3001;

// Parse JSON bodies
app.use(express.json());

// Absolute path to /public at the project root
// /ato-simulator/backend/src → .. → .. → /ato-simulator/public
const publicDir = path.join(__dirname, "..", "..", "public");

// Serve static files (login.html, logins.html, CSS, etc.)
app.use(express.static(publicDir));

// ---- API ROUTES ----
app.post("/api/login", loginHandler);
app.get("/api/logins", getLogins);
app.post("/api/logins/clear", clearLogins);

// ---- HTML ROUTES ----

// Root → login simulator
app.get("/", (_req, res) => {
  res.sendFile(path.join(publicDir, "login.html"));
});

// Optional: /dashboard → event log page
app.get("/dashboard", (_req, res) => {
  res.sendFile(path.join(publicDir, "logins.html"));
});

// ---- START SERVER ----
app.listen(PORT, () => {
  console.log(`ATO Simulator running on http://localhost:${PORT}`);
  console.log(`Serving static files from: ${publicDir}`);
});
