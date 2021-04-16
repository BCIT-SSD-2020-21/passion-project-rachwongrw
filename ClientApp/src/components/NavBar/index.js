import {
  AppBar,
  makeStyles,
  Toolbar,
  Typography,
  fade,
  InputBase,
  Box,
  IconButton,
  MenuItem,
  Menu,
} from '@material-ui/core';
import React, { useContext, useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { Link } from 'react-router-dom';
import { AccountCircle } from '@material-ui/icons';
import { UserContext } from '../../context/UserContext';

export default function NavBar({ onSignOutClicked, onSearch }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchValue, setSearchValue] = useState('')
  const open = Boolean(anchorEl);
  const { user } = useContext(UserContext)

  const handleMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = (e) => {
    setAnchorEl(null);
  };

  const signOut = () => {
    handleMenuClose();
    onSignOutClicked();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ searchValue });
    setSearchValue('');
  }
  
  return (
    <div className={classes.root}>
      <AppBar className={classes.nav} position="static">
        <Toolbar className={classes.toolbar}>
          <Box className={classes.container}>
            <Link to="/" color="inherit" className={classes.title}>
              <Typography variant="h5">AudioVibez</Typography>
            </Link>&nbsp;
            <form onSubmit={handleSubmit} className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </form>
          </Box>
          <Box>
            {user ? (
              <>
                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                  open={open}
                  onClose={handleMenuClose}
                >
                  <MenuItem>
                    <Link className={classes.link} to="/profile" color="black">
                      Profile
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={signOut}>Sign Out</MenuItem>
                </Menu>
              </>
            ) : (
              <Link  to="/login" color="inherit">
                Login
              </Link>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: 1000,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
  nav: {
    background: '#ffa500',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  title: {
    color: 'white',
    textDecoration: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    '&:hover': {
      color: 'white',
      textDecoration: 'none',
    },
  },
  search: {
    display: 'none',
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: '2em',
    width: '100%',
    // [theme.breakpoints.up('sm')]: {
    //   marginLeft: theme.spacing(3),
    //   width: 'auto',
    // },
    [theme.breakpoints.up('sm')]: {
      display: 'block',
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
  link: {
    color: 'black',
    textDecoration: 'none',
    '&:hover': {
      color: 'black',
      textDecoration: 'none',
    },
  },
}));
