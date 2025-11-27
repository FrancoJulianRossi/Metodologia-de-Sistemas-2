import './App.css'
import { Routes, Route } from 'react-router-dom'
import MedicPage from './pages/MedicPage'
import MedicFormularioPage from './pages/medicFormularioPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<MedicPage />} />
      <Route path="/medics/new" element={<MedicFormularioPage />} />
    </Routes>
  )
}

export default App;
