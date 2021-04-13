import React from 'react';
import { useHistory } from 'react-router';
import Login from '../../components/Login';
import { loginUser, registerUser } from '../../network';

export default function LoginPage({ setToken }) {
  const history = useHistory();

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
    }

    history.push('/');
  };

  return (
    <div>
      <Login closeClicked={() => history.push('/')} submitted={login} />
    </div>
  );
}
