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
import { AuthProvider } from './context/auth';

function App() {

  return (
    <ApolloProvider>
      <AuthProvider>
        <Router>
          <Container className="pt-3">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
            </Switch>
          </Container>
        </Router>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
