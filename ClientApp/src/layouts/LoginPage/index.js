import { makeStyles } from '@material-ui/core';
import jwtDecode from 'jwt-decode';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import Login from '../../components/Login';
import { UserContext } from '../../context/UserContext';
import { getUser, loginUser, registerUser } from '../../network';

export default function LoginPage({ setToken }) {
  const history = useHistory();
  const classes = useStyles();
  const [error, setError] = useState(false);
  const { setUser } = useContext(UserContext);

  const login = async (details) => {
    let result;

    if (details.type === 'login') {
      result = await loginUser(details);
    }

    if (details.type === 'signup') {
      result = await registerUser(details);
    }

    if (result) {
      setToken(result);

      const response = await getUser();
      console.log("get user response after auth", response?.data)
      setUser(response?.data)
      history.push('/');
    } else {
      setError(true);
      history.push('/login');
    }
  };

  return (
    <div className={classes.root}>
      <Login
        error={error}
        setError={setError}
        closeClicked={() => history.push('/')}
        submitted={login}
      />
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
});
