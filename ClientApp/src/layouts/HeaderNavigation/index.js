import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import NavBar from '../../components/NavBar';
import { UserContext } from '../../context/UserContext';

export default function HeaderNavigation() {
  const history = useHistory();
  const { setToken } = useContext(UserContext);

  const signOut = () => {
    setToken('');
    history.push('/login');
  };

  const handleSubmit = (e) => {
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
