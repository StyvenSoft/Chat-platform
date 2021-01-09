import React from 'react';
import { Container } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import ApolloProvider from './ApolloProvider';
import './App.scss';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {

  return (
    <ApolloProvider>
      <Router>
        <Container className="pt-3">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
          </Switch>
        </Container>
      </Router>
    </ApolloProvider>
  );
}

export default App;
