import React, { useState, useEffect } from 'react';
import { Avatar, Button, TextField, Typography, makeStyles } from '@material-ui/core';
import UserModal from '../Modal';
import { getUser, updateUser } from '../../network';
import { useHistory } from 'react-router-dom';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

export default function Profile({user}) {
  const [open, setOpen] = useState(false);
  const [currentUser, setUser] = useState(user);
  const classes = useStyles()
  const history = useHistory();

  useEffect(() => {
    (async () => {
      const response = await getUser();
      console.log("get user response", response?.data)
      setUser(response?.data)
    })();
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (field, val) => {
    console.log("handle change", field, val)
    var updatedUser = Object.assign({}, currentUser)
    console.log("updatedUser", updatedUser)
    switch (field) {
      case 'profileImg':
        updatedUser.profileImg = val
        break;
      default:
        break;
    }
    setUser(updatedUser)
  }

  const submitPhoto = async (e) => {
    e.preventDefault();
    // update user here.
    const response = await updateUser(currentUser);
    console.log("updated user response", response?.data)
    setOpen(false);
  }

  const body = (
    <form style={{textAlign: "center"}} onSubmit={submitPhoto}>
      <Typography variant="h5" style={{paddingBottom: "1em"}}>Update Profile Image</Typography>
      <TextField
        label='Profile Image'
        placeholder="Place image URL here"
        onChange={(e) => handleChange('profileImg', e.target.value)}
        className='text-field'
        type="url"
        defaultValue={currentUser?.profileImg}
      />
      <Button className={classes.submit} type='submit'>
        Save
      </Button>
    </form>
  )
  
  const fullName = (book) => {
    if (book.authors && book.authors.length > 0) {
      const author = book.authors[0]
      return `${author.firstName} ${author.lastName}`
    }
    return 'N/A'
  }
  
  return (
    <div className={classes.root}>
      <Avatar src={currentUser.profileImg} className={classes.avatar} onClick={handleOpen}/>
      <br/>
      <Typography variant="h6" style={{marginBottom: "1em"}}>
        {currentUser?.fName} {currentUser?.lName}
      </Typography>
      <div className={classes.details}>
        <Typography variant="body1">
          <strong>Your Details</strong>
        </Typography>
        <hr/>
        <p><strong>Email</strong>: <i>{user.sub}</i></p>
        <p><strong>Books Listened To</strong>: <i>{currentUser?.booksListened?.length}</i></p>
        <br/>
        <Typography variant="body1">
          <strong>Your Books</strong>
        </Typography>
        <hr/>
        {
          currentUser?.booksListened?.map(book =>
            <a key={book.id} onClick={() => history.push(`/books/${book.id}`)} style={{display: "flex"}}>
              <PlayArrowIcon/>&nbsp;
              <strong>{fullName(book)}</strong>&nbsp;:&nbsp;<i>{book.title}</i>
            </a>
        )}
      </div>
      <UserModal body={body} handleClose={handleClose} open={open}/>
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
  avatar: {
    width: theme.spacing(17),
    height: theme.spacing(17),
    margin: '0 auto',
    '&:hover':{
      cursor: "pointer",
      opacity: 0.7
    }
  },
  submit: { 
    background: "#ffa500",
    color: "white",
    border: "1px solid  #ffa500",
    paddingLeft: 30,
    paddingRight: 30,
    "&:hover" :{
      color:  "#ffa500",
      border: "1px solid  #ffa500"
    }
  }
}));
