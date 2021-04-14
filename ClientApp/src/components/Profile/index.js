import React from 'react';
import { Avatar, Typography, makeStyles } from '@material-ui/core';

export default function Profile() {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Avatar src="https://images.unsplash.com/photo-1608504174559-b9eeee51c568?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" className={classes.large} />
      <br/>
      <Typography variant="h6" style={{marginBottom: "1em"}}>
        Sarah Young
      </Typography>
      <div className={classes.details}>
        <Typography variant="body1">
          <strong>Your Details</strong>
        </Typography>
        <hr/>
        <p><strong>Email</strong>: <i>syoung@me.ca</i></p>
        <p><strong>Books Owned</strong>: <i>23</i></p>
        <br/>
        <Typography variant="body1">
          <strong>Your Books</strong>
        </Typography>
        <hr/>
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center"
  },
  details: {
    textAlign: 'left',
    width: "75vw"
  },
  large: {
    width: theme.spacing(17),
    height: theme.spacing(17),
    margin: '0 auto'
  },
}));
