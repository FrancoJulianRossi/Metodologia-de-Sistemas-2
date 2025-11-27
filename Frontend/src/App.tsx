import React from 'react'
import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import MedicPage from './pages/MedicPage'
import AppointmentPage from './pages/appointmentPage'
import PatientPage from './pages/patientPage'
import MedicFormularioPage from './pages/medicFormularioPage'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/appointmentPage" replace />} />
        <Route path="/medicPage" element={<MedicPage />} />
        <Route path="/appointmentPage" element={<AppointmentPage />} />
        <Route path="/patientPage" element={<PatientPage />} />
        <Route path="/medics/new" element={<MedicFormularioPage />} />
        <Route path="*" element={<h2>404 — Página no encontrada</h2>} />
      </Routes>
    </>
  )
}

export default App;
