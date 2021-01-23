import { gql, useLazyQuery } from '@apollo/client';
import React, { Fragment, useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuthDispatch } from '../../context/auth';
import Users from './Users';

const GET_MESSAGES = gql`
    query getMessages($from: String!) {
        getMessages(from: $from) {
            uuid
            from
            to
            content
            createdAt
        }
    }
`

export default function Home(props) {
    const dispatch = useAuthDispatch();
    const [selectedUser, setSelectedUser] = useState(null);

    const logout = () => {
        dispatch({ type: 'LOGOUT' })
        props.history.push('/login')
    }



    const [getMessages, { loading: messagesLoading, data: messagesData }] = useLazyQuery(GET_MESSAGES);
    useEffect(() => {
        if (selectedUser) {
            getMessages({ variables: { from: selectedUser } })
        }
    }, [selectedUser])


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
                <Users setSelectedUser={setSelectedUser} />
                <Col xs={8}>
                    {messagesData && messagesData.getMessages.length > 0 ? (
                        messagesData.getMessages.map((message) => (
                            <p key={message.uuid}>{message.content}</p>
                        ))
                    ) : (
                            <p>Not Messages</p>
                        )}
                </Col>
            </Row>
        </Fragment>
    )
}
