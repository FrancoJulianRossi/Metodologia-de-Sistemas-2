import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const NavBar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Navbar bg="light" expand="md" className="mb-3">
      <Container>
        <Navbar.Brand style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
          Clinica
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <div className="ms-auto d-flex gap-2">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => navigate('/medicPage')}
            >
              Medics
            </button>
            <button
              type="button"
              className="btn btn-success"
              onClick={() => navigate('/appointmentPage')}
            >
              Appointments
            </button>
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