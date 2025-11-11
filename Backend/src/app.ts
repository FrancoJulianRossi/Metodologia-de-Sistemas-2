import express from "express";
const patientRoutes = require("./routes/patient.routes.js");

export function makeApp() {
  const app = express();
  app.use(express.json());

  // Patient Routes
  app.use("/api/patients", patientRoutes);

  // basic error handler (for unexpected)
  app.use((err: any, _req: any, res: any, _next: any) => {
    console.error(err);
    res.status(500).json({ error: "internal" });
  });

  return app;
}

export default makeApp;
