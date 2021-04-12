import {
  AppBar,
  makeStyles,
  Toolbar,
  Typography,
  fade,
  InputBase,
} from '@material-ui/core';
import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: 1000,
  },
  title: {
    display: 'none',
    color: 'white',
    textDecoration: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    '&:hover' : {
      color: 'white',
      textDecoration: 'none'
    }
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function NavBar({ onTitleClicked }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Link
            color="inherit"
            className={classes.title}
            onClick={onTitleClicked}
          >
            <Typography variant="h5">AudioVibez</Typography>
          </Link>
          <form className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search..."
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </form>
        </Toolbar>
      </AppBar>
    </div>
  );
}
