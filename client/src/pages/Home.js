import { gql, useQuery } from '@apollo/client';
import React, { Fragment } from 'react';
import { Row, Button, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuthDispatch } from '../context/auth';

const GET_USERS = gql`
    query getUsers{
        getUsers{
            username
            email
            createdAt
        }
    }
`

export default function Home(props) {
    const dispatch = useAuthDispatch();

    const logout = () => {
        dispatch({ type: 'LOGOUT' })
        props.history.push('/login')
    }

    const { loading, data, error } = useQuery(GET_USERS);

    if (error) {
        console.log(error)
    }
    if (data) {
        console.log(data);
    }

    let usersMarkup;
    if (!data || loading) {
        usersMarkup = <p>Loading...</p>
    } else if (data.getUsers.length === 0) {
        usersMarkup = <p>Not users have joined yet</p>
    } else if (data.getUsers.length > 0) {
        usersMarkup = data.getUsers.map((user) => (
            <div key={user.username} >
                <p>{user.username}</p>
            </div>
        ))
    }

    return (
        <Fragment>
            <Row className="bg-white justify-content-around mb-1">
                <Link to="/login">
                    <Button variant="link">Login</Button>
                </Link>
                <Link to="/register">
                    <Button variant="link">Register</Button>
                </Link>
                <Link to="/login">
                    <Button variant="link" onClick={logout}>Logout</Button>
                </Link>
            </Row>
            <Row className="bg-white">
                <Col xs={4}>
                    {usersMarkup}
                </Col>
                <Col xs={8}>
                    Messages
                </Col>
            </Row>
        </Fragment>
    )
}
