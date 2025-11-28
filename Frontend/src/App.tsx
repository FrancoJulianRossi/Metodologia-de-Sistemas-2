/**
 * Componente App: raíz de la aplicación React.
 * Define todas las rutas usando React Router (Routes).
 * El BrowserRouter está en main.tsx para envolver toda la app.
 */
import React from 'react';
import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import MedicPage from './pages/MedicPage'
import AppointmentPage from './pages/appointmentPage'
import PatientPage from './pages/patientPage'
import MedicFormularioPage from './pages/medicFormularioPage'

// Componente raíz de la aplicación: define las rutas principales
function App() {
  return (
    <>
      <Routes>
        {/* Ruta raíz: redirige a la página de citas */}
        <Route path="/" element={<Navigate to="/appointmentPage" replace />} />
        {/* Página de médicos */}
        <Route path="/medicPage" element={<MedicPage />} />
        {/* Página de citas */}
        <Route path="/appointmentPage" element={<AppointmentPage />} />
        {/* Página de pacientes */}
        <Route path="/patientPage" element={<PatientPage />} />
        {/* Formulario para crear un nuevo médico */}
        <Route path="/medics/new" element={<MedicFormularioPage />} />
        {/* Ruta comodín para 404 */}
        <Route path="*" element={<h2>404 — Página no encontrada</h2>} />
      </Routes>
    </>
  )
}

export default App;
