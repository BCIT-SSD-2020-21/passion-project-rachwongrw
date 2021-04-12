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
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardHeader: {
    textAlign: 'center'
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
          <Button onClick={() => cardClicked({ id })} color="primary">View</Button>
      </Card>
    </Box>
  )
}
