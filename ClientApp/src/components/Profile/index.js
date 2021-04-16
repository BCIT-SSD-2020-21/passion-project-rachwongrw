import React, { useState, useEffect } from 'react';
import { Avatar, Button, TextField, Typography, makeStyles } from '@material-ui/core';
import UserModal from '../Modal';
import { getUser } from '../../network';

export default function Profile({user}) {
  const [open, setOpen] = useState(false);
  const [currentUser, setUser] = useState(user);
  const classes = useStyles()

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
    switch (field) {
      case 'fName':
        
        break;
      case 'lName':
      
        break;
      case 'img':

        break;
      default:
        break;
    }
    
  }

  const body = (
    <form style={{textAlign: "center"}}>
      <Typography variant="h5" style={{paddingBottom: "1em"}}>Update Profile Image</Typography>
      <TextField
        label='Profile Image'
        placeholder="Place image URL here"
        onChange={(e) => handleChange(e.target.value)}
        className='text-field'
        type="url"
        defaultValue={user?.profileImage}
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
      <Avatar src={user.img} className={classes.avatar} onClick={handleOpen}/>
      <br/>
      <Typography variant="h6" style={{marginBottom: "1em"}}>
        Sarah Young
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
              <p key={book.id}><strong>{ fullName(book) }</strong>: <i>{book.title}</i></p>
          )
        }
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
