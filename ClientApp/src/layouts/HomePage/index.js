import { makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Book from '../../components/Book';
import { getAllBooks } from '../../network';
import Pagination from '@material-ui/lab/Pagination';

export default function HomePage() {
  const [books, setBooks] = useState([]);
  const history = useHistory();
  const classes = useStyles();
  const [offset, setOffset] = useState(0);
  const limit = 20;
  const totalPages = 15987;

  const cardClicked = async (data) => {
    history.push(`/books/${data.id}`);
  };

  useEffect(() => {
    (async () => {
      const response = await getAllBooks(limit, offset);
      setBooks(response.data);
    })();
  }, [offset]);

  const handleChange = (e, value) => {
    setOffset(value - 1);
  };

  return (
    <div className={classes.root}>
      {!books ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <div className={classes.booksContainer}>
            {books.map((book) => (
              <Book key={book.id} book={book} cardClicked={cardClicked} />
            ))}
          </div>
          <div className={classes.paginationContainer}>
            <Pagination
              onChange={handleChange}
              page={offset + 1}
              count={totalPages}
            />
          </div>
        </>
      )}
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  booksContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  paginationContainer: {
    marginTop: 20
  },
});
