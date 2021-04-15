import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Card } from '@material-ui/core';

export default function Audiobook({ cardClicked, book }) {
  const classes = useStyles();
  return (
    <Box className={classes.root} onClick={() => cardClicked({ id: book.id })}>
      <Card variant="outlined" className={classes.card} style={{background: `url(${book.url_Image})`, backgroundSize: "contain"}}>
      </Card>
    </Box>
  );
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  bookTitle: {
    textAlign: 'center'
  },
  card: {
    width: 250,
    height: 250,
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    '&:hover': {
      transition: 'all 1s',
      transform: 'scaleY(1.05) scaleX(1.05)',
      borderColor: 'rgba(255,165,0,0.5)',
      cursor: "pointer"
    },
  },
  cover: {
    width: 200,
    height: 200,
  },
  cardHeader: {
    textAlign: 'center',
  },
  button: {
    color: '#ffa500',
    '&:hover': {
      background: 'rgba(255,165,0,0.1)',
    },
  },
});
