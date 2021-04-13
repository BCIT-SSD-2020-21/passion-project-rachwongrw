import {
  Box,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  makeStyles,
  Tabs,
  Tab,
  TextField,
  Button
} from '@material-ui/core';
import { CloseRounded } from '@material-ui/icons';
import React, { useState } from 'react';

export default function Login({ closeClicked, submitted }) {
  const classes = useStyles();
  const [tabValue, setTabValue] = useState(0);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = (e, newTabValue) => {
    setTabValue(newTabValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (tabValue === 0) {
      submitted({ type: 'login', username, password })
    } else {
      submitted({ type: 'signup', email, username, password })
    }

    setUsername('');
    setEmail('');
    setPassword('');
  };

  return (
    <Card className={classes.root}>
      <Box className={classes.headerContainer}>
        <CardHeader
          className={classes.header}
          title={tabValue === 0 ? 'Login' : 'Sign Up'}
        ></CardHeader>
        <IconButton className={classes.closeButton}>
          <CloseRounded />
        </IconButton>
      </Box>
      <CardContent>
        <Tabs
          className={classes.tabs}
          textColor="primary"
          indicatorColor="primary"
          value={tabValue}
          onChange={handleChange}
          aria-label="login register"
          centered
        >
          <Tab className={classes.tab} label="LOGIN" />
          <Tab className={classes.tab} label="SIGN UP" />
        </Tabs>
      </CardContent>
      <CardContent>
        <form
          action="#"
          onSubmit={handleSubmit}
          method="POST"
          noValidate
          autoComplete="off"
        >
          {tabValue === 1 && (
            <TextField
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={classes.formInput}
              id="outlined-basic"
              label="Email"
              variant="outlined"
            />
          )}
          <TextField
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={classes.formInput}
            id="outlined-basic"
            label="Username"
            variant="outlined"
          />
          <TextField
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={classes.formInput}
            id="outlined-basic"
            label="Password"
            variant="outlined"
          />
          <Button className={classes.submitBtn}>
            SUBMIT
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
    width: 600,
  },
  headerContainer: {
    display: 'flex',
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  header: {
    marginTop: 12,
    marginBottom: 20,
  },
  closeButton: {
    position: 'absolute',
    right: '1em',
  },
  tabs: {
    backgroundColor: 'white',
    color: 'black',
  },
  tab: {
    width: '100%',
  },
  formInput: {
    marginTop: 20,
    width: '95%',
  },
  submitBtn: {
    marginTop: 20,
    marginBottom: 35,
  }
}));
