import { makeStyles, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Book from '../../components/Book';
import { booksArray } from '../../data/fakeData';

export default function HomePage() {
  const [books, setBooks] = useState([]);
  const history = useHistory();
  const classes = useStyles();

  const cardClicked = async (data) => {
    console.log('Data', data.id);
    history.push(`/${data.id}`);
  };

  useEffect(() => {
    (async () => {
      const response = await axios.get('https://localhost:5001/api/books');
      setBooks(response.data);
    })();
  }, []);

  return (
    <div className={classes.root}>
      {!books ? (
        <Typography>Loading...</Typography>
      ) : (
        books.map((book) => <Book book={book} cardClicked={cardClicked} />)
      )}
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
});
