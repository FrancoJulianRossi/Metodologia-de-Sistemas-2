import express from "express";

export function makeApp() {
  const app = express();
  app.use(express.json());

  // CORS configuration - allow frontend dev servers
  const cors = require("cors");
  const allowedOrigins = [
    process.env.FRONTEND_URL || "http://localhost:5173",
    "http://localhost:3000",
  ];

  app.use(
    cors({
      origin: (origin: any, callback: any) => {
        // allow requests with no origin (e.g., curl, server-to-server)
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) return callback(null, true);
        return callback(new Error("Not allowed by CORS"));
      },
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      credentials: true,
    })
  );

  const patientRoutes = require("./routes/patient.routes.js");
  app.use("/api/patients", patientRoutes);

  const appointmentRoutes = require("./routes/appointment.routes");
  app.use("/appointments", appointmentRoutes);

  const medicRoutes = require("./routes/medic.routes");
  app.use("/medics", medicRoutes);

  const specialityRoutes = require("./routes/speciality.routes");
  app.use("/specialities", specialityRoutes);

  app.use((err: any, _req: any, res: any, _next: any) => {
    console.error(err);
    res.status(500).json({ error: "internal" });
  });

  return app;
}

export default makeApp;
