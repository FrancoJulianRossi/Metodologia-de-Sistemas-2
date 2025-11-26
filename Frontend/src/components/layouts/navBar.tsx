import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

// Navigation bar component that provides links to main application pages
const NavBar: React.FC = () => {
  // Hook to navigate between routes
  const navigate = useNavigate();

  return (
    // Bootstrap navbar with light background that expands on medium screens
    <Navbar bg="light" expand="md" className="mb-3">
      <Container>
        {/* Navbar brand - clinic name that navigates to home on click */}
        <Navbar.Brand style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
          Clinica
        </Navbar.Brand>
        {/* Toggle button for mobile navigation */}
        <Navbar.Toggle aria-controls="main-navbar" />
        {/* Collapsible navbar content */}
        <Navbar.Collapse id="main-navbar">
          {/* Navigation buttons aligned to the right */}
          <div className="ms-auto d-flex gap-2">
            {/* Button to navigate to medics page */}
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => navigate('/medicPage')}
            >
              Medics
            </button>
            {/* Button to navigate to appointments page */}
            <button
              type="button"
              className="btn btn-success"
              onClick={() => navigate('/appointmentPage')}
            >
              Appointments
            </button>
            {/* Button to navigate to patients page */}
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