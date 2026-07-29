import React from 'react';
import { Card, Row, Col, Table, Badge } from 'react-bootstrap';

const SslInfo = ({ sslData }) => {
  const formatDate = (dateString) => {
    if (!dateString || dateString === 'Unknown') return 'Unknown';
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    } catch (error) {
      return dateString;
    }
  };

  const getDaysRemainingColor = (days) => {
    if (typeof days !== 'number') return 'secondary';
    
    if (days < 30) return 'danger';
    if (days < 90) return 'warning';
    return 'success';
  };

  return (
    <Card>
      <Card.Header as="h5">SSL Certificate Information</Card.Header>
      <Card.Body>
        {sslData?.valid === false ? (
          <div className="alert alert-danger">
            <strong>SSL Certificate Error:</strong> {sslData?.error || 'Unknown error'}
          </div>
        ) : (
          <>
            <Row>
              <Col md={6}>
                <h6 className="text-secondary">Certificate Details</h6>
                <Table striped bordered hover responsive>
                  <tbody>
                    <tr>
                      <td><strong>Domain:</strong></td>
                      <td>{sslData?.domain || 'Unknown'}</td>
                    </tr>
                    <tr>
                      <td><strong>Serial Number:</strong></td>
                      <td>{sslData?.serialNumber || 'Unknown'}</td>
                    </tr>
                    <tr>
                      <td><strong>Signature Algorithm:</strong></td>
                      <td>{sslData?.signatureAlgorithm || 'Unknown'}</td>
                    </tr>
                    <tr>
                      <td><strong>Key Algorithm:</strong></td>
                      <td>{sslData?.keyAlgorithm || 'Unknown'}</td>
                    </tr>
                    <tr>
                      <td><strong>Key Size:</strong></td>
                      <td>{sslData?.keySize || 'Unknown'}</td>
                    </tr>
                    <tr>
                      <td><strong>Fingerprint:</strong></td>
                      <td>{sslData?.fingerprint || 'Unknown'}</td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
              <Col md={6}>
                <h6 className="text-secondary">Validity Period</h6>
                <Table striped bordered hover responsive>
                  <tbody>
                    <tr>
                      <td><strong>Not Before:</strong></td>
                      <td>{formatDate(sslData?.validity?.notBefore)}</td>
                    </tr>
                    <tr>
                      <td><strong>Not After:</strong></td>
                      <td>{formatDate(sslData?.validity?.notAfter)}</td>
                    </tr>
                    <tr>
                      <td><strong>Days Remaining:</strong></td>
                      <td>
                        <Badge bg={getDaysRemainingColor(sslData?.validity?.daysRemaining)}>
                          {sslData?.validity?.daysRemaining || 'Unknown'} days
                        </Badge>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
            
            <Row className="mt-4">
              <Col md={6}>
                <h6 className="text-secondary">Issuer Information</h6>
                <Table striped bordered hover responsive>
                  <tbody>
                    <tr>
                      <td><strong>Common Name:</strong></td>
                      <td>{sslData?.issuer?.name || 'Unknown'}</td>
                    </tr>
                    <tr>
                      <td><strong>Organization:</strong></td>
                      <td>{sslData?.issuer?.organization || 'Unknown'}</td>
                    </tr>
                    <tr>
                      <td><strong>Country:</strong></td>
                      <td>{sslData?.issuer?.country || 'Unknown'}</td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
              <Col md={6}>
                <h6 className="text-secondary">Subject Information</h6>
                <Table striped bordered hover responsive>
                  <tbody>
                    <tr>
                      <td><strong>Common Name:</strong></td>
                      <td>{sslData?.subject?.name || 'Unknown'}</td>
                    </tr>
                    <tr>
                      <td><strong>Organization:</strong></td>
                      <td>{sslData?.subject?.organization || 'Unknown'}</td>
                    </tr>
                    <tr>
                      <td><strong>Country:</strong></td>
                      <td>{sslData?.subject?.country || 'Unknown'}</td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
            
            <Row className="mt-4">
              <Col>
                <h6 className="text-secondary">Protocol & Cipher</h6>
                <Table striped bordered hover responsive>
                  <tbody>
                    <tr>
                      <td><strong>Protocol:</strong></td>
                      <td>{sslData?.protocol || 'Unknown'}</td>
                    </tr>
                    <tr>
                      <td><strong>Cipher Name:</strong></td>
                      <td>{sslData?.cipher?.name || 'Unknown'}</td>
                    </tr>
                    <tr>
                      <td><strong>Cipher Version:</strong></td>
                      <td>{sslData?.cipher?.version || 'Unknown'}</td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default SslInfo;
