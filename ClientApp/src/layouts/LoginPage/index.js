import { makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import Login from '../../components/Login';
import { loginUser, registerUser } from '../../network';

export default function LoginPage({ setToken }) {
  const history = useHistory();
  const classes = useStyles();
  const [error, setError] = useState(false);

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
