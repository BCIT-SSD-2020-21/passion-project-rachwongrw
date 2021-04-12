import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Card, CardActionArea, CardHeader } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20
  },
  card: {
    width: 250,
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
        <CardActionArea onClick={() => cardClicked({ id })}>
          <CardHeader 
            className={classes.cardHeader} 
            titleTypographyProps={{ variant: 'h6' }}
            title={title}
          />
        </CardActionArea>
      </Card>
    </Box>
  )
}
