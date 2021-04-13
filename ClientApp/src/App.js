import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from '../src/layouts/HomePage';
import DetailPage from '../src/layouts/DetailPage';
import { makeStyles } from '@material-ui/core/styles';
import HeaderNavigation from './layouts/HeaderNavigation';
import LoginPage from './layouts/LoginPage';
import useLocalStorage from 'react-use-localstorage';
import jwtDecode from 'jwt-decode';

export default function App() {
  const classes = useStyles();
  const [token, setToken] = useLocalStorage('token');
  const [user, setUser] = useState(token ? jwtDecode(token) : null);

  useEffect(() => {
    (async () => {
      const user = token ? jwtDecode(token) : null;
      setUser(user);
    })();
  }, [token]);

  return (
    <div>
      <Router>
        <HeaderNavigation user={user} setToken={setToken} />
        <main className={classes.root}>
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route exact path="/login">
              <LoginPage setToken={setToken} />
            </Route>
            <Route exact path="/:bookId">
              <DetailPage />
            </Route>
          </Switch>
        </main>
      </Router>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 100,
    marginBottom: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
