import React from 'react';
import { Card, Row, Col, Table, Badge } from 'react-bootstrap';

const DnsRecords = ({ dnsData }) => {
  const renderDnsTable = (records, recordType) => {
    if (!records || records.length === 0) {
      return (
        <Col md={6} className="mb-4">
          <Card>
            <Card.Header as="h6">{recordType} Records</Card.Header>
            <Card.Body>
              <p className="text-muted">No {recordType} records found</p>
            </Card.Body>
          </Card>
        </Col>
      );
    }

    return (
      <Col md={6} className="mb-4">
        <Card>
          <Card.Header as="h6">{recordType} Records</Card.Header>
          <Card.Body>
            <Table striped bordered hover responsive size="sm">
              <thead>
                <tr>
                  <th>Value</th>
                  <th>TTL</th>
                  {recordType === 'MX' && <th>Priority</th>}
                  {recordType === 'MX' && <th>Exchange</th>}
                </tr>
              </thead>
              <tbody>
                {records.map((record, index) => (
                  <tr key={index}>
                    <td>{record.value}</td>
                    <td>{record.ttl}</td>
                    {recordType === 'MX' && <td>{record.priority}</td>}
                    {recordType === 'MX' && <td>{record.exchange}</td>}
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Col>
    );
  };

  const renderSOARecord = (soaRecord) => {
    if (!soaRecord) {
      return (
        <Col md={12} className="mb-4">
          <Card>
            <Card.Header as="h6">SOA Record</Card.Header>
            <Card.Body>
              <p className="text-muted">No SOA record found</p>
            </Card.Body>
          </Card>
        </Col>
      );
    }

    return (
      <Col md={12} className="mb-4">
        <Card>
          <Card.Header as="h6">SOA Record</Card.Header>
          <Card.Body>
            <Table striped bordered hover responsive size="sm">
              <tbody>
                <tr>
                  <td><strong>Primary Name Server:</strong></td>
                  <td>{soaRecord.nsname}</td>
                </tr>
                <tr>
                  <td><strong>Admin Email:</strong></td>
                  <td>{soaRecord.hostmaster}</td>
                </tr>
                <tr>
                  <td><strong>Serial:</strong></td>
                  <td>{soaRecord.serial}</td>
                </tr>
                <tr>
                  <td><strong>Refresh:</strong></td>
                  <td>{soaRecord.refresh}</td>
                </tr>
                <tr>
                  <td><strong>Retry:</strong></td>
                  <td>{soaRecord.retry}</td>
                </tr>
                <tr>
                  <td><strong>Expire:</strong></td>
                  <td>{soaRecord.expire}</td>
                </tr>
                <tr>
                  <td><strong>Minimum TTL:</strong></td>
                  <td>{soaRecord.minttl}</td>
                </tr>
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Col>
    );
  };

  return (
    <div>
      <Row>
        {renderDnsTable(dnsData?.A, 'A')}
        {renderDnsTable(dnsData?.AAAA, 'AAAA')}
        {renderDnsTable(dnsData?.MX, 'MX')}
        {renderDnsTable(dnsData?.TXT, 'TXT')}
        {renderDnsTable(dnsData?.NS, 'NS')}
        {renderDnsTable(dnsData?.CNAME, 'CNAME')}
        {renderSOARecord(dnsData?.SOA)}
      </Row>
    </div>
  );
};

export default DnsRecords;
