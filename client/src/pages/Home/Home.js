import React, { Fragment, useState } from 'react';
import { Button, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuthDispatch } from '../../context/auth';
import Messages from './Messages';
import Users from './Users';

export default function Home(props) {
    const dispatch = useAuthDispatch();
    const [selectedUser, setSelectedUser] = useState(null);

    const logout = () => {
        dispatch({ type: 'LOGOUT' })
        props.history.push('/login')
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
                <Users setSelectedUser={setSelectedUser} selectedUser={selectedUser} />
                <Messages selectedUser={selectedUser} />
            </Row>
        </Fragment>
    )
}
