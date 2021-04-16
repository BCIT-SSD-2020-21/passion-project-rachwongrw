import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import NavBar from '../../components/NavBar';
import { UserContext } from '../../context/UserContext';

export default function HeaderNavigation({ setToken }) {
  const history = useHistory();
  const { setUser } = useContext(UserContext);

  const signOut = () => {
    setToken('');
    setUser(null);
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
