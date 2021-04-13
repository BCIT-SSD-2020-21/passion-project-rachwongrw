import {
  Box,
  Card,
  CardHeader,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React from 'react';

export default function BookDetail({ book }) {
  const classes = useStyles();

  return (
    <div>
      {book && (
        <Card className={classes.card}>
          <Box className={classes.header}>
            <CardHeader title={book.title} />
          </Box>
          <Typography className={classes.sections}>
            <span className={classes.subheadings}>Author:</span>{' '}
            {book.authors[0].firstName} {book.authors[0].lastName}
          </Typography>
          <Typography className={classes.sections}>
            <span className={classes.subheadings}>Total Time:</span>{' '}
            {book.total_time}
          </Typography>
          <span className={classes.subheadings}>Description: </span>
          <div 
            dangerouslySetInnerHTML={{ __html: book.description }}
            className={classes.sections}
          ></div>
        </Card>
      )}
    </div>
  );
}

const useStyles = makeStyles({
  card: {
    width: "80vw",
    maxWidth: 700,
    padding: 20,
    margin: "0 auto",
  },
  subheadings: {
    fontWeight: 'bold',
  },
  header: {
    textAlign: 'center',
  },
  sections: {
    marginBottom: 10,
  },
});
