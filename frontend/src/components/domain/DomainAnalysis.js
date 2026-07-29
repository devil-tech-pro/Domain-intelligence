import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Row, Col, Tabs, Tab, Button, Alert, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { FaArrowLeft, FaDownload, FaSave } from 'react-icons/fa';

import WhoisInfo from './WhoisInfo';
import DnsRecords from './DnsRecords';
import SslInfo from './SslInfo';
import { domainService } from '../../services/api';

const DomainAnalysis = () => {
  const { domain } = useParams();
  const navigate = useNavigate();
  
  const [domainData, setDomainData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('whois');

  useEffect(() => {
    const fetchDomainData = async () => {
      try {
        setLoading(true);
        const response = await domainService.analyzeDomain(domain);
        
        if (response.success) {
          setDomainData(response.data);
        } else {
          setError(response.error || 'Failed to analyze domain');
          toast.error(response.error || 'Failed to analyze domain');
        }
      } catch (err) {
        setError('An error occurred while analyzing the domain');
        toast.error('An error occurred while analyzing the domain');
      } finally {
        setLoading(false);
      }
    };

    fetchDomainData();
  }, [domain]);

  const handleSaveReport = async () => {
    try {
      const response = await domainService.saveReport(domain, domainData);
      
      if (response.success) {
        toast.success('Report saved successfully');
      } else {
        toast.error('Failed to save report');
      }
    } catch (err) {
      toast.error('An error occurred while saving the report');
    }
  };

  const handleExportPdf = async () => {
    try {
      const response = await domainService.exportReport(domain);
      
      // Create a blob from the response data
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      
      // Create a link and trigger download
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${domain}-report.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success('Report exported successfully');
    } catch (err) {
      toast.error('An error occurred while exporting the report');
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="text-center py-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <p className="mt-3">Analyzing domain...</p>
        </div>
      );
    }

    if (error) {
      return (
        <Alert variant="danger">
          <Alert.Heading>Error</Alert.Heading>
          <p>{error}</p>
        </Alert>
      );
    }

    if (!domainData) {
      return (
        <Alert variant="info">
          <Alert.Heading>No Data</Alert.Heading>
          <p>No domain data available</p>
        </Alert>
      );
    }

    return (
      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
        className="mb-4"
      >
        <Tab eventKey="whois" title="WHOIS Information">
          <WhoisInfo whoisData={domainData.whois} />
        </Tab>
        <Tab eventKey="dns" title="DNS Records">
          <DnsRecords dnsData={domainData.dns} />
        </Tab>
        <Tab eventKey="ssl" title="SSL Certificate">
          <SslInfo sslData={domainData.ssl} />
        </Tab>
      </Tabs>
    );
  };

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Button variant="outline-secondary" onClick={() => navigate('/')}>
          <FaArrowLeft className="me-2" />
          Back
        </Button>
        
        <h1 className="mb-0">Domain Analysis: {domain}</h1>
        
        <div>
          <Button variant="outline-primary" className="me-2" onClick={handleSaveReport}>
            <FaSave className="me-2" />
            Save Report
          </Button>
          <Button variant="primary" onClick={handleExportPdf}>
            <FaDownload className="me-2" />
            Export PDF
          </Button>
        </div>
      </div>
      
      <Card>
        <Card.Body>
          {renderContent()}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default DomainAnalysis;
