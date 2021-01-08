import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './App.scss';

function App() {
  return (
    <Container className="pt-3">
      <Row className="bg-white py-5 justify-content-center">
        <Col col-sm={8} md={6} lg={4}>
          <h1 className="text-center">Register Chat Platform</h1>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter username" />
            </Form.Group>
            
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Confirm password</Form.Label>
              <Form.Control type="password" placeholder="Confirm password" />
            </Form.Group>

            <Button variant="success" type="submit">
              Register
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
