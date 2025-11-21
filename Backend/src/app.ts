import express from "express";
const patientRoutes = require("./routes/patient.routes.js");

export function makeApp() {
  const app = express();
  app.use(express.json());

  // Patient Routes
  app.use("/api/patients", patientRoutes);

  // basic error handler (for unexpected)

  const cors = require("cors");
  app.use(
    cors({
      origin: process.env.FRONTEND_URL || "http://localhost:3000",
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      credentials: true,
    })
  );

  const appointmentRoutes = require('./routes/appointment.routes');
  app.use('/appointments', appointmentRoutes);


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
