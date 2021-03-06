import {
  Box,
  Card,
  CardContent,
  CardHeader,
  makeStyles,
  Tabs,
  Tab,
  TextField,
  Button,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';

export default function Login({ submitted, error, setError }) {
  const classes = useStyles();
  const [tabValue, setTabValue] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fName, setfName] = useState('');
  const [lName, setlName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChange = (e, newTabValue) => {
    setTabValue(newTabValue);
    setError(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try { 

      if (tabValue === 0) {
        submitted({ type: 'login', email, password });
      } else {
        submitted({ type: 'signup', email, password, confirmPassword, fName, lName });
      }

      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setfName('');
      setlName('');
    } catch (err) {
      console.log(err)
    }
  };

  return (
    <Card className={classes.root} elevation={0}>
      <Box className={classes.headerContainer}>
        <CardHeader
          className={classes.header}
          title={tabValue === 0 ? 'Login' : 'Sign Up'}
        ></CardHeader>
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
          {
            tabValue === 1 && 
            <>
              <TextField
                value={fName}
                onChange={(e) => setfName(e.target.value)}
                className={classes.formInput}
                label="First Name"
                variant="outlined"
              />
              <TextField
                value={lName}
                onChange={(e) => setlName(e.target.value)}
                className={classes.formInput}
                label="Last Name"
                variant="outlined"
              />
            </>
          }
          <TextField
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={classes.formInput}
            label="Email"
            variant="outlined"
          />
          <TextField
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={classes.formInput}
            label="Password"
            variant="outlined"
          />
          {tabValue === 1 && (
            <TextField
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={classes.formInput}
              label="Confirm Password"
              variant="outlined"
            />
          )}
          {error &&
            <Typography className={classes.errorMessage}>Invalid Email or Password!</Typography>
          }
          <Button type="submit" className={classes.submitBtn}>
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
  },
  errorMessage: {
    marginTop: 20,
    color: 'red',
  },
}));
