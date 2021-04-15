import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Card, CardMedia, Typography } from '@material-ui/core';

export default function Audiobook({ cardClicked, book }) {
  const { id, title } = book;
  const classes = useStyles();
  console.log("book -", book)
  return (
    <Box className={classes.root}>
      <Card variant="outlined" className={classes.card}>
        <Typography className={classes.bookTitle} variant="h6">{title}</Typography>
        { !!book.url_Image &&
          <CardMedia
            className={classes.cover}
            image={book.url_Image}
            title={title}
          />}
          {/* --- book img url not included in get books api yet --- */}
        <Button className={classes.button} onClick={() => cardClicked({ id })}>
          View
        </Button>
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
    height: 200,
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    '&:hover': {
      transition: 'all 1s',
      transform: 'scaleY(1.05) scaleX(1.05)',
      borderColor: 'rgba(255,165,0,0.5)',
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
