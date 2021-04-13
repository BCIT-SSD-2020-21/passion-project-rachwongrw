import React from 'react'
import { useHistory } from 'react-router'
import Login from '../../components/Login'

export default function LoginPage() {
  const history = useHistory();

  const login = async (details) => {
    let result;

    // calls to login/register from network.js

    if (result) {
      // set token
    }

    history.push('/')
  }

  return (
    <div>
      <Login 
        closeClicked={() => history.push('/')}
        submitted={login}
      />
    </div>
  )
}
