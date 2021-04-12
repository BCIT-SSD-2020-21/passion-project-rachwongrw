import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Card, CardHeader } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20
  },
  card: {
    width: 250,
    height: 200,
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardHeader: {
    textAlign: 'center'
  },
  button: {
    color: '#ffa500',
    '&:hover': {
      background: 'rgba(255,165,0,0.1)'
    }
  }
});

export default function Audiobook({ cardClicked, book }) {
  const { id, title } = book;
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Card className={classes.card}>
          <CardHeader 
            className={classes.cardHeader} 
            titleTypographyProps={{ variant: 'h6' }}
            title={title}
          />
          <Button className={classes.button} onClick={() => cardClicked({ id })}>View</Button>
      </Card>
    </Box>
  )
}
