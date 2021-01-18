import React from 'react'
import { Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuthDispatch } from '../context/auth';

export default function Home() {
    const dispatch = useAuthDispatch();

    const logout = () => {
        dispatch({ type: 'LOGOUT'})
        this.history.push('/login')
    }

    return (
        <Row className="bg-white justify-content-around">
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
    )
}
