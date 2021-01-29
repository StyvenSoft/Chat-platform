import { gql, useLazyQuery, useMutation } from '@apollo/client';
import React, { Fragment, useEffect, useState } from 'react';
import { Col, Form } from 'react-bootstrap';
import { useMessageDispatch, useMessageState } from '../../context/message';
import Message from './Message';

const SEND_MESSAGE = gql`
    mutation sendMessage($to: String!, $content: String!) {
        sendMessage(to: $to, content: $content) {
            uuid
            from 
            to
            content
            createdAt
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

export default function Messages() {
    const { users } = useMessageState()
    const dispatch = useMessageDispatch()
    const [content, setContent] = useState('')
    const selectedUser = users?.find((u) => u.selected === true)
    const messages = selectedUser?.messages

    const [getMessages, { 
        loading: messagesLoading, data: messagesData 
    }] = useLazyQuery(GET_MESSAGES);
    
    const [sendMessage] = useMutation(SEND_MESSAGE, {
        onError: err => console.log(err)
    })

    useEffect(() => {
        if (selectedUser && !selectedUser.messages) {
            getMessages({ variables: { from: selectedUser.username } })
        }
    }, [selectedUser])

    useEffect(() => {
        if (messagesData) {
            dispatch({
                type: 'SET_USER_MESSAGES', payload: {
                    username: selectedUser.username,
                    messages: messagesData.getMessages
                }
            })
        }
    }, [messagesData])

    const submitMessage = e => {
        e.preventDefault()
        if (content === '') return

        // Mutation the sending the message
    }

    let selectedChatMarkup;

    if (!messages && !messagesLoading) {
        selectedChatMarkup = <p>Selected a friend</p>
    } else if (messagesLoading) {
        selectedChatMarkup = <p>Loading...</p>
    } else if (messages.length > 0) {
        selectedChatMarkup = messages.map((message, index) => (
            <Fragment key={message.uuid}>
                <Message message={message} />
                {index === message.length - 1 && (
                    <div className="invisible">
                        <hr className="m-0" />
                    </div>
                )}
            </Fragment>
        ))
    } else if (messages.length === 0) {
        selectedChatMarkup = <p>You are now connected! send ypur first message</p>
    }

    return (
        <Col xs={10} md={8} className="message-box d-flex flex-column-reverse">
            {selectedChatMarkup}
            <Form onSubmit={submitMessage}>
                <Form.Group>
                    <Form.Control
                        type="text"
                        className="rounded-pill bg-secondary"
                        placeholder="Text a message..."
                        value={content}
                        OnChange={e => setContent(e.target.value)}
                    >

                    </Form.Control>
                </Form.Group>
            </Form>
        </Col>
    )
}
