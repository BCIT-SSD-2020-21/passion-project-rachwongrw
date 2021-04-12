import React from 'react';
import { useHistory } from 'react-router-dom';
import NavBar from '../../components/NavBar';

export default function HeaderNavigation() {
  const history = useHistory();
  return (
    <div>
      <NavBar
        onTitleClicked={() => history.push('/')}
      />
    </div>
  )
}
