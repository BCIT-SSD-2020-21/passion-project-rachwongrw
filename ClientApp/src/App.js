import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import HomePage from '../src/layouts/HomePage';
import DetailPage from '../src/layouts/DetailPage';
import { makeStyles } from '@material-ui/core/styles';
import HeaderNavigation from './layouts/HeaderNavigation';

const useStyles = makeStyles((theme) =>  ({
  root: {
    marginTop: 100,
    marginBottom: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
}))

export default function App() {
  const classes = useStyles();
  return (
    <div>
      <Router>
        <HeaderNavigation />
        <main className={classes.root}>
          <Switch>
            <HomePage exact path="/" />
            <DetailPage path="/:id" />
          </Switch>
        </main>
      </Router>
    </div>
  );
}
