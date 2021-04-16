import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import HomePage from '../src/layouts/HomePage';
import DetailPage from '../src/layouts/DetailPage';
import { makeStyles } from '@material-ui/core/styles';
import HeaderNavigation from './layouts/HeaderNavigation';
import LoginPage from './layouts/LoginPage';
import useLocalStorage from 'react-use-localstorage';
import jwtDecode from 'jwt-decode';
import SearchPage from './layouts/SearchPage';
import './custom.css';
import ProfilePage from './layouts/ProfilePage';
import { UserContext } from './context/UserContext';

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

  const PrivateRoute = ({ path, children }) => (
    <Route path={path}>{user ? children : <Redirect to="/login" />}</Route>
  );

  return (
    <div>
      <Router>
        <UserContext.Provider 
          value={{ 
            user, 
            setUser,
            setToken
           }}
        >
          <HeaderNavigation />
          <main className={classes.root}>
            <Switch>
              <Route exact path="/">
                <HomePage />
              </Route>
              <Route path="/login">
                <LoginPage />
              </Route>
              {/* <Route exact path="/profile" component={ProfilePage} /> */}

              <Route exact path="/search/:searchTerm">
                <SearchPage />
              </Route>
              <Route path="/books/:bookId">
                <DetailPage />
              </Route>
              <PrivateRoute path="/profile">
                <ProfilePage />
              </PrivateRoute>
            </Switch>
          </main>
        </UserContext.Provider>
      </Router>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 100,
    marginBottom: 100,
    // display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
}));
