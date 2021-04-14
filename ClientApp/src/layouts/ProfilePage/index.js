import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import Profile from '../../components/Profile';

const ProfilePage = () => {
  const history = useHistory();
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <Profile/>
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

export default ProfilePage