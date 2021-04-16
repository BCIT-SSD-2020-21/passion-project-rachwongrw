import React from 'react';
import { useHistory } from 'react-router';
import NavBar from '../../components/NavBar';

export default function HeaderNavigation({ setToken, setSearch }) {
  const history = useHistory();

  const signOut = () => {
    setToken('');
    history.push('/login');
  };

  const handleSubmit = (e) => {
    // setSearch(e.searchValue);
    history.push(`/search/${e.searchValue}`);
  }

  return (
    <div>
      <NavBar
        onSignOutClicked={signOut} 
        onSearch={handleSubmit}
      />
    </div>
  );
}
