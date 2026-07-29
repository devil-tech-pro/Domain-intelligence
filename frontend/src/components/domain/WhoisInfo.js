import React from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';

const WhoisInfo = ({ whoisData }) => {
  const formatDate = (dateString) => {
    if (!dateString || dateString === 'Unknown') return 'Unknown';
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    } catch (error) {
      return dateString;
    }
  };

  return (
    <Card>
      <Card.Header as="h5">WHOIS Information</Card.Header>
      <Card.Body>
        <Row>
          <Col md={6}>
            <h6 className="text-secondary">Domain Details</h6>
            <Table striped bordered hover responsive>
              <tbody>
                <tr>
                  <td><strong>Domain:</strong></td>
                  <td>{whoisData?.domain || 'Unknown'}</td>
                </tr>
                <tr>
                  <td><strong>Registrar:</strong></td>
                  <td>{whoisData?.registrar || 'Unknown'}</td>
                </tr>
                <tr>
                  <td><strong>Creation Date:</strong></td>
                  <td>{formatDate(whoisData?.creationDate)}</td>
                </tr>
                <tr>
                  <td><strong>Expiry Date:</strong></td>
                  <td>{formatDate(whoisData?.expiryDate)}</td>
                </tr>
                <tr>
                  <td><strong>Updated Date:</strong></td>
                  <td>{formatDate(whoisData?.updatedDate)}</td>
                </tr>
                <tr>
                  <td><strong>Status:</strong></td>
                  <td>{whoisData?.status || 'Unknown'}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
          <Col md={6}>
            <h6 className="text-secondary">Registrant Information</h6>
            <Table striped bordered hover responsive>
              <tbody>
                <tr>
                  <td><strong>Name:</strong></td>
                  <td>{whoisData?.registrant?.name || 'Unknown'}</td>
                </tr>
                <tr>
                  <td><strong>Organization:</strong></td>
                  <td>{whoisData?.registrant?.organization || 'Unknown'}</td>
                </tr>
                <tr>
                  <td><strong>Country:</strong></td>
                  <td>{whoisData?.registrant?.country || 'Unknown'}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        
        <Row className="mt-4">
          <Col>
            <h6 className="text-secondary">Name Servers</h6>
            {whoisData?.nameServers && whoisData.nameServers.length > 0 ? (
              <ul>
                {whoisData.nameServers.map((server, index) => (
                  <li key={index}>{server}</li>
                ))}
              </ul>
            ) : (
              <p>No name servers available</p>
            )}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default WhoisInfo;
