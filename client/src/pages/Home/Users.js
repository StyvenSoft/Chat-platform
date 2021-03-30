import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { Col, Image } from 'react-bootstrap';
import { useMessageDispatch, useMessageState } from '../../context/message';
import classNames from 'classnames';

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
export default function Users() {
    const dispatch = useMessageDispatch();
    const { users } = useMessageState()
    const selectedUser = users?.find(u => u.selected === true)?.username

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
        usersMarkup = users.map((user) => {
            const selected = selectedUser === user.username;
            return (<div
                role="button"
                className={classNames("d-flex p-3 user-div", { 'bg-white': selected })}
                key={user.username}
                onClick={() => dispatch({ type: 'SET_SELECTED_USER', payload: user.username })}
            >
                <Image
                    src={!user.imageUrl ? 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y' : user.imageUrl}
                    className="user-image mr-2"
                />
                <div className="d-none d-md-block">
                    <strong className="text-success">{user.username}</strong>
                    <p className="font-weigth-light">
                        {user.latestMessage
                            ? user.latestMessage.content
                            : 'You are now connected'}
                    </p>
                </div>
            </div>)
        })
    }
    return (
        <Col xs={2} md={4} className="p-0 bg-secondary">
            {usersMarkup}
        </Col>
    )
}
