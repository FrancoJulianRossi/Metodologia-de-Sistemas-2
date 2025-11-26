import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

// Footer component displaying company information, contact details, and copyright
const Footer: React.FC = () => {
  // Get current year for copyright text
  const year = new Date().getFullYear();

  return (
    // Footer section with light background and top border
    <footer className="bg-light text-muted mt-5 border-top">
      <Container className="py-4">
        {/* First row with company info and contact details */}
        <Row>
          {/* Company name and description - 4 columns width on medium screens */}
          <Col md={4} className="mb-3">
            <h5 className="mb-2">DevSoft</h5>
            <p className="small mb-0">
              Desarrollo de Software Profesional
            </p>
          </Col>

          {/* Contact information - 4 columns width on medium screens */}
          <Col md={4} className="mb-3">
            <h6 className="mb-2">Contacto</h6>
            <ul className="list-unstyled small mb-0">
              <li>Atención al cliente</li>
              <li>📞 +54 9 11 1234-5678</li>
              <li>✉️ Devsoft@gmail.com</li>
            </ul>
          </Col>
        </Row>

        {/* Second row with centered copyright notice */}
        <Row className="pt-3">
          <Col className="text-center small">
            &copy; {year} Devsoft. Todos los derechos reservados.
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;