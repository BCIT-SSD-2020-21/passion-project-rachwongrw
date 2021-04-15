import React, { useEffect, useState } from 'react';
import AudioPlayer from '../../components/AudioPlayer';
import BookDetail from '../../components/BookDetail';
import { getBookById } from '../../network';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

export default function DetailPage() {
  const [book, setBook] = useState()
  const { bookId } = useParams();
  const classes = useStyles();
  
  useEffect(() => {
    (async () => {
      const response = await getBookById(bookId);
      setBook(response.data)
    })();
  }, [bookId])

  return (
    <div className={classes.root}>
      <AudioPlayer book={book}/>
      <BookDetail book={book}/>
    </div>
  );
}

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 700,
    width: "80vw",
    margin: "0 auto"
  },
}));