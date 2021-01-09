import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';

export default function Register() {
    const [variables, setVariables] = useState({
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
    });

    const submitRegisterForm = e => {
        e.preventDefault();
        console.log(variables)
    }

    return (
        <Row className="bg-white py-5 justify-content-center">
            <Col col-sm={8} md={6} lg={4}>
                <h1 className="text-center">Register Chat</h1>
                <Form onSubmit={submitRegisterForm}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={variables.email}
                            onChange={(e) => {
                                setVariables({ ...variables, email: e.target.value })
                            }}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter username"
                            value={variables.username}
                            onChange={(e) => {
                                setVariables({ ...variables, username: e.target.value })
                            }}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={variables.password}
                            onChange={(e) => {
                                setVariables({ ...variables, password: e.target.value })
                            }}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Confirm password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Confirm password"
                            value={variables.confirmPassword}
                            onChange={(e) => {
                                setVariables({ ...variables, confirmPassword: e.target.value })
                            }}
                        />
                    </Form.Group>

                    <div className="text-center">
                        <Button variant="success" type="submit">
                            Register
              </Button>
                    </div>
                </Form>
            </Col>
        </Row>
    )
}
