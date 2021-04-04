import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { gql, useLazyQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { useAuthDispatch } from '../context/auth';

const LOGIN_USER = gql`
  query login( 
      $username: String! 
      $password: String! 
    ) {
    login(
        username: $username 
        password: $password 
    ) {
      username
      createdAt
      token 
    }
  }
`;

export default function Login(props) {
    const [variables, setVariables] = useState({
        username: '',
        password: '',
    })
    const [errors, setErrors] = useState({})

    const dispatch = useAuthDispatch()

    const [loginUser, { loading }] = useLazyQuery(LOGIN_USER, {
        onError: (err) => setErrors(err.graphQLErrors[0].extensions.errors),
        onCompleted(data) {
            dispatch({ type: 'LOGIN', payload: data.login })
            window.location.href = '/'
            // props.history.push('/')
        },
    })

    const submitLoginForm = e => {
        e.preventDefault();
        loginUser({ variables });
    }

    return (
        <Row className="bg-white py-5 justify-content-center">
            <Col col-sm={8} md={6} lg={4}>
                <h1 className="text-center">Login Chat</h1>
                <Form onSubmit={submitLoginForm}>
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

                    <div className="text-center d-flex flex-column">
                        <Button className="mb-3" variant="success" type="submit" disabled={loading}>
                            {loading ? 'Loading...' : 'Login'}
                        </Button>
                        <small>Don't have account? <Link to='/register'>Register</Link></small>
                    </div>
                </Form>
            </Col>
        </Row>
    )
}

