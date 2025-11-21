import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-light text-muted mt-5 border-top">
      <Container className="py-4">
        <Row>
          <Col md={4} className="mb-3">
            <h5 className="mb-2">DevSoft</h5>
            <p className="small mb-0">
              Desarrollo de Software Profesional
            </p>
          </Col>

          <Col md={4} className="mb-3">
            <h6 className="mb-2">Contacto</h6>
            <ul className="list-unstyled small mb-0">
              <li>Atención al cliente</li>
              <li>📞 +54 9 11 1234-5678</li>
              <li>✉️ Devsoft@gmail.com</li>
            </ul>
          </Col>
        </Row>

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