import React from 'react';
import { makeStyles } from '@material-ui/core';
import Profile from '../../components/Profile';

const ProfilePage = () => {
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