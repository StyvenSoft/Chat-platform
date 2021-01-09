import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { gql, useMutation } from '@apollo/client';

const REGISTER_USER = gql`
  mutation register( 
      $username: String! 
      $email: String!
      $password: String! 
      $confirmPassword: String!
    ) {
    register(
        username: $username 
        email: $email 
        password: $password 
        confirmPassword: $confirmPassword
    ) {
      username
      email
      createdAt      
    }
  }
`;

export default function Register() {
    const [variables, setVariables] = useState({
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState({});

    const [registerUser, { loading }] = useMutation(REGISTER_USER, {
        update(_, res) {
            console.log(res)
        },
        onError(err) {
            console.log(err.graphQLErrors[0].extensions.errors);
            setErrors(err.graphQLErrors[0].extensions.errors);
        }
    })

    const submitRegisterForm = e => {
        e.preventDefault();
        registerUser({ variables });
    }

    return (
        <Row className="bg-white py-5 justify-content-center">
            <Col col-sm={8} md={6} lg={4}>
                <h1 className="text-center">Register Chat</h1>
                <Form onSubmit={submitRegisterForm}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label className={errors.email && 'text-danger'}>
                            {errors.email ?? 'Email address'}
                        </Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            className={errors.email && 'is-invalid'}
                            value={variables.email}
                            onChange={(e) => {
                                setVariables({ ...variables, email: e.target.value })
                            }}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label className={errors.username && 'text-danger'}>
                            {errors.username ?? 'Username'}
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter username"
                            className={errors.username && 'is-invalid'}
                            value={variables.username}
                            onChange={(e) => {
                                setVariables({ ...variables, username: e.target.value })
                            }}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label className={errors.password && 'text-danger'}>
                            {errors.password ?? 'Password'}
                        </Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            className={errors.password && 'is-invalid'}
                            value={variables.password}
                            onChange={(e) => {
                                setVariables({ ...variables, password: e.target.value })
                            }}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label className={errors.confirmPassword && 'text-danger'}>
                            {errors.confirmPassword ?? 'Confirm password'}
                        </Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Confirm password"
                            className={errors.confirmPassword && 'is-invalid'}
                            value={variables.confirmPassword}
                            onChange={(e) => {
                                setVariables({ ...variables, confirmPassword: e.target.value })
                            }}
                        />
                    </Form.Group>

                    <div className="text-center">
                        <Button variant="success" type="submit" disabled={loading}>
                            {loading ? 'Loading...' : 'Register'}
                        </Button>
                    </div>
                </Form>
            </Col>
        </Row>
    )
}
