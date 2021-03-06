import React, { Fragment, useEffect } from 'react';
import { Button, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuthDispatch, useAuthState } from '../../context/auth';
import { useMessageDispatch } from '../../context/message';
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
    const authDispatch = useAuthDispatch();
    const messageDispatch = useMessageDispatch();
    const { user } = useAuthState();
    const { data: messageData, error: messageError } = useSubscription(NEW_MESSAGE);

    useEffect(() => {
        if(messageError) console.log(messageError)

        if(messageData) {
            const message = messageData.newMessage;
            const otherUser = user.username === message.to ? message.from : message.to

            messageDispatch({
                type: 'ADD_MESSAGE',
                payload: {
                    username: otherUser,
                    message
                }
            })
        }
        
    }, [messageError, messageData])

    const logout = () => {
        authDispatch({ type: 'LOGOUT' })
        window.location.href = '/login';
    }

    return (
        <Fragment>
            <Row className="bg-white justify-content-end mb-1">
                <Link to="/login">
                    <Button variant="info" onClick={logout}>Logout</Button>
                </Link>
            </Row>
            <Row className="bg-white">
                <Users />
                <Messages />
            </Row>
        </Fragment>
    )
}
