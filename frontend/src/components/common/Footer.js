import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-auto">
      <Container>
        <Row>
          <Col className="text-center">
            <p className="mb-0">© 2023 Domain Intelligence Tool. All rights reserved.</p>
            <p className="mb-0">Built for Cybersecurity Lab</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
