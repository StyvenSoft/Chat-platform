import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { Col, Image } from 'react-bootstrap';
import { useMessageDispatch, useMessageState } from '../../context/message';

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
export default function Users({ setSelectedUser }) {
    const dispatch = useMessageDispatch();
    const { users } = useMessageState()
    const { loading } = useQuery(GET_USERS, {
        onCompleted: data => dispatch({ type: 'SET_USERS', payload: data.getUsers }),
        onError: err => console.log(err)
    });

    let usersMarkup;
    if (!users || loading) {
        usersMarkup = <p>Loading...</p>
    } else if (users.length === 0) {
        usersMarkup = <p>Not users have joined yet</p>
    } else if (users.length > 0) {
        usersMarkup = users.map((user) => (
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
        <Col xs={4} className="p-0">
            {usersMarkup}
        </Col>
    )
}
