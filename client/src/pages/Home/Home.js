import React, { Fragment, useEffect } from 'react';
import { Button, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuthDispatch } from '../../context/auth';
import Messages from './Messages';
import Users from './Users';
import { gql, useSubscription } from '@apollo/client';

const NEW_MESSAGE = gql`
    subscription newMessage {
        newMessage {
            uuid
            from
            to
            content
            createdAt
        }
    }
`;

export default function Home({ history }) {
    const dispatch = useAuthDispatch();

    const { data: messageData, error: messageError } = useSubscription(NEW_MESSAGE);

    useEffect(() => {
        if(messageError) console.log(messageError)
        
    })

    const logout = () => {
        dispatch({ type: 'LOGOUT' })
        window.location.href = '/login';
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
                <Users />
                <Messages />
            </Row>
        </Fragment>
    )
}
