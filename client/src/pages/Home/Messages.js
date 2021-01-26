import { gql, useLazyQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { Col } from 'react-bootstrap';

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

export default function Messages({ selectedUser }) {

    const [getMessages, { loading: messagesLoading, data: messagesData }] = useLazyQuery(GET_MESSAGES);
    useEffect(() => {
        if (selectedUser) {
            getMessages({ variables: { from: selectedUser } })
        }
    }, [selectedUser])

    return (
        <Col xs={8}>
            {messagesData && messagesData.getMessages.length > 0 ? (
                messagesData.getMessages.map((message) => (
                    <p key={message.uuid}>{message.content}</p>
                ))
            ) : (
                    <p>Not Messages</p>
                )}
        </Col>
    )
}
