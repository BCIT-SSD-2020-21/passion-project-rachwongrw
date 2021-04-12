import {
  Box,
  Card,
  CardHeader,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React from 'react';

export default function BookDetail() {
  const classes = useStyles();
  return (
    <div>
      <Card className={classes.card}>
        <Box className={classes.header}>
          <CardHeader title="Count of Monte Cristo" />
        </Box>
        <Typography className={classes.sections}>
          <span className={classes.subheadings}>Author:</span> Alexandre Dumas
        </Typography>
        <Typography className={classes.sections}>
          <span className={classes.subheadings}>Total Time:</span> 49:43:15
        </Typography>
        <Typography className={classes.sections}>
          <span className={classes.subheadings}>Description: </span>
          <i>The Count of Monte Cristo</i> (French:{' '}
          <i>Le Comte de Monte-Cristo</i>) is an adventure novel by Alexandre
          Dumas, père. It is often considered, along with{' '}
          <i>The Three Musketeers</i>, as Dumas's most popular work. The writing
          of the work was completed in 1844. Like many of his novels, it is
          expanded from the plot outlines suggested by his collaborating
          ghostwriter Auguste Maquet.
          <br />
          <br />
          The story takes place in France, Italy, islands in the Mediterranean
          and the Levant during the historical events of 1815–1838 (from just
          before the Hundred Days through the reign of Louis-Philippe of
          France). The historical setting is a fundamental element of the book.
          It is primarily concerned with themes of justice, vengeance, mercy,
          and forgiveness, and is told in the style of an adventure story.
          (Summary from Wikipedia)
          <br />
          <br /> This book contains alternate versions of a number of chapters –
          indicated by an alt after the file number. The Zip files contain both
          versions of these chapters.
          <br />
          <br />
          There are 2 versions of the M4Bs made , one containing the original
          files for these chapters (4 parts), the other containing the alternate
          files for the chapters (5 parts).
        </Typography>
      </Card>
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
