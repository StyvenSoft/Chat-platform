import { gql, useQuery, useLazyQuery } from '@apollo/client';
import React, { Fragment, useEffect, useState } from 'react';
import { Row, Button, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuthDispatch } from '../context/auth';

const GET_USERS = gql`
    query getUsers{
        getUsers{
            username
            createdAt
            imageUrl 
            latestMessage {
                uuid
                from
                to
                content
                createdAt
            }
        }
    }
`

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

    const { loading, data, error } = useQuery(GET_USERS);

    const [getMessages, { loading: messagesLoading, data: messagesData }] = useLazyQuery(GET_MESSAGES);
    useEffect(() => {
        if (selectedUser) {
            getMessages({ variables: { from: selectedUser } })
        }
    }, [selectedUser])

    if (messagesData) console.log(messagesData.getMessages)

    let usersMarkup;
    if (!data || loading) {
        usersMarkup = <p>Loading...</p>
    } else if (data.getUsers.length === 0) {
        usersMarkup = <p>Not users have joined yet</p>
    } else if (data.getUsers.length > 0) {
        usersMarkup = data.getUsers.map((user) => (
            <div
                className="d-flex p-3"
                key={user.username}
                onClick={() => setSelectedUser(user.username)}
            >
                <Image
                    src={user.imageUrl}
                    roundedCircle
                    className="mr-2"
                    style={{ width: 50, height: 50, objectFit: "cover" }}
                />
                <div>
                    <strong className="text-success">{user.username}</strong>
                    <p className="font-weigth-light">
                        {user.latestMessage
                            ? user.latestMessage.content
                            : 'You are now connected'}
                    </p>
                </div>
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
                <Col xs={4} className="p-0">
                    {usersMarkup}
                </Col>
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
