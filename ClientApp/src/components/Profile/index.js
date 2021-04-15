import React, {useState} from 'react';
import { Avatar, Button, TextField, Typography, makeStyles } from '@material-ui/core';
import UserModal from '../Modal';

export default function Profile({user}) {
  const [open, setOpen] = useState(false);
  const classes = useStyles()

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (val) => {
    console.log("handle change")
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
        <p><strong>Books Owned</strong>: <i>23</i></p>
        <br/>
        <Typography variant="body1">
          <strong>Your Books</strong>
        </Typography>
        <hr/>
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
