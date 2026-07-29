import React, { useState } from 'react';
import { Container, Card, Row, Col, Button, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaSearch, FaShieldAlt, FaGlobe, FaLock } from 'react-icons/fa';
import DomainInput from './domain/DomainInput';

const Home = () => {
  const navigate = useNavigate();
  const [domain, setDomain] = useState('');
  const [error, setError] = useState('');

  const handleAnalyze = (e) => {
    e.preventDefault();
    
    if (!domain) {
      setError('Please enter a domain name');
      return;
    }
    
    // Basic domain validation
    const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9](?:\.[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9])*$/;
    
    if (!domainRegex.test(domain)) {
      setError('Please enter a valid domain name');
      return;
    }
    
    setError('');
    navigate(`/domain/${domain}`);
    toast.success(`Analyzing ${domain}...`);
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <Card className="shadow-sm">
            <Card.Body className="p-5">
              <div className="text-center mb-4">
                <FaShieldAlt size={60} className="text-primary mb-3" />
                <h1 className="fw-bold">Domain Intelligence Tool</h1>
                <p className="text-muted">
                  Analyze domain information including WHOIS data, DNS records, and SSL certificates
                </p>
              </div>
              
              <Form onSubmit={handleAnalyze}>
                <DomainInput 
                  domain={domain} 
                  setDomain={setDomain} 
                  error={error}
                />
                <div className="d-grid">
                  <Button variant="primary" type="submit" className="py-2">
                    <FaSearch className="me-2" />
                    Analyze Domain
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row className="mt-5">
        <Col md={4} className="mb-4">
          <Card className="h-100 text-center">
            <Card.Body>
              <FaGlobe size={40} className="text-primary mb-3" />
              <Card.Title as="h5">WHOIS Information</Card.Title>
              <Card.Text>
                Get detailed WHOIS data including registrar information, creation and expiry dates
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card className="h-100 text-center">
            <Card.Body>
              <FaSearch size={40} className="text-primary mb-3" />
              <Card.Title as="h5">DNS Records</Card.Title>
              <Card.Text>
                Analyze DNS records including A, AAAA, MX, TXT, NS, CNAME, and SOA records
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card className="h-100 text-center">
            <Card.Body>
              <FaLock size={40} className="text-primary mb-3" />
              <Card.Title as="h5">SSL Certificates</Card.Title>
              <Card.Text>
                Check SSL certificate information including issuer, validity period, and encryption details
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
