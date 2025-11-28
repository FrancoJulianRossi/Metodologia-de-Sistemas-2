import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

// Componente Footer: muestra información de la compañía, contacto y copyright
const Footer: React.FC = () => {
  // Obtener año actual para el texto de copyright
  const year = new Date().getFullYear();

  return (
    // Sección footer con fondo claro y borde superior
    <footer className="bg-light text-muted mt-5 border-top">
      <Container className="py-4">
        {/* Primera fila: info de la compañía y contacto */}
        <Row>
          {/* Nombre y descripción de la compañía - 4 columnas en pantallas md */}
          <Col md={4} className="mb-3">
            <h5 className="mb-2">DevSoft</h5>
            <p className="small mb-0">
              Desarrollo de Software Profesional
            </p>
          </Col>

          {/* Información de contacto - 4 columnas en pantallas md */}
          <Col md={4} className="mb-3">
            <h6 className="mb-2">Contacto</h6>
            <ul className="list-unstyled small mb-0">
              <li>Atención al cliente</li>
              <li>📞 +54 9 11 1234-5678</li>
              <li>✉️ Devsoft@gmail.com</li>
            </ul>
          </Col>
        </Row>

        {/* Segunda fila: aviso de copyright centrado */}
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