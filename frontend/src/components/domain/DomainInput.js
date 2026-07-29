import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';

const DomainInput = ({ domain, setDomain, error }) => {
  return (
    <Form.Group className="mb-3" controlId="domainInput">
      <InputGroup size="lg">
        <Form.Control
          type="text"
          placeholder="Enter domain name (e.g., example.com)"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          isInvalid={!!error}
        />
        <InputGroup.Text id="domain-addon">.com</InputGroup.Text>
        <Form.Control.Feedback type="invalid">
          {error}
        </Form.Control.Feedback>
      </InputGroup>
    </Form.Group>
  );
};

export default DomainInput;
