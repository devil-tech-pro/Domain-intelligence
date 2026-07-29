import React, { useState, useEffect } from 'react';
import { Container, Card, Table, Button, Alert, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { FaEye, FaDownload, FaTrash } from 'react-icons/fa';
import { reportService } from '../../services/api';

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        const response = await reportService.getReports();
        
        if (response.success) {
          setReports(response.data);
        } else {
          setError(response.error || 'Failed to fetch reports');
          toast.error(response.error || 'Failed to fetch reports');
        }
      } catch (err) {
        setError('An error occurred while fetching reports');
        toast.error('An error occurred while fetching reports');
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const handleExportReport = async (reportId, domain) => {
    try {
      const response = await reportService.exportReport(reportId);
      
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

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown';
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    } catch (error) {
      return dateString;
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="text-center py-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <p className="mt-3">Loading reports...</p>
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

    if (reports.length === 0) {
      return (
        <Alert variant="info">
          <Alert.Heading>No Reports</Alert.Heading>
          <p>No reports available. Analyze a domain to generate a report.</p>
        </Alert>
      );
    }

    return (
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Domain</th>
            <th>Created Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report.id}>
              <td>{report.id}</td>
              <td>{report.domain}</td>
              <td>{formatDate(report.created_at)}</td>
              <td>
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="me-2"
                  onClick={() => handleExportReport(report.id, report.domain)}
                >
                  <FaDownload className="me-1" />
                  Export
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };

  return (
    <Container className="py-4">
      <h1 className="mb-4">Domain Intelligence Reports</h1>
      
      <Card>
        <Card.Body>
          {renderContent()}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Reports;
