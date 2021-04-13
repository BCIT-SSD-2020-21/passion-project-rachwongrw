import { makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Book from '../../components/Book';
import { getAllBooks } from '../../network';

export default function HomePage() {
  const [books, setBooks] = useState([]);
  const history = useHistory();
  const classes = useStyles();

  const cardClicked = async (data) => {
    history.push(`/${data.id}`);
  };

  useEffect(() => {
    (async () => {
      const response = await getAllBooks();
      setBooks(response.data);
    })();
  }, []);

  return (
    <div className={classes.root}>
      {!books ? (
        <h1>Loading...</h1>
      ) : (
        books.map((book) => <Book key={book.id} book={book} cardClicked={cardClicked} />)
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
