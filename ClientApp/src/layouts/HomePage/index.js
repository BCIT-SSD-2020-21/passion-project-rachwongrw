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
    history.push(`/${data.id}`);
  };

  useEffect(() => {
    (async () => {
      const response = await getAllBooks(limit, offset);
      setBooks(response.data);
    })();
    console.log('rendered')
  }, [offset]);

  const handleChange = (e, value) => {
    setOffset(value - 1)
  }

  return (
    <div className={classes.root}>
      {!books ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {books.map((book) => (
            <Book key={book.id} book={book} cardClicked={cardClicked} />
          ))}
          <Pagination
            onChange={handleChange} 
            page={offset + 1} 
            count={totalPages} />
        </>
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
