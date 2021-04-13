import React from 'react';
import { useHistory } from 'react-router';
import NavBar from '../../components/NavBar';

export default function HeaderNavigation({ user, setToken }) {
  const history = useHistory();

  const signOut = () => {
    setToken('');
    history.push('/login');
  };

  return (
    <div>
      <NavBar
        onSignOutClicked={signOut}
        user={user} 
      />
    </div>
  );
}
