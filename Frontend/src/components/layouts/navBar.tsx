import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

// Barra de navegación: enlaces hacia las páginas principales de la aplicación
const NavBar: React.FC = () => {
  // Hook para navegar entre rutas
  const navigate = useNavigate();

  return (
    // Navbar de Bootstrap con fondo claro y margen inferior
    <Navbar bg="light" expand="md" className="mb-3">
      <Container>
        {/* Brand de la navbar - nombre de la clínica; click navega a la raíz */}
        <Navbar.Brand style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
          Clinica
        </Navbar.Brand>
        {/* Botón toggle para navegación en móviles */}
        <Navbar.Toggle aria-controls="main-navbar" />
        {/* Contenido colapsable */}
        <Navbar.Collapse id="main-navbar">
          {/* Botones de navegación alineados a la derecha */}
          <div className="ms-auto d-flex gap-2">
            {/* Navegar a página de médicos */}
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => navigate('/medicPage')}
            >
              Medics
            </button>
            {/* Navegar a página de citas */}
            <button
              type="button"
              className="btn btn-success"
              onClick={() => navigate('/appointmentPage')}
            >
              Appointments
            </button>
            {/* Navegar a página de pacientes */}
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate('/patientPage')}
            >
              Patients
            </button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;